const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = process.env.port || 5000;

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))

//Signup route
app.post('/signup', (req, res) => {
    const { firstName, lastName, email } = req.body
    const data = {
        members: [
            {
                email_address: email,
                status: 'pending',
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    const mcDataPost = JSON.stringify(data)
    const list_id ="Enter your list id here"
    const options = {
        url: `https://us5.api.mailchimp.com/3.0/lists/${list_id}`,
        method: "POST",
        headers: {
            Authorization: 'auth 1b1a2f335d207411b8ccb095fb3e9bf0-us5'
        },
        body: mcDataPost
    }


    if (email && firstName && lastName) {
        request(options, (err, response, body) => {
            if(err){
                res.json({error:err})
            } else {
                if(response.statusCode === 200){
                     res.status(200).send("You have to check your email to confirm")
                }
            }
        })
    } else {
        res.status(400).json({ message: 'Failed' })
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})