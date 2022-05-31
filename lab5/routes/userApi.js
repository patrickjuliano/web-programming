const express = require('express');
const router = express.Router();
const data = require('../data');
const userApiData = data.userApi;

function checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: Parameter must be a string';
    id = id.trim();
    if (id.length === 0) throw 'Error: id cannot be an empty string or just spaces';
    if (!Number(id) || !Number.isInteger(Number(id)) || Number(id) <= 0) throw 'Error: id must be a positive whole number';
    return id;
}

router
    .route('/people')
    .get(async (req, res) => {
        try {
            const data = await userApiData.getPeople();
            res.json(data);
        } catch (e) {
            res.status(404).json(e);
        }
    });

router
    .route('/work')
    .get(async (req, res) => {
        try {
            const data = await userApiData.getWork();
            res.json(data);
        } catch (e) {
            res.status(404).json(e);
        }
    });

router
    .route('/people/:id')
    .get(async (req, res) => {
        try {
            req.params.id = checkId(req.params.id);
            const data = await userApiData.getPersonById(Number(req.params.id));
            res.json(data);
        } catch (e) {
            res.status(404).json(e);
        }
    });

router
    .route('/work/:id')
    .get(async (req, res) => {
        try {
            req.params.id = checkId(req.params.id);
            const data = await userApiData.getWorkById(Number(req.params.id));
            res.json(data);
        } catch (e) {
            res.status(404).json(e);
        }
    });

module.exports = router;