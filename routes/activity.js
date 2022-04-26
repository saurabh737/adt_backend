const express = require('express');
const router = express.Router();
const db = require('../utils/db').services;

router.post('/addfavourite', async (req, res) => {
    try {
        if (!req.body.recipe_id || !req.body.user_id) {
            return res.status(400).send({
                "message": "Bad Request"
            })
        }

        const favCheck = await db.checkFavourite(req.body);
        if (favCheck.length > 0) {
            return res.status(401).send({
                "message": "Recipe already marked favourite"
            })
        }

        const data = await db.addFavourite(req.body)
        return res.status(200).send({
            "message": "Recipe Added."
        })
    } catch (e) {
        console.log(e);
        return res.status(503).send({
            error: e,
            message: "Something went wrong"
        })
    }
})

router.post('/deletefavourite', async (req, res) => {
    try {
        if (!req.body.recipe_id || !req.body.user_id) {
            return res.status(400).send({
                "message": "Bad Request"
            })
        }

        const favCheck = await db.checkFavourite(req.body);
        if (favCheck.length < 0) {
            return res.status(401).send({
                "message": "Recipe not marked favourite"
            })
        }

        const data = await db.deleteFavourite(req.body)
        return res.status(200).send({
            "message": "Recipe Deleted."
        })
    } catch (e) {
        console.log(e);
        return res.status(503).send({
            error: e,
            message: "Something went wrong"
        })
    }
})

router.post('/getfavourite', async (req, res) => {
    try {
        if (!req.body.user_id) {
            return res.status(400).send({
                "message": "Bad Request"
            })
        }

        let data = await db.getFavourite(req.body.user_id);
        data = JSON.parse(JSON.stringify(data))

        for (let i = 0; i < data.length; i++) {
            data[i].ingredientsName = data[i].ingredientsName.split(',')
            data[i].steps = data[i].steps.replaceAll("'", '').replace(/\[|\]/g, '').split(',')
            var hours = Math.floor(data[i].cooktime / 60);
            var minutes = data[i].cooktime % 60;
            data[i].time = `${hours} hr ${minutes} min`
        }
        if (data.length == 0) {
            return res.status(204).send({})
        }
        return res.status(200).send(
            data
        )
    } catch (e) {
        console.log(e);
        return res.status(503).send({
            error: e,
            message: "Something went wrong"
        })
    }
})

module.exports = router