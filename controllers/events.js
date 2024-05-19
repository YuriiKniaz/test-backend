const HttpError = require("../helpers/HttpError");
const { Event } = require("../models/events");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { nanoid } = require("nanoid");

const getAllEvents = async (req, res) => {
  const events = await Event.find();

  res.status(200).json({ events });
};

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

const getAllUsers = async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  if (!event) {
    throw HttpError(404, "Event does not exist");
  }
  console.log(event)

  res.status(200).json({ users: event.users });
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
  getAllEvents: ctrlWrapper(getAllEvents),
  getAllUsers: ctrlWrapper(getAllUsers),
};
