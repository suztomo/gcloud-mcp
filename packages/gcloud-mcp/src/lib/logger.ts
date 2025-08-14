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

import { createInterface } from 'node:readline';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  silent: false,
  transports: [
    new winston.transports.Console({
      // Direct all log levels to stderr so stdout is clean for tool responses
      stderrLevels: ['info', 'warn', 'error'],
    }),
  ],
});
// Export the single logger instance
export default logger;

// logger.info('MCP server started and listening for requests.');