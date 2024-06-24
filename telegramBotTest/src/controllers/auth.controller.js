const logger = require('../logger');
const models = require('../models');

const verify = async (req, res) => {
    const userDoc = await models.User.findOne({ userId: req.body.user.id }).exec();

    if (!userDoc) {
        const userDoc = models.User({
            userId: req.body.user.id,
            username: req.body.user.username,
            firstName: req.body.user.first_name,
            lastName: req.body.user.last_name,
            authDate: req.body.authDate
        })
        const gameSessionDoc = models.GameSession({
            userId: req.body.user.id,
        })
        logger.info("adding user to db");
        await userDoc.save();
        await gameSessionDoc.save();
    }
    const resData = {
        user: req.body.user,
        gameSession: await models.GameSession.findOne({ userId: req.body.user.id }).exec()
    };
    logger.info(resData);
    logger.info("user already exist");
    res.send(resData);
}

module.exports = {
    verify
}