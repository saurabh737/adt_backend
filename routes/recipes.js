const express = require('express');
const router = express.Router();
const db = require('../utils/db').services
const helper = require('../helper/formatResponse')

router.get('/getall', async (req, res) => {
    try {
        page_no = req.query.page || 0;
        let data = await db.homeRecipes(page_no);
        let formattedData = await helper.format(req.query.user_id, data)
        return res.status(200).send(formattedData)
    } catch (error) {
        console.log(error)
        return res.status(503).send(error)
    }
});

router.get('/metadata', async (req, res) => {
    try {
        const data = await db.metadata(parseInt(req.query.recipe_id));
        const favCheck = await db.checkFavourite({
            recipe_id: parseInt(req.query.recipe_id),
            user_id: parseInt(req.query.user_id)
        });
        data.fav = favCheck.length > 0 ? true : false;
        data.ingredientsName = data.ingredientsName.split(',')
        data.steps = data.steps.replaceAll("'", '').replace(/\[|\]/g, '').split(',')
        var hours = Math.floor(data.cooktime / 60);
        var minutes = data.cooktime % 60;
        data.time = `${hours} hr ${minutes} min`
        data.avg_rating = parseFloat(data.avg_rating.toFixed(2));
        return res.status(200).send(data)
    } catch (error) {
        console.log(error)
        return res.status(503).send(error)
    }
});

router.get('/filter', async (req, res) => {
    try {
        let cooktime = parseInt(req.query.cooktime) || 10000;
        let n_steps = parseInt(req.query.n_steps) || 500;
        let page_no = parseInt(req.query.page) || 0;
        let data;
        if (req.query.ingredients) {
            data = await db.filter_with_ingredirents(cooktime, n_steps, req.query.ingredients, page_no);
        } else {
            data = await db.filter_without_ingredirents(cooktime, n_steps, page_no);
        }
        let formattedData = await helper.format(req.query.user_id, data)
        return res.status(200).send(formattedData)
    } catch (error) {
        console.log(error)
        return res.status(503).send(error)
    }
});

module.exports = router;