const express = require("express");
const ctrl = require("../controllers/events");
const router = express.Router();

const validBody = require("../middlewares/validBody");

const { schemas } = require("../models/events");


router.get('/event/allEvents', ctrl.getAllEvents);
router.get('/event/:eventId/allUsers', ctrl.getAllUsers)


router.post("/event", validBody(schemas.eventSchema), ctrl.addEvent);
router.post(
  "/event/:eventId/register",
  validBody(schemas.registerSchema),
  ctrl.registerUser
);

module.exports = router;
