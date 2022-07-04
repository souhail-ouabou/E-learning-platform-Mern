const nodemailer = require('nodemailer')

const dotenv = require('dotenv')
dotenv.config()

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
} = process.env

// send mail
const sendEmail = (to, url, name, txt) => {
    console.log('send mail')

    const smtpTransport = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    })

    const mailOptions = {
        from: process.env.USER,
        to: to,
        subject: "EduSpace Activation mail",
        html: `
                <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <img src="https://i.imgur.com/4jq68uE.png" alt style="display: block; margin:auto;" width="205"; >
                <h2 style="text-align: center; text-transform: uppercase;color: rgb(37, 132, 214);">Welcome to EduSpace.</h2>
                Hey <strong> ${name},</strong>
                Thanks for signing up at EduSpace.   
                To complete your registration, please confirm your email <strong>${to}</strong> by clicking the following button:
                
                <div style="text-align:center">   
                <a href=${url} style="background: rgb(37, 132, 214); text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
                </div>
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
                <div>${url}</div>
                </div>
            `,
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
       console.log(err)
       console.log(infor)
        if (err) return res
                    .status(500)
                    .json({ msg: "Can't sent the email try later..." })
        return infor
        
    })
}

module.exports = sendEmail