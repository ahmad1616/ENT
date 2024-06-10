const { MongoClient } = require("mongodb");
const uri = process.env.URI
const formidable = require("formidable")
import { phoneOrEmailExists, sendVerificationEmail, sendVerificationSMS } from '../../src/utils/registerUtils';

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req, res) {
    const form = new formidable.IncomingForm()
    form.uploadDir = 'private'
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).json({});
        }
        console.log(files);
        console.log(fields)
        let doc = {}
        for (const key in fields) {
            doc[key] = fields[key][0]
        }
        doc['usertype'] = 'client'
        doc['sessionIDs'] = JSON.parse(fields['sessionIDs'][0])
        if(files.profileImage){
            doc['profileImage'] = files.profileImage[0].filepath
        }
        else{
            doc['profileImage'] = ''
        }
        let { phoneOrEmail } = doc
        /*that if conditional use emailExistsAlready function that is imported 
        above to check if the email already has an account.
        */
        let client = new MongoClient(uri);
        if (await phoneOrEmailExists(phoneOrEmail, client)) {
            console.log('exists');
            await client.close()
            res.status(200).json({ accountExists: true })
        }
        /*
        check if the phoneOrEmail field is an email and if yes check
        its validity and send it the verification email with the random num */
        else if (/^\S+@\S+$/.test(phoneOrEmail)) {
            sendVerificationEmail(client, res, doc)
        }
        /*
        else so it must be a phone number check its validity and send it 
        the verification random num 
         */
        else {
            sendVerificationSMS(client, res, doc)
        }
    });
}