'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('playback service', function() {
  it('registered the playbacks service', () => {
    assert.ok(app.service('playbacks'));
  });
});
