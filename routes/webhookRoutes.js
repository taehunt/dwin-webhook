const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFile = path.join(__dirname, '../data/webhookRequests.json');

router.post('/api/webhook', (req, res) => {
    const newRequest = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        body: req.body,
        approved: false
    };

    const currentData = JSON.parse(fs.readFileSync(dataFile, 'utf-8') || '[]');
    currentData.push(newRequest);
    fs.writeFileSync(dataFile, JSON.stringify(currentData, null, 2));
    res.status(200).json({ message: 'Webhook received.' });
});

module.exports = router;
