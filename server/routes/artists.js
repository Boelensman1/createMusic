const path = require('path');
const express = require('express');

const router = express.Router();

function addArtistArt(result) {
  return result.map((artistName) => {
    const albumArt = `http://mainpc:81/${artistName}/albumart.jpg`
    return {
      name: artistName,
      albumArt: albumArt,
    }
  })
}

function addAlbumArt(files) {
  const result = [];
  const directories = {};
  for (const entry of files) {
    if (entry.entryType === 'directory') {
      directories[entry.path] = false;
    } else {
      // put in the correct directory
      const directory = path.dirname(entry.path);
      if (directories[directory] === false) {
        directories[directory] = true;
        albumEntry = {
          name: entry.album,
          albumArtist: entry.albumArtist,
          date: entry.date,
          albumArt: `http://mainpc:81/${path.dirname(entry.path)}/albumart.jpg`,
          pathArtist: path.dirname(directory),
          pathAlbum: path.basename(directory),
        }
        result.push(albumEntry)
      }
    }
  }
  return result;
    /*return result.map((albumName) => {
    const albumArt = `http://mainpc:81/${artistName}/${albumName}/albumart.jpg`
    return {
      name: albumName,
      albumArt: albumArt,
    }
  })*/
}

router.get('/artists/:albumArtist', (req, res) => {
  const albumArtist = req.params.albumArtist;
  const mpc = req.app.get('mpc');
  console.log(albumArtist)
  return res.json(mpc.database.list('file', [['AlbumArtist', albumArtist]])
    .then(r => [...r][0]).then((files) => {
      if (!files || files.length < 2 || files[1].length === 0) {
        res.status(404);
        return;
      }
      const file = files[1][0];
      artistPath = path.dirname(path.dirname(file));
      return mpc.database.listAllInfo(artistPath).then(addAlbumArt)
    }));
});

router.get('/artists', (req, res) => {
  const mpc = req.app.get('mpc');
  return res.json(mpc.database.list('AlbumArtist').then(r => [...r][0][1]).then(addArtistArt));
});


module.exports = router;
