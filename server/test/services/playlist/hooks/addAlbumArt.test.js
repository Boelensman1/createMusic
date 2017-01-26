'use strict';

const assert = require('assert');
const addAlbumArt = require('../../../../src/services/playlist/hooks/addAlbumArt.js');

describe('playlist addAlbumArt hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    addAlbumArt()(mockHook);

    assert.ok(mockHook.addAlbumArt);
  });
});
