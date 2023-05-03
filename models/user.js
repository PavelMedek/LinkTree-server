const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const User = new Schema(
  {
    name: { type: String },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: "https://i.imgur.com/nojzBeh_d.webp?maxwidth=760&fidelity=grand",
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Creator", "Agency", "Brand", "admin"],
      default: "Creator",
    },
    handle: { type: String, required: true, unique: true },
    links: [
      {
        url: { type: String },
        title: { type: String },
        icon: { type: String },
      },
    ],
    socialMedia: {
      facebook: {
        type: String,
        default: "",
      },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
    },
  },
  { collection: "user-data-linktree" }
);

const userModel = model("userData", User);

module.exports = userModel;
