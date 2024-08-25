import UserModel from "../models/user.model.js";
import ejs from 'ejs'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sendMail from "../middlewares/email.middleware.js";
import { generateSixDigitOTP } from "../middlewares/otpGenerator.middleware.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default class UserController {
    getLogin(req, res) {
        const result = UserModel.fetchUserLoginDetails(req.body);
        if (result) {
            res.status(200).json({ user: result, success: 'login successful' });
        }
        else {
            res.status(400).json({ error: 'invalid credentials' });
        }
    }
    getRegister(req, res) {
        if (UserModel.userRegister(req.body)) {
            res.status(201).json({ success: 'user registered successfully' });
        } else {
            res.status(400).json({ error: "user's mail already registered" });
        }
    }
    async getVerifyEmail(req, res) {
        const result = UserModel.verifyEmail(req.body);
        if (result) {
            const templatePath = path.resolve(__dirname, '..', 'views',  'otpEmail.ejs');
            const html = await ejs.renderFile(templatePath, { name: result.userNmae,otp:generateSixDigitOTP()});
            await sendMail(result.email,html,'OTP for verifaction');
            res.status(200).json({success:'OTP sent to your email'});
        }
        else {
            res.status(400).json({ error: 'Invalid email' });
        }

    }
}