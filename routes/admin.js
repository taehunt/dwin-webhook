const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const dataFile = path.join(__dirname, '../data/webhook.json');

router.get('/webhook-admin/login', (req, res) => {
    res.render('login');
});

router.post('/webhook-admin/login', (req, res) => {
    const { password } = req.body;
    if (password === 'testwebhook') {
        req.session.loggedIn = true;
        res.redirect('/webhook-admin');
    } else {
        res.send('비밀번호가 틀렸습니다.');
    }
});

router.get('/webhook-admin', authMiddleware, (req, res) => {
    const data = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
    res.render('webhook_list', { data });
});

router.get('/webhook-admin/:id', authMiddleware, (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    const item = data.find(d => d.id == req.params.id);
    if (!item) return res.send('요청을 찾을 수 없습니다.');
    res.render('webhook_detail', { item });
});

router.post('/webhook-admin/:id/approve', authMiddleware, (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    const idx = data.findIndex(d => d.id == req.params.id);
    if (idx > -1) {
        data[idx].approved = true;
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    }
    res.redirect('/webhook-admin');
});

module.exports = router;
