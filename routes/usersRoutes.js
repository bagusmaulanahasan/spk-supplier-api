const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const { verifyToken, isManager } = require("../middleware/auth");

// hanya manager bisa akses
router.get("/", verifyToken, isManager, controller.getAll);
router.get("/:id", verifyToken, isManager, controller.getById);
router.post("/", verifyToken, isManager, controller.create);
router.put("/:id", verifyToken, isManager, controller.update);
router.delete("/:id", verifyToken, isManager, controller.delete);

module.exports = router;
