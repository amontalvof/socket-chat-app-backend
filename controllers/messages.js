const Message = require('../models/message');

const getChat = async (req, res) => {
    const myId = req.uid;
    const messagesFrom = req.params.from;
    const last50messages = await Message.find({
        $or: [
            { from: myId, to: messagesFrom },
            { from: messagesFrom, to: myId },
        ],
    })
        .sort({ createdAt: 'desc' })
        .limit(50);

    return res.json({
        ok: true,
        messages: last50messages,
    });
};

module.exports = { getChat };
