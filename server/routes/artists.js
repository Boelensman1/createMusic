const path = require('path');
const express = require('express');
const mung = require('express-mung');

const router = express.Router();

function addAlbumArt(body, req, res) {
  return body.then((result) => (
    result.map((artistName) => {
      const albumArt = `http://mainpc:81/${artistName}/albumart.jpg`
      return {
        name: artistName,
        albumArt: albumArt,
      }
    })
  ));
}

router.use('/artists', mung.jsonAsync(addAlbumArt));

router.get('/artists/:id', (req, res) => {
  const id = req.params.id;
  const mpc = req.app.get('mpc');
  return res.json(mpc.database.list('Album', [['AlbumArtist', id]])
    .then(r => [...r][0][1]));
});

router.get('/artists', (req, res) => {
  const mpc = req.app.get('mpc');
  return res.json(mpc.database.list('AlbumArtist').then(r => [...r][0][1]));
});


module.exports = router;
