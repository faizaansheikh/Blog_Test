const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
 const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await Users.findOne({ name });
        if (!user) return res.status(200).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(200).json({ msg: "Incorrect password" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            msg: "Login success",
            user,
            token
        });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
module.exports = {loginUser}