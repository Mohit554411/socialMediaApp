export default class CommentsModel {
    constructor(id, postId, userName, comment) {
        this.id = id;
        this.postId = postId;
        this.userName = userName;
        this.comment = comment;
    }
    static fetchAllComments() {
        return comments;
    }
    static fetchCommentsByPostId(postId) {
        return comments.filter(comment => comment.postId == postId);
    }
    static fetchCommentsByUserName(userName) {
        return comments.filter(comment => comment.userName == userName);
    }
    static addComment(comment) {
        const newComment = new CommentsModel(comments.length + 1, ...Object.values(comment));
        comments.push(newComment);
        return newComment
    }
    static deleteComment(id) {
        comments = comments.filter(comment => comment.id != id);
    }
}
let comments = [];