
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const Users = require("../models/users");


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

async function handleGetAllUsers(req, res) {
    const allUsers = await Users.find({})
    return res.json(allUsers)

}
async function handleCreateUser(req, res) {
    try {
        const body = req.body;
        const { name, email, password, role } = body
        const hashedPass = await bcrypt.hash(password, 10);

        await Users.create({
            name: name,
            email: email,
            password: hashedPass,
            role: role
        })
        return res.status(201).json({ message: 'User created successfully!' })
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }

}
async function handleGetUserById(req, res) {
    const user = await Users.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "user not found" })
    return res.json(user)
}
async function handleUpdateUserById(req, res) {
    Users.findByIdAndUpdate(req.params.id)
    return res.json({ status: 'success' })
}
async function handleDeleteUserById(req, res) {
    Users.findByIdAndDelete(req.params.id)
    return res.json({ status: 'success' })
}
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}