export default class UserModel{
    constructor(id,userName,name,email,password){
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.email = email;
        this.password = password;
        }
        static fetchUserLoginDetails(loginUser){
            return users.find(user=>user.email == loginUser.email && user.password == loginUser.password);
        }
        static userRegister(regiserUser){
            if(users.find(user=>user.email == regiserUser.email))
                return false;
            else{
                users.push(regiserUser);
                return true;
            }
        }
        static verifyEmail(email){
            return users.find(user=>user.email == email);
        }

}

let users = []