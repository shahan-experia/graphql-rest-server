const path = require('path');
const fs = require('fs');
const express = require('express');

const router = express.Router();

fs.readdirSync(__dirname).forEach((file) => {
	if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
		router.use(`/${file}`, require(`./${file}`));
	}
});

module.exports = router;
