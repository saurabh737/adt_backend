const express = require('express');
const router = express.Router();

const db = require('../utils/db').services

router.get('/getall', async (req, res) => {
    try {
        page_no = req.query.page || 0;
        const data = await db.homeRecipes(req.query.page);
        return res.status(200).send(data)
    } catch (error) {
        console.log(error)
        return res.status(503).send(error)
    }
});

router.get('/metadata', async (req, res) => {
    try {
        const data = await db.metadata(req.query.recipe_id);
        data.ingredientsName = data.ingredientsName.split(',')
        data.steps = data.steps.replaceAll("'", '').replace(/\[|\]/g, '').split(',')
        return res.status(200).send(data)
    } catch (error) {
        console.log(error)
        return res.status(503).send(error)
    }
});

module.exports = router;