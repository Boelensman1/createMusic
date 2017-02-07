const path = require('path');
const express = require('express');

const router = express.Router();

router.post('/ReplacePlaylist', (req, res) => {
  const mpc = req.app.get('mpc');
  const search = [];
  if (req.body.album) {
    search.push(['Album', req.body.album])
  }
  if (req.body.albumArtist) {
    search.push(['AlbumArtist', req.body.albumArtist])
  }
  return res.json(mpc.currentPlaylist.clear().then(() => (
    mpc.database.findAdd(search)).then(
      mpc.playback.play().then(() => null)
    )
  ));
});


module.exports = router;
