import test from 'node:test';
import assert from 'node:assert/strict';
import { projectCode } from '../src/services/project-service.js';

test('projectCode returns TOKOFILE format', () => {
  assert.match(projectCode(), /^TKF-\d{6}-[A-F0-9]{4}$/);
});
