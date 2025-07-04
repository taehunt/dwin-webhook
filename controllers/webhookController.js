const webhookService = require('../services/webhookService');

exports.receiveWebhook = async (req, res) => {
    try {
        const webhookData = req.body;
        const result = await webhookService.saveIncomingRequest(webhookData);
        res.status(200).json({ success: true, message: 'Webhook received', result });
    } catch (error) {
        console.error('Webhook 처리 오류:', error);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
};

exports.approveTransfer = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await webhookService.approveAndSendResponse(id);
        res.status(200).json({ success: true, message: '승인 완료', result });
    } catch (error) {
        console.error('승인 처리 오류:', error);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
};
