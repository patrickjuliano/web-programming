const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const {ObjectId} = require('mongodb');

router.get('/', async (req, res) => {
    try {
        const data = await bandData.getAll();
        let newData = [];
        for (const b of data) {
            newData.push({
                _id: b._id.toString(),
                name: b.name
            })
        }
        res.json(newData);
    } catch (e) {
        res.status(404).json(e);
    }
});

router.post('/', async (req, res) => {
    const band = req.body;
    try {
        if (!band.name || !band.genre || !band.website || !band.recordLabel || !band.bandMembers || !band.yearFormed) throw 'Input not supplied or undefined';

        if (typeof band.name !== 'string' || typeof band.website !== 'string' || typeof band.recordLabel !== 'string') throw 'Input is not a string';
        band.name = band.name.trim();
        band.website = band.website.trim();
        band.recordLabel = band.recordLabel.trim();
        if (band.name.length === 0 || band.website.length === 0 || band.recordLabel.length === 0) throw 'Strings must not be empty';
    
        let websiteRaw = band.website;
        websiteRaw = websiteRaw.replace('http://www.', '');
        websiteRaw = websiteRaw.replace('.com', '');
        if (!band.website.startsWith('http://www.') || !band.website.endsWith('.com') || websiteRaw.length < 5) throw 'Invalid website provided';
    
        if (!Array.isArray(band.genre) || !Array.isArray(band.bandMembers)) throw 'Input is not an array';
        if (band.genre.find(element => typeof element !== 'string' || element.trim().length === 0) || band.genre.length === 0 || band.bandMembers.find(element => typeof element !== 'string' || element.trim().length === 0) || band.bandMembers.length === 0 ) throw 'Arrays must contain only valid, non-empty strings';
        for (const [i, e] of band.genre.entries()) {
            band.genre[i] = band.genre[i].trim();
        }
        for (const [i, e] of band.bandMembers.entries()) {
            band.bandMembers[i] = band.bandMembers[i].trim();
        }
    
        if (typeof band.yearFormed !== 'number' || band.yearFormed < 1900 || band.yearFormed > 2022) throw 'yearFormed must be a valid number between 1900 and 2022';
    } catch (e) {
        return res.status(400).json(e);
    }
    try {
        const {name, genre, website, recordLabel, bandMembers, yearFormed} = band;
        const newBand = await bandData.create(name, genre, website, recordLabel, bandMembers, yearFormed);
        res.status(200).json(newBand);
    } catch (e) {
        res.status(404).json(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!req.params.id) throw 'You must provide an id to search for';
        if (typeof req.params.id !== 'string') throw 'Id must be a string';
        if (req.params.id.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
        req.params.id = req.params.id.trim();
        if (!ObjectId.isValid(req.params.id)) throw 'Invalid object ID';
    } catch (e) {
        return res.status(400).json(e);
    }
    try {
        const band = await bandData.get(req.params.id);
        res.status(200).json(band);
    } catch (e) {
        res.status(404).json({error: e});
    }
});

router.put('/:id', async (req, res) => {
    const band = req.body;
    try {
        if (!req.params.id || !band.name || !band.genre || !band.website || !band.recordLabel || !band.bandMembers || !band.yearFormed) throw 'Input not supplied or undefined';

        if (typeof req.params.id !== 'string' || typeof band.name !== 'string' || typeof band.website !== 'string' || typeof band.recordLabel !== 'string') throw 'Input is not a string';
        req.params.id = req.params.id.trim();
        band.name = band.name.trim();
        band.website = band.website.trim();
        band.recordLabel = band.recordLabel.trim();
        if (req.params.id.length === 0 || band.name.length === 0 || band.website.length === 0 || band.recordLabel.length === 0) throw 'Strings must not be empty';

        if (!ObjectId.isValid(req.params.id)) throw 'Invalid object ID';

        let websiteRaw = band.website;
        websiteRaw = websiteRaw.replace('http://www.', '');
        websiteRaw = websiteRaw.replace('.com', '');
        if (!band.website.startsWith('http://www.') || !band.website.endsWith('.com') || websiteRaw.length < 5) throw 'Invalid website provided';

        if (!Array.isArray(band.genre) || !Array.isArray(band.bandMembers)) throw 'Input is not an array';
        if (band.genre.find(element => typeof element !== 'string' || element.trim().length === 0) || band.genre.length === 0 || band.bandMembers.find(element => typeof element !== 'string' || element.trim().length === 0) || band.bandMembers.length === 0 ) throw 'Arrays must contain only valid, non-empty strings';
        for (const [i, e] of band.genre.entries()) {
            band.genre[i] = band.genre[i].trim();
        }
        for (const [i, e] of band.bandMembers.entries()) {
            band.bandMembers[i] = band.bandMembers[i].trim();
        }
    
        if (typeof band.yearFormed !== 'number' || band.yearFormed < 1900 || band.yearFormed > 2022) throw 'yearFormed must be a valid number between 1900 and 2022';
    } catch (e) {
       return res.status(400).json({error: e});
    }
    try {
        await bandData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({error: 'Band not found'});
    }
    try {
        const newBand = await bandData.update(req.params.id, band.name, band.genre, band.website, band.recordLabel, band.bandMembers, band.yearFormed);
        res.status(200).json(newBand);
    } catch (e) {
        res.status(400).json({error: e});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!req.params.id) throw 'You must provide an id to search for';
        if (typeof req.params.id !== 'string') throw 'Id must be a string';
        if (req.params.id.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
        req.params.id = req.params.id.trim();
        if (!ObjectId.isValid(req.params.id)) throw 'Invalid object ID';
    } catch (e) {
        return res.status(400).json(e);
    }
    try {
        await bandData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({error: 'Band not found'});
    }
    try {
        await bandData.remove(req.params.id);
        res.status(200).json({bandId: req.params.id, deleted: true});
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;