require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters')
const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const mongoose = require('mongoose');
const models = require('./models');

const PORT = process.env.PORT || 8000;
const app = express();
const bot = new Telegraf(process.env.TG_TOKEN);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to mongodb

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });
}

connectToDB();

const keyboard = Markup.inlineKeyboard([
    Markup.button.webApp('test web app', `${process.env.CLIENT_URL}`),
    // Markup.button.login('Login', `${process.env.SERVER_URL}/login`, {
    //   bot_username: 'shadcoinbot',
    //   forward_text: 'test forward text',
    //   request_write_access: true,
    //   forward_text: 'Login (forwarded)'
    // }),
    // Markup.button.callback("Awesome button 🔥", "callbackFunction")
  ])

bot.start((ctx) => ctx.reply('Hello', keyboard))

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

function HMAC_SHA256(key, secret) {
    return crypto.createHmac("sha256", key).update(secret);
}

function getCheckString(data) {
	const items = [];
	for (const [k, v] of data.entries()) if (k !== "hash") items.push([k, v]);

	return items.sort(([a], [b]) => a.localeCompare(b))
		.map(([k, v]) => `${k}=${v}`)
		.join("\n");
}

const checkSignature = (req, res, next) => {
    const initData = new URLSearchParams(req.body.initData);

    const data_check_string = getCheckString(initData);
    const secret_key = HMAC_SHA256("WebAppData", process.env.TG_TOKEN).digest();
	const hash = HMAC_SHA256(secret_key, data_check_string).digest("hex");

    if (hash === initData.get("hash")) {
        req.body.queryId = initData.get("query_id");
        req.body.authDate = initData.get("auth_date");
        req.body.user = JSON.parse(initData.get("user"));
        return next();
    }

    console.log("Unauthorized");
    return res.status(403).send("Unauthorized");
}

app.post("/api/increment/impact/:uid", async (req, res) => {
    const userId = req.params.uid;
    try {
        let gameSession = await models.GameSession.findOne({ userId });
        if (!gameSession) {
            return res.status(404).send('Game session not found');
        }
        res.status(200).send({ clickImpact: gameSession.clickImpact });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.post("/api/clicks/update/:amount/:uid", async (req, res) => {
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
            // console.log("updated clicks by: " + gameSession.clicks);
            res.status(200).send({clicks: savedGameSession.clicks});
        })
        .catch((err) => res.status(500).send(err))
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.post("/api/increment/:uid", async (req, res) => {
    const userId = req.params.uid;
    try {
        let gameSession = await models.GameSession.findOne({ userId });
        if (!gameSession) {
            return res.status(404).send('Game session not found');
        }
        const updatedClicks = parseFloat((gameSession.clicks + gameSession.clickImpact).toFixed(6));
        gameSession.clicks = updatedClicks;
        gameSession.score += 1;
        gameSession.updatedAt = Date.now();
        await gameSession.save()
            .then((savedGameSession) => {
                console.log("increment");
                res.status(200).send({clicks: savedGameSession.clicks});
            })
            .catch((err) => res.status(500).send(err))
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.post('/api/verify', checkSignature, async (req, res) => {
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
        console.log("adding user to db");
        await userDoc.save();
        await gameSessionDoc.save();
    }
    const resData = {
        user: req.body.user,
        gameSession: await models.GameSession.findOne({ userId: req.body.user.id }).exec()
    };
    console.log(resData);
    console.log("user already exist");
    res.send(resData);
})

app.get('/test', (req, res) => {
    res.send("your telegram web app");
})

app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));