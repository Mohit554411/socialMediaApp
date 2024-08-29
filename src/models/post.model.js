export default class PostModel {
    constructor(id, time, content, fileName, userName) {
        this.id = id;
        this.time = time;
        this.content = content;
        this.fileName = fileName;
        this.userName = userName;
        this.likes = 0;
        this.comments = [];
        this.share = 0;
    }
    static fetchAllPosts() {
        return posts;
    }
    static fetchPostById(id) {
        return posts.find(post => post.id == id);
    }
    static fetchPostsByUserName(userName) {
        return posts.filter(post => post.userName == userName);
    }
    static addPost(post) {
        const newPost = new PostModel(posts.length + 1, ...Object.values(post));
        posts.push(newPost);
        return newPost
    }
    static updatePost(post) {
        const index = posts.findIndex(p => p.id == post.id);
        posts[index] = post;
    }
    static deletePost(id) {
        posts = posts.filter(post => post.id != id);
    }
}

let posts = [];