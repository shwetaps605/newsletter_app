const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const port = process.env.port || 5000;

//Static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

//Signup route
app.post('/signup', (req, res) => {
    const { firstName, lastName, email } = req.body
    const mailchimpData = {
        members: [
            {
                email_address: email,
                status: 'pending'
            }
        ]
    }
    const mcDataPost = JSON.stringify(mailchimpData)
    const options = {
        url: "",
        method: "POST",
        headers: {
            Authorization: 'auth ..'
        },
        body: mcDataPost
    }
    if (email) {
        //successful so far
        request(options, (err, response, body) => {
            if(err){
                res.json({error:err})
            } else {
                res.sendStatus(200)
            }
        })
    } else {
        res.status(400).json({ message: 'Failed' })
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})