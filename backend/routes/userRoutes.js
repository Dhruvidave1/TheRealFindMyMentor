const express = require("express");
const userController = require('../controllers/userController');



const router = express.Router();

router.get("/", protect, userController.getUsers);
router.post("/", userController.createUser);
router.patch("/", userController.updateUser);
router.delete("/". userController.removeUser);

module.exports = router;

