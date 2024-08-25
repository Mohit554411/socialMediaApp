import nodemailer from 'nodemailer';

async function sendMail(userEmail,data,subject){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajkaran541@gmail.com',
            pass:'gycvlvfhclsniegd'
        }
    });
   
    const mailOptions = {
        from: 'rajkaran541@gmail.com',
        to: userEmail,
        subject: subject,
        html: data,
        };

    try{
        const emailstatus = await transporter.sendMail(mailOptions);
        console.log(emailstatus);
        return true;
    }catch(err){
        console.log(err);
        return err
    }
}

export default sendMail;