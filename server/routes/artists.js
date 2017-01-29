const path = require('path');
const express = require('express');

const router = express.Router();

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
