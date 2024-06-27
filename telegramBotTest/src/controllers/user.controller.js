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
        const updatedTotalAmount = parseFloat((parseFloat(gameSession.totalAmount) + amount).toFixed(6));
        gameSession.totalAmount = updatedTotalAmount;
        gameSession.updatedAt = Date.now();
        await gameSession.save()
        .then((savedGameSession) => {
            res.status(200).send({ clicks: savedGameSession.totalAmount });
        })
        .catch((err) => res.status(500).send(err))
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const incrementClicks = async (req, res) => {
    const userId = req.params.uid;
    console.log(userId);
}

const addToStorage = async (req, res) => {
    console.log("post add to storage");
    const userId = req.params.uid;
    const amount = parseFloat(req.params.amount);
    console.log(amount)
    try {
        let gameSession = await models.GameSession.findOne({ userId });
        if (!gameSession) {
            return res.status(404).send('Game session not found');
        }
        const updatedStorage = parseFloat((parseFloat(gameSession.storage) + amount).toFixed(6));
        gameSession.storage = updatedStorage;
        gameSession.updatedAt = Date.now();
        await gameSession.save()
        .then((savedGameSession) => {
            res.status(200).send({ storage: savedGameSession.storage });
        })
        .catch((err) => res.status(500).send(err))
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    addClicks,
    incrementClicks,
    addToStorage
}