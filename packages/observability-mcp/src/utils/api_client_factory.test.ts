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

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ApiClientFactory as ApiClientFactoryClass } from './api_client_factory.js';

const mockSetCredentials = vi.fn();
const mockOAuth2 = vi.fn(() => ({
  setCredentials: mockSetCredentials,
}));

vi.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: mockOAuth2,
    },
    monitoring: vi.fn(() => ({})),
    logging: vi.fn(() => ({})),
    clouderrorreporting: vi.fn(() => ({})),
    cloudtrace: vi.fn(() => ({})),
  },
}));

// Mock the google-auth-library
vi.mock('google-auth-library');

vi.mock('node:child_process', () => ({
  execSync: vi.fn(() => 'test-token'),
}));

describe('ApiClientFactory', () => {
  let ApiClientFactory: typeof ApiClientFactoryClass;

  beforeEach(async () => {
    // Reset mocks and the module cache before each test
    vi.resetModules();
    vi.clearAllMocks();
    // Re-import the module to get a fresh instance
    ApiClientFactory = (await import('./api_client_factory.js')).ApiClientFactory;
  });

  it('should always return the same singleton instance', () => {
    const instance1 = ApiClientFactory.getInstance();
    const instance2 = ApiClientFactory.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should call setCredentials with the correct token', async () => {
    const { execSync } = await import('node:child_process');
    const factory = ApiClientFactory.getInstance();
    factory.getMonitoringClient();

    expect(execSync).toHaveBeenCalledWith('gcloud auth print-access-token');
    expect(mockOAuth2).toHaveBeenCalled();
    expect(mockSetCredentials).toHaveBeenCalledWith({
      access_token: 'test-token',
    });
  });
});
