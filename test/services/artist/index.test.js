'use strict';

const assert = require('assert');
const request = require('request-promise');
const app = require('../../../src/app');

const url = 'http://localhost:3030/artists/';

describe('artist service', function() {
  before(function(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('registered the artists service', () => {
    assert.ok(app.service('artists'));
  });

  it('should list the artists', () => (
    request({url: url, json: true}).then((artists) => {
      assert.ok(Array.isArray(artists), 'Artists should be an array');
      assert.ok(artists.length > 0, 'Should contain at least one element');
      assert.equal(typeof artists[0], 'string');
      assert.ok(artists[0].length > 0, 'String should not be empty');
    })
  ));
});
