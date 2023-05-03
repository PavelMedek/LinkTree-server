require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const { registerUser, loginUser } = require("./controllers/auth");
const { dashboardData } = require("./controllers/dashboard");
const { getUserData, getUserSocials } = require("./controllers/getUserData");
const {
  saveSocials,
  loadSocials,
  saveProfile,
  loadLinks,
  saveLinks,
} = require("./controllers/saveItems");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

app.post("/data/dashboard", dashboardData);

app.get("/get/:handle", getUserData);
// app.get("/get/socials/:handle", getUserSocials);

app.post("/save/socials", saveSocials);
app.post("/save/profile", saveProfile);
app.post("/load/socials", loadSocials);
app.post("/load/links", loadLinks);
app.post("/save/links", saveLinks);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
