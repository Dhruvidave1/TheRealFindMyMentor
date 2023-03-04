const express = require("express");
const matchController = require('../controllers/matchController');

const router = express.Router();

router.get("/", matchController.getMatches);

module.exports = router;