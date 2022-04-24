const express = require('express');
const router = express.Router();
const check = require('../controllers/usercheck').check
const db = require('../utils/db').services

router.post('/signup', async (req, res) => {
    try {
        if (!req.body.email || !req.body.name || !req.body.password) {
            return res.status(400).send({
                "message": "Bad Request"
            })
        }
        req.body.location = req.body.location ? req.body.location : 'Bloomington'
        const userCheck = await check(req.body.email);
        if (userCheck.length > 0) {
            return res.status(401).send({
                "message": "Email already exist"
            })
        }

        const data = await db.setUserData(req.body)
        let userData = await check(req.body.email);
        userData = userData[0]
        return res.status(200).send({
            "message": "User Added.",
            "email": req.body.email,
            "name": req.body.name,
            "user_id": userData.id
        })
    } catch (e) {
        console.log(e);
        return res.status(503).send({
            error: e,
            message: "Something went wrong"
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({
                "message": "Bad Request"
            })
        }
        let userData = await check(req.body.email);
        if (userData.length == 0) {
            return res.status(403).send({
                "message": "User don't exist"
            })
        }
        userData = userData[0]
        if (req.body.password != userData.password) {
            return res.status(401).send({
                "message": "Email/Password mismatch"
            })
        }
        userData.user_id = userData.id
        return res.status(200).send(userData)
    } catch (e) {
        console.log(e);
        return res.status(503).send({
            error: e,
            status: "Something went wrong"
        })
    }
})

module.exports = router