/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, it, expect, vi, Mock } from 'vitest';
import { GaxiosResponse } from 'gaxios';
import { monitoring_v1 } from 'googleapis';
import { queryRange } from './prometheus_api_tools.js';
import { apiClientFactory } from '../../utils/api_client_factory.js';

const TEST_PROJECT_ID = 'my-project';
const TEST_PROJECT_RESOURCE = `projects/${TEST_PROJECT_ID}`;

// Mock the ApiClientFactory
vi.mock('../../utils/api_client_factory.js', () => {
  const mockPrometheusClient = {
    projects: {
      location: {
        prometheus: {
          api: {
            v1: {
              query_range: vi.fn(),
            },
          },
        },
      },
    },
  };
  return {
    apiClientFactory: {
      getPrometheusClient: () => mockPrometheusClient,
    },
  };
});

const createMockQueryRangeResponse = (
  result: any[]
): Partial<GaxiosResponse<monitoring_v1.Schema$HttpBody>> => ({
  data: {
    data: JSON.stringify({
      result,
    }),
  },
});

describe('queryRange', () => {
  it('should return a JSON string of the query result on success', async () => {
    const mockResponse = createMockQueryRangeResponse([
      { metric: { __name__: 'up' }, values: [[1620000000, '1']] },
    ]);
    const prometheusClient = apiClientFactory.getPrometheusClient();
    (
      prometheusClient.projects.location.prometheus.api.v1
        .query_range as Mock
    ).mockResolvedValue(mockResponse);

    const result = await queryRange(
      TEST_PROJECT_RESOURCE,
      'up',
      '2021-05-03T00:00:00Z',
      '2021-05-03T01:00:00Z',
      '1m'
    );
    expect(JSON.parse(result)).toEqual({
      data: JSON.stringify({
        result: [{ metric: { __name__: 'up' }, values: [[1620000000, '1']] }],
      }),
    });
    expect(
      prometheusClient.projects.location.prometheus.api.v1
        .query_range
    ).toHaveBeenCalledWith({
      name: `${TEST_PROJECT_RESOURCE}`,
      location: 'global',
      requestBody: {
        query: 'up',
        start: '2021-05-03T00:00:00Z',
        end: '2021-05-03T01:00:00Z',
        step: '1m',
      },
    });
  });

  it('should throw an error if the API call fails', async () => {
    const errorMessage = 'API Error';
    const prometheusClient = apiClientFactory.getPrometheusClient();
    (
      prometheusClient.projects.location.prometheus.api.v1
        .query_range as Mock
    ).mockRejectedValue(new Error(errorMessage));

    await expect(
      queryRange(
        TEST_PROJECT_RESOURCE,
        'up',
        '2021-05-03T00:00:00Z',
        '2021-05-03T01:00:00Z',
        '1m'
      )
    ).rejects.toThrow(`Failed to query range: ${errorMessage}`);
  });
});
