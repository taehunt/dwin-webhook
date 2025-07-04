const axios = require('axios');

let storedWebhooks = []; // 간단한 인메모리 저장소

exports.saveIncomingRequest = async (data) => {
    const id = storedWebhooks.length + 1;
    const newEntry = { id, data, approved: false };
    storedWebhooks.push(newEntry);
    return newEntry;
};

exports.approveAndSendResponse = async (id) => {
    const entry = storedWebhooks.find(item => item.id === Number(id));
    if (!entry) throw new Error('요청을 찾을 수 없음');

    entry.approved = true;

    // 외부에 승인 결과 전송
    const response = await axios.post('https://외부요청주소.com/api/confirm', {
        id: entry.id,
        status: 'approved',
        message: '송금 승인 완료'
    });

    return response.data;
};
