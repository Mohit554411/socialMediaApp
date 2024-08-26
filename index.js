import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import UserController from './src/controllers/user.controller.js';

const app = express();

const userController = new UserController();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressEjsLayouts);
app.use(express.static('public'));
app.use(express.static('src/views'));
app.set('views',path.join(path.resolve(), 'src','views'));

app.get('/', (req, res) => {
    res.render('login');
});
app.post('/login',userController.getLogin);
app.post('/signUp',userController.getRegister);
app.post('/verifyEmail');
app.get('/home',(req,res)=>{
    res.render('index');
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});