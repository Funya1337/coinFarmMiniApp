const models = require('../models');
const logger = require('../logger');

const addClicks = async (req, res) => {
    console.log("post clicks update amount");
    const userId = req.params.uid;
    const amount = parseFloat(req.params.amount);
    try {
        let gameSession = await models.GameSession.findOne({ userId });
        if (!gameSession) {
            return res.status(404).send('Game session not found');
        }
        const updatedClicks = parseFloat((parseFloat(gameSession.clicks) + amount).toFixed(6));
        gameSession.clicks = updatedClicks;
        gameSession.updatedAt = Date.now();
        await gameSession.save()
        .then((savedGameSession) => {
            res.status(200).send({clicks: savedGameSession.clicks});
        })
        .catch((err) => res.status(500).send(err))
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    addClicks
}