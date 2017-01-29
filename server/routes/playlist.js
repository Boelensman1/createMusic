const express = require('express');

const router = express.Router();


router.get('/playlists/:id', (req, res) => {
  res.on('finish',  (() => {
    const original = res.json;
    res.json = original;
    const json = {};
    return original.call(this, json);
    /*
     * Object.keys(hook.result).forEach((key) => {
      hook.result[key] = hook.result[key].map((item) => {
        item.albumArt = `http://mainpc:81/${path.dirname(item.path)}/albumart.jpg`
        return item;
      })
    })
    */
  }));

  const id = req.params.id;
  const mpc = req.app.get('mpc');

  if (id === 'current') {
    return res.json(mpc.currentPlaylist.playlistInfo());
  } else {
    // empty response -> 404
    return res.json(mpc.storedPlaylists.listPlaylistInfo(id).catch(() => {res.status(404)}));
  }
});

module.exports = router;
