'use strict';

const path = require('path');

// src/services/playlist/hooks/addAlbumArt.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.addAlbumArt = true;
    Object.keys(hook.result).forEach((key) => {
      hook.result[key] = hook.result[key].map((item) => {
        item.albumArt = `http://mainpc:81/${path.dirname(item.path)}/albumart.jpg`
        return item;
      })
    })
  };
};
