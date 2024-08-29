import PostModel from "../models/post.model.js";

export default class PosrController{
    getToHomePage(req,res){
        const posts = PostModel.fetchAllPosts();
        res.render('index',{posts});
    }
    uploadPost(req,res){
        const postFilename = req.file.filename;
        const {postContent} = req.body;
        const post = {
            time: new Date().toLocaleDateString(),
            content : postContent,
            fileName: postFilename,
            userName: req.cookies.userName
            };
        const newPost = PostModel.addPost(post);
        if(newPost)
           res.status(201).send({newPost,success:'post uploaded successfully'});
        else
            res.status(400).send({error:'post not uploaded'});
    }

}