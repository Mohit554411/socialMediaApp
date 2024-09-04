export default class LikesModel {
    constructor(id, postId, userName) {
        this.id = id;
        this.postId = postId;
        this.userName = userName;
    }
    static fetchAllLikes() {
        return likes;
    }
    static fetchLikesByPostId(postId) {
        return likes.filter(like => like.postId == postId);
    }
    static fetchLikesByUserName(userName) {
        return likes.filter(like => like.userName == userName);
    }
    static toggleLike(like) {
        if (likes.find(l => l.postId == like.postId && l.userName == like.userName)) {
            likes = likes.filter(l => l.postId != like.postId && l.userName != like.userName);
            return -1;
        }else{
            const newLike = new LikesModel(likes.length + 1, ...Object.values(like));
            likes.push(newLike);
            return 1;
        }
    }
    static deleteLike(id) {
        likes = likes.filter(like => like.id != id);
    }
}
let likes = [];