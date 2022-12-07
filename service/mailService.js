const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth :{
        user : "amanguptaeducation@gmail.com",
        pass : "xufhijqmkmdobzne"
    }
});

const mailOptions = {
    from : "amanguptaeducation@gmail.com",
    to : "sreshti11@gmail.com",
    subject : "Test Mail for nodejs",
    text :  "Hey this is test mail.."
}

module.exports={
    transporter,mailOptions
}