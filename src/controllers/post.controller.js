export default class PosrController{
    uploadPost(req,res){
        const postImg = req.file.filename;
        const {postContent} = req.body;
        const post = {
            postImg,
            postContent
            };
        console.log(post);
        res.status(201).send({success:'post uploaded successfully'});
    }

}