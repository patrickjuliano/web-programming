const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validation = require('../validation');

router.get('/', async (req, res) => {
    if (req.session.username) {
        res.redirect('/private');
    } else {
        res.render('partials/login');
    }
});

router.get('/signup', async (req, res) => {
    if (req.session.username) {
        res.redirect('/private');
    } else {
        res.render('partials/signup');
    }
});

router.post('/signup', async (req, res) => {
    try {
        req.body.username = validation.checkUsername(req.body.username);
        req.body.password = validation.checkPassword(req.body.password);

        const user = await userData.createUser(req.body.username, req.body.password);
        if (user.userInserted) {
            res.status(200).redirect('/');
        } else {
            res.status(500).render('partials/signup', {error: 'Internal Server Error'});
        }
    } catch (e) {
        res.status(400).render('partials/signup', {error: e});
    }
});

router.post('/login', async (req, res) => {
    try {
        req.body.username = validation.checkUsername(req.body.username);
        req.body.password = validation.checkPassword(req.body.password);

        const user = await userData.checkUser(req.body.username, req.body.password);
        if (user.authenticated) {
            req.session.username = req.body.username;
            res.status(200).redirect('/private');
        } else {
            res.status(500).render('partials/login', {error: 'Internal Server Error'});
        }
    } catch (e) {
        res.status(400).render('partials/login', {error: e});
    }
});

router.get('/private', async (req, res) => {
    res.status(200).render('partials/username', {username: req.session.username});
});

router.get('/logout', async (req, res) => {
    if (req.session.username) {
        req.session.destroy();
        res.render('partials/logout');
    } else {
        res.redirect('/');
    }
});

module.exports = router;