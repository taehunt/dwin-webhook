const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFile = path.join(__dirname, '../data/webhookRequests.json');
const ADMIN_PASSWORD = 'testwebhook';

router.get('/webhook-admin', (req, res) => {
    if (!req.session.authenticated) return res.render('login');
    const requests = JSON.parse(fs.readFileSync(dataFile, 'utf-8') || '[]');
    res.render('admin', { requests });
});

router.post('/login', (req, res) => {
    if (req.body.password === ADMIN_PASSWORD) {
        req.session.authenticated = true;
        res.redirect('/webhook-admin');
    } else {
        res.render('login', { error: '비밀번호가 틀렸습니다.' });
    }
});

router.post('/approve/:id', (req, res) => {
    const requests = JSON.parse(fs.readFileSync(dataFile, 'utf-8') || '[]');
    const requestIndex = requests.findIndex(r => r.id === parseInt(req.params.id));
    if (requestIndex !== -1) {
        requests[requestIndex].approved = true;
        fs.writeFileSync(dataFile, JSON.stringify(requests, null, 2));
    }
    res.redirect('/webhook-admin');
});

router.get('/webhook-view', (req, res) => {
    const requests = JSON.parse(fs.readFileSync(dataFile, 'utf-8') || '[]');
    res.render('public', { requests });
});


module.exports = router;
