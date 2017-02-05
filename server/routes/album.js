const path = require('path');
const express = require('express');

const router = express.Router();

function addSongArt(result) {
  return result.map((song) => {
    song.albumArt = `http://mainpc:81/${path.dirname(song.path)}/albumart.jpg`
    return song;
  })
}

function addAlbumArt(artistName, result) {
  return result.map((albumName) => {
    const albumArt = `http://mainpc:81/${artistName}/${albumName}/albumart.jpg`
    return {
      name: albumName,
      albumArt: albumArt,
    }
  })
}

router.get('/artists/:albumArtist/albums/:album', (req, res) => {
  const album = req.params.album;
  const albumArtist = req.params.albumArtist;
  console.log(album, albumArtist)
  const mpc = req.app.get('mpc');

  return res.json(mpc.database.list('file', [['AlbumArtist', albumArtist], ['Album', album]])
    .then(r => [...r][0][1][0]).then((file) => {
      albumPath = path.dirname(file);
      return mpc.database.listInfo(albumPath).then(addSongArt)
    }));
});

router.get('/artists/:albumArtist/albums/', (req, res) => {
  const mpc = req.app.get('mpc');
  return res.json(mpc.database.list('Album').then(r => [...r][0][1]).then(addAlbumArt));
});


module.exports = router;
