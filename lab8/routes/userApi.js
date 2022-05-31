const express = require('express');
const router = express.Router();
const data = require('../data');
const userApiData = data.userApi;
const path = require('path');
const validation = require('../validation');

router.get('/', async (req, res) => {
    res.render('shows/home', {title: 'Show Finder'});
});

router.post('/searchshows', async (req, res) => {
    try {
        req.body.showSearchTerm = validation.checkString(req.body.showSearchTerm);

        const data = await userApiData.search(req.body.showSearchTerm);
        res.render('shows/search', {showSearchTerm: req.body.showSearchTerm, shows: data.slice(0, 5), title: 'Shows Found'});
    } catch (e) {
        res.status(400).render('shows/error', {error: e, class: 'error', title: 'Error'});
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        req.params.id = validation.checkId(req.params.id);

        const data = await userApiData.get(req.params.id);
        res.render('shows/show', {show: data, title: data.name});
    } catch (e) {
        res.status(404).render('shows/error', {error: e, class: 'error-not-found', title: 'Error'});
    }
});

module.exports = router;