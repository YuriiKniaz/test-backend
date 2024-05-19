const { model, Schema } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongoseError");

// Models

const userModel = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  birth: {
    type: Date,
    required: [true, "birth date is required"],
  },
  whereFound: {
    type: String,
  },
});

const eventModel = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  eventDate: {
    type: Date,
  },
  organizer: {
    type: String,
  },
  users: [userModel],
});

//Joi Schemas

const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  eventDate: Joi.date().required(),
  organizer: Joi.string().required(),
});

const registerSchema = Joi.object({
  name: Joi.string().required("name is required").min(8),
  email: Joi.string().required("email is required").email(),
  birth: Joi.date().required("birth date is required"),
  whereFound: Joi.string(),
});

const schemas = {
  eventSchema,
  registerSchema,
};

eventModel.post("save", handleMongooseError);

const Event = model("Event", eventModel);
// const User = model('User', userModel)

module.exports = { Event, schemas };
