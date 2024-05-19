const HttpError = require("../helpers/HttpError");
const { Event } = require("../models/events");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { nanoid } = require("nanoid");

const addEvent = async (req, res) => {
  const newEvent = await Event.create({ ...req.body });

  res.status(201).json({
    event: {
      _id: newEvent._id,
      title: newEvent.title,
      description: newEvent.description,
      eventDate: newEvent.eventDate,
      organizer: newEvent.organizer,
    },
  });
};

const registerUser = async (req, res) => {
  const { email, name, birth, whereFound } = req.body;
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    throw HttpError(404, "Event does not exist");
  }

  const existingEmail = event.users.find((user) => user.email === email);
  if (existingEmail) {
    throw HttpError(409, "Email in use");
  }

  const newUser = {
    id: nanoid(),
    name,
    email,
    birth,
    whereFound,
  };

  event.users.push(newUser);
  await event.save();

  res.status(201).json({
    event: {
      _id: event._id,
      title: event.title,
      description: event.description,
      eventDate: event.eventDate,
      organizer: event.organizer,
      users: event.users,
    },
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  addEvent: ctrlWrapper(addEvent),
};
