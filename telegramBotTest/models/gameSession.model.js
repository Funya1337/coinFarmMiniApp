const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const gameSessionSchema = new Schema({
    userId: { type: Number, required: true, ref: 'User' },
    score: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    clickImpact: {type: Number, default: 0.000001},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const GameSession = model("GameSession", gameSessionSchema);

module.exports = GameSession;