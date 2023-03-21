const express = require("express");
const router = express.Router();
const newCommunity = require("../controllers/new-community.controller.js");

// create community
router.post("/", newCommunity.create);

// findAll communities
router.get("/", newCommunity.findAll);

// findAll communities
router.get("/:communityId", newCommunity.findOne);

// delete community
router.delete("/:communityId", newCommunity.delete);

module.exports = router;
