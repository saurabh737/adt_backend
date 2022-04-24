const express = require('express');
const router = express.Router();
const db = require('../utils/db').services

router.get('/getall', async (req, res) => {
    try {
        page_no = req.query.page || 0;
        let data = await db.homeRecipes(page_no);
        let recipeIds = await db.getFavouriteIds(req.query.user_id);
        recipeIds = JSON.parse(JSON.stringify(recipeIds))
        recipeIdlist = []
        for (let j = 0; j < recipeIds.length; j++) {
            recipeIdlist.push(recipeIds[j].recipe_Id)
        }
        if (recipeIdlist.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (recipeIdlist.indexOf(data[i].recipe_id) > -1) {
                    data[i].fav = true
                } else {
                    data[i].fav = false
                }
            }
        }

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