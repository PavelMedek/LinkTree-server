const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { handle, email, password, category } = req.body;

  try {
    const defaultLink = {
      url: "typefinance.com",
      title: "TypeFinance",
      icon: "https://typefinance.com/favicon.png",
    };

    const user = await User.create({
      handle,
      email,
      password,
      role: category,
      links: [defaultLink],
    });

    const token = jwt.sign({ email: email }, process.env.SECRET_JWT);

    return res.json({
      message: "user created",
      status: "success",
      token: token,
      id: user._id,
    });
  } catch (err) {
    if (err.code === "11000") {
      return res.json({
        message: "Try a different handle or email",
        status: "error",
      });
    }

    return res.json({
      message: err.message,
      status: "error",
    });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email: email, password: password });

    if (!user) {
      return res.json({
        status: "not found",
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ email: email }, process.env.SECRET_JWT);

    return res.json({
      message: "user found",
      status: "success",
      token: token,
      id: user._id,
    });
  } catch (error) {
    return res.json({
      message: err.message,
      status: "error",
    });
  }
};

module.exports = { registerUser, loginUser };
