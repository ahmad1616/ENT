const { Vonage } = require('@vonage/server-sdk')
const nodemailer = require('nodemailer')
const { MongoClient } = require("mongodb");
const uri = process.env.URI
const password = process.env.PASSWORD
const email = process.env.EMAIL
/*
that function takes an email or phone number as argument and checks in application db 
if it has an account if the email has and account returns true else 
returns false
*/
export async function phoneOrEmailExists(phoneOrEmail, client) {
    const database = client.db('ENT');
    const users = database.collection('users');
    let query = { phoneOrEmail: phoneOrEmail }
    let doc = await users.findOne(query)
    return doc
}
/*
this creates a mailer object with the Email and Password you set in
environment variables
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email, pass: password
    }
})

/*
this function is used to send verification emails to 
users who created accounts 
*/
export async function sendVerificationEmail(client, res, doc) {
    const database = client.db('ENT');
    const users = database.collection('users');
    let randomNum = randomNumVerifier()
    doc['_id'] = randomNum
    doc['verified'] = false
    let { phoneOrEmail, profileImage } = doc
    const mailOptions = {
        from: email,
        to: phoneOrEmail,
        subject: 'Capital ENT Center verification number',
        text: `Your verification number is ${randomNum}`
    }
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.error(error);
            res.status(200).json({ accountExists: false, emailValid: false, redirect: false });
        } else {
            console.log('Email sent: ' + info.response);
            await users.insertOne(doc, (err) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log('successfully done');
                }
            })

            res.status(200).json({ accountExists: false, valid: true, redirect: true });
            await client.close()
            deactivationTimer(phoneOrEmail, profileImage)

        }
    });
}
const vonage = new Vonage({
    apiKey: process.env.VONAGEAPIKEY,
    apiSecret: process.env.VONAGEAPISECRET
})
const from = "Capital ENT"
export async function sendVerificationSMS(client, res, doc) {
    const randomNum = randomNumVerifier()
    doc['_id'] = randomNum
    doc['verified'] = false
    const database = client.db('ENT');
    const users = database.collection('users');
    let { phoneOrEmail, profileImage } = doc
    let to = phoneOrEmail
    let text = `Verification number is ${randomNum}`
    await vonage.sms.send({ to, from, text })
        .then(response => {
            users.insertOne(doc).then(response => { res.status(200).json({ accountExists: false, valid: true, redirect: true }) })
                .catch(err => {
                    res.status(200).json({ accountExists: false, valid: false, redirect: false })
                    console.log(err)
                })

        });
    await client.close()
    deactivationTimer(phoneOrEmail, profileImage)
}
/*
this function is used in both sendVerificationEmail and sendVerificationSMS
to make the verification number.
 */
function randomNumVerifier() {
    let randomNum = ''
    for (let i = 0; i < 6; i++) {
        let digit = Math.floor(Math.random() * 10)
        randomNum += digit
    }
    return randomNum
}

const fs = require('fs');

function deactivationTimer(phoneOrEmail, profileImage) {
    let client = new MongoClient(uri)
    const database = client.db('ENT');
    const users = database.collection('users');
    setTimeout(() => {
        users.deleteOne({ phoneOrEmail: phoneOrEmail, verified: false }).then(response => {
            if (response.deletedCount == 1) {
                fs.unlink(profileImage, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return;
                    }

                });
            }
        })
        client.close()
    }, 60000);
}

export async function deleteSessionID(sessionID) {
    let client = new MongoClient(uri)
    const database = client.db('ENT');
    const users = database.collection('users');
    await users.findOneAndUpdate(
        { sessionIDs: { $in: [sessionID] } },
        { $pull: { sessionIDs: sessionID } }
    );

}