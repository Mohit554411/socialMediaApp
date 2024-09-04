import PostModel from "../models/post.model.js";
import LikesModel from "../models/likes.model.js";
export default class PosrController{
    getToHomePage(req,res){
        const posts = PostModel.fetchAllPosts();
        res.render('index',{posts});
    }
    uploadPost(req,res){
        const postFilename = req.file.filename;
        const {postContent} = req.body;
        const post = {
            time: Date.now(),
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
    togglePostLikes(req,res){
        const {postId} = req.body;
        const like = {
            postId,
            userName: req.cookies.userName
        };
        const result = LikesModel.toggleLike(like);
        if(result == 1){
            const post = PostModel.fetchPostById(postId);
            post.likes = LikesModel.fetchLikesByPostId(postId).length;
            PostModel.updatePost(post);
            res.status(200).send({action:true,like:post.likes});
        }else{
            const post = PostModel.fetchPostById(postId);
            post.likes = LikesModel.fetchLikesByPostId(postId).length;
            PostModel.updatePost(post);
            res.status(200).send({action:false,like:post.likes});
        }
    }
    deletePost(req,res){
        const {postId} = req.body;
        const result = PostModel.deletePost(postId);
        if(result)
            res.status(200).send({success:'post deleted'});
        else
            res.status(400).send({error:'post not deleted'});
    }

}