const User = require("../models/user");
const jwt_decode = require("jwt-decode");

const dashboardData = async (req, res) => {
  const { tokenMail } = req.body;

  try {
    const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
    const email = decodedTokenMail.email;

    const user = await User.findOne({ email: email });
    const userData = {
      name: user.name,
      role: user.role,
      bio: user.bio,
      avatar: user.avatar,
      handle: user.handle,
      links: user.links.length,
    };

    return res.json({
      message: "User Loaded",
      userData,
      status: "Okay",
    });
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
};

module.exports = { dashboardData };
