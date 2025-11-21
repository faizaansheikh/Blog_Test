const {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById
} = require("../controllers/users");

const express = require('express')
const router = express.Router()

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUser)
router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)



module.exports = router