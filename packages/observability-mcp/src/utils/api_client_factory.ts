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

import {
  Auth,
  clouderrorreporting_v1beta1,
  logging_v2,
  monitoring_v3,
  cloudtrace_v1,
  google,
} from 'googleapis';
import { execSync } from 'node:child_process';

export class ApiClientFactory {
  private static instance: ApiClientFactory;

  static getInstance(): ApiClientFactory {
    if (!ApiClientFactory.instance) {
      ApiClientFactory.instance = new ApiClientFactory();
    }
    return ApiClientFactory.instance;
  }

  getMonitoringClient(): monitoring_v3.Monitoring {
    return google.monitoring({
      version: 'v3',
      auth: printAccessToken(),
    });
  }

  getLoggingClient(): logging_v2.Logging {
    return google.logging({
      version: 'v2',
      auth: printAccessToken(),
    });
  }

  getErrorReportingClient(): clouderrorreporting_v1beta1.Clouderrorreporting {
    return google.clouderrorreporting({
      version: 'v1beta1',
      auth: printAccessToken(),
    });
  }

  getTraceClient(): cloudtrace_v1.Cloudtrace {
    return google.cloudtrace({
      version: 'v1',
      auth: printAccessToken(),
    });
  }
}

const printAccessToken = (): Auth.OAuth2Client => {
  const token = execSync('gcloud auth print-access-token');
  const auth = new google.auth.OAuth2();
  auth.setCredentials({
    access_token: token.toString().trim(),
  });
  return auth;
};

export const apiClientFactory = ApiClientFactory.getInstance();
