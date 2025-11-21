const {
    handleGetAllPosts,
    handleGetPostById,
    handleUpdatePostById,
    handleDeletePostById,
    handleCreatePost
} = require("../controllers/posts");

const express = require('express')
const router = express.Router()

router.route("/")
    .get(handleGetAllPosts)
    .post(handleCreatePost)
router.route("/:id")
    .get(handleGetPostById)
    .patch(handleUpdatePostById)
    .delete(handleDeletePostById)



module.exports = router