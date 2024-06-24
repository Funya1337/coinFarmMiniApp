const crypto = require('crypto');

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

module.exports = {
    checkSignature
};