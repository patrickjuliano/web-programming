const express = require('express');
const router = express.Router();
const data = require('../data');
const albumData = data.albums;
const {ObjectId} = require('mongodb');

router.get('/:bandId', async (req, res) => {
    try {
        if (!req.params.bandId) throw 'You must provide an id to search for';
        if (typeof req.params.bandId !== 'string') throw 'Id must be a string';
        if (req.params.bandId.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
        req.params.bandId = req.params.bandId.trim();
        if (!ObjectId.isValid(req.params.bandId)) throw 'Invalid object ID';
    } catch (e) {
        return res.status(400).json(e);
    }
    try {
        const album = await albumData.getAll(req.params.bandId);
        if (album.length === 0) throw 'No albums found';
        res.status(200).json(album);
    } catch (e) {
        res.status(404).json({error: e});
    }
});

router.post('/:bandId', async (req, res) => {
    const album = req.body;
    try {
        if (!req.params.bandId || !album.title || !album.releaseDate || !album.tracks || !album.rating) throw 'Input not supplied or undefined';

        if (typeof req.params.bandId !== 'string' || typeof album.title !== 'string' || typeof album.releaseDate !== 'string') throw 'Input is not a string';
        req.params.bandId = req.params.bandId.trim();
        album.title = album.title.trim();
        album.releaseDate = album.releaseDate.trim();
        if (req.params.bandId.length === 0 || album.title.length === 0 || album.releaseDate.length === 0) throw 'Strings must not be empty';

        if (!ObjectId.isValid(req.params.bandId)) throw 'Invalid object ID';

        if (!Array.isArray(album.tracks)) throw 'Input is not an array';
        if (album.tracks.find(element => typeof element !== 'string' || element.trim().length === 0) || album.tracks.length < 3) throw 'Arrays must contain only valid, non-empty strings and be of length at least 3';
        for (const [i, e] of album.tracks.entries()) {
            album.tracks[i] = album.tracks[i].trim();
        }

        let releaseDateRaw = album.releaseDate;
        let fields = releaseDateRaw.split('/');
        if (fields.length != 3 || fields[0].length != 2 || fields[1].length != 2 || fields[2].length != 4) throw 'Invalid releaseDate provided';
        for (const [i, e] of fields.entries()) {
            fields[i] = Number(fields[i]);
            if (isNaN(fields[i])) throw 'Invalid releaseDate provided';
        }
        if ((fields[0] < 1 || fields[0] > 12) || (fields[2] < 1900 || fields[2] > 2023)) throw 'Invalid releaseDate provided';
        if (((fields[1] < 1) || (fields[1] > 31)) || ((fields[0] === 2) && (fields[1] > 28)) || (((fields[0] === 4) || (fields[0] === 6) || (fields[0] === 9) || (fields[0] === 11)) && (fields[1] > 30))) throw 'Invalid releaseDate provided';
        
        if (typeof album.rating !== 'number' || album.rating < 1 || album.rating > 5) throw 'rating must be a valid number between 1 and 5';
    } catch (e) {
        return res.status(400).json(e);
    }
    try {
        const {title, releaseDate, tracks, rating} = album;
        const newAlbum = await albumData.create(req.params.bandId, title, releaseDate, tracks, rating);
        res.status(200).json(newAlbum);
    } catch (e) {
        res.status(404).json(e);
    }
});

router.get('/album/:albumId', async (req, res) => {
    try {
        if (!req.params.albumId) throw 'You must provide an id to search for';
        if (typeof req.params.albumId !== 'string') throw 'Id must be a string';
        if (req.params.albumId.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
        req.params.albumId = req.params.albumId.trim();
        if (!ObjectId.isValid(req.params.albumId)) throw 'Invalid object ID';
    } catch (e) {
        return res.status(400).json(e);
    }
    try {
        const album = await albumData.get(req.params.albumId);
        res.status(200).json(album);
    } catch (e) {
        res.status(404).json({error: e});
    }
});

router.delete('/:albumId', async (req, res) => {
    try {
        if (!req.params.albumId) throw 'You must provide an id to search for';
        if (typeof req.params.albumId !== 'string') throw 'Id must be a string';
        if (req.params.albumId.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
        req.params.albumId = req.params.albumId.trim();
        if (!ObjectId.isValid(req.params.albumId)) throw 'Invalid object ID';
    } catch (e) {
        return res.status(400).json(e);
    }
    try {
        await albumData.get(req.params.albumId);
    } catch (e) {
        return res.status(404).json({error: 'Album not found'});
    }
    try {
        await albumData.remove(req.params.albumId);
        res.status(200).json({albumId: req.params.albumId, deleted: true});
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;