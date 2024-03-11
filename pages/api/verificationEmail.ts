const nodemailer = require('nodemailer')
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://ahmadwael1414:lovescience@ahmadmongocluster.gjar3ok.mongodb.net/?retryWrites=true&w=majority";

export default async function handler(req, res) {
    const randomNum = randomNumGenerator()
    let doc = { ...req.body,_id:randomNum,verified:false}
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ahmadwael1414@gmail.com', pass: process.env.PASSWORD
        }
    })
    const mailOptions = {
        from: 'ahmadwael1414@gmail.com',
        to: req.body.phoneOrEmail,
        subject: 'test email',
        text: `Your reservation code is ${randomNum}`
    }
    transporter.sendMail(mailOptions,async (error, info) => {
        if (error) {
            console.error(error);
            res.status(200).json({ redirect: false });
        } else {
            console.log('Email sent: ' + info.response);
            const client = new MongoClient(uri);
            const database = client.db('ENT');
            const patientsCollection = database.collection('patients');
            await patientsCollection.insertOne(doc, (err) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log('successfully done');
                }
            })

            res.status(200).json({ redirect: true });
        }
    });

}
function randomNumGenerator() {
    let randomNum = ''
    for (let i = 0; i < 8; i++) {
        let digit = Math.floor(Math.random() * 10)
        randomNum += digit
    }
    return randomNum
}

function verifyRandomNum(body) {

}