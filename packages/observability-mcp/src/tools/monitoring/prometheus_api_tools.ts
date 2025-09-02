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

import { apiClientFactory } from '../../utils/api_client_factory.js';

const prometheus = apiClientFactory.getPrometheusClient();

/**
 * Queries Prometheus metrics over a time range from Google Cloud Monitoring.
 * @param name The project on which to execute the request.
 * @param query The Prometheus query string.
 * @param start The start time of the query range. RFC 3339 format or a Unix timestamp.
 * @param end The end time of the query range. RFC 3339 format or a Unix timestamp.
 * @param step The step size for the query. A duration string (e.g. "1m", "5m").
 * @returns A promise that resolves with a string containing the query result
 *     in JSON format, or an error message.
 */
export async function queryRange(
  name: string,
  query: string,
  start?: string,
  end?: string,
  step?: string
): Promise<string> {
  const request = {
    name,
    location: 'global',
    requestBody: {
      query,
      start: start ?? null,
      end: end ?? null,
      step: step ?? null,
    },
  };

  try {
    const response =
      await prometheus.projects.location.prometheus.api.v1.query_range(
        request
      );
    return JSON.stringify(response.data, null, 2);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to query range: ${error.message}`);
    }
    throw new Error('An unknown error occurred while querying range.');
  }
}
