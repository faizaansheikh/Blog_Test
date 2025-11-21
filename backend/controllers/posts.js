const Posts = require("../models/Posts");


async function handleGetAllPosts(req, res) {
    const allPosts = await Posts.find({})
    return res.json(allPosts)

}
async function handleCreatePost(req, res) {
    try {
        const body = req.body;
        const { title, content, author, status } = body


        await Posts.create({
            title: title,
            content: content,
            author: author,
            status: status
        })
        return res.status(201).json({ message: 'Post created successfully!' })
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }

}
async function handleGetPostById(req, res) {
    const post = await Posts.findById(req.params.id)
    if (!post) return res.status(404).json({ error: "post not found" })
    return res.json(post)
}


async function handleUpdatePostById(req, res) {
    try {
        const postId = req.params.id;
        const updateData = req.body;

        const updatedPost = await Posts.findByIdAndUpdate(
            postId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ status: "error", message: "Post not found" });
        }

        res.json({ status: "success", data: updatedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Server error" });
    }
}



async function handleDeletePostById(req, res) {
    try {
        const postId = req.params.id;
        const deletedPost = await Posts.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ status: "error", message: "Post not found" });
        }
        res.json({ status: "success", message: "Post deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Server error" });
    }
}
module.exports = {
    handleGetAllPosts,
    handleGetPostById,
    handleUpdatePostById,
    handleDeletePostById,
    handleCreatePost
}