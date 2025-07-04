const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

const dataFile = path.join(__dirname, '../data/webhook.json');

router.post('/api/confirm', (req, res) => {
    const body = req.body;
    const data = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];

    data.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        body,
        approved: false
    });

    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.status(200).send({ status: 'received' });
});

module.exports = router;
