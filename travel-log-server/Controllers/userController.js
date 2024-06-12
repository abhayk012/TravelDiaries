const users = require('../Models/userschema')
const jwt=require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log("inside userController:register function");
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    try {
        const existinguser = await users.findOne({ email: email });
        console.log("Existing user");
        console.log(existinguser);
        if (existinguser) {
            res.status(406).json("account already exist,please login")
        }
        else {
            const newUser = new users({
                username: username,
                email: email,
                password: password
            })
            await newUser.save()
            res.status(200).json("registration request recieved:registered")
        }
    } catch (err) {
        res.status(401).json(`Failed due to ${err}`)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await users.findOne({ email: email, password: password });
        const token = jwt.sign({userId:existinguser._id},'supersecretkey12345')
        console.log(token);
        if (existinguser) {
            res.status(200).json({existinguser,token})
        }
        else {
            res.status(406).json("Inavlid user,please Register")
        }
    } catch (err) {
        res.status(401).json(`Failed due to ${err}`)
    }
}