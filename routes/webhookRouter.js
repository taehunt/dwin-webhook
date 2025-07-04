const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

router.post('/webhook', webhookController.receiveWebhook);      // webhook 수신
router.post('/approve/:id', webhookController.approveTransfer); // 승인 처리

module.exports = router;
