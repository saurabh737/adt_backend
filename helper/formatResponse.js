const db = require('../utils/db').services;

async function format(user_id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            let recipeIds = await db.getFavouriteIds(parseInt(user_id));
            recipeIds = JSON.parse(JSON.stringify(recipeIds))
            recipeIdlist = []
            for (let j = 0; j < recipeIds.length; j++) {
                recipeIdlist.push(recipeIds[j].recipe_Id)
            }
            if (recipeIdlist.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    var hours = Math.floor(data[i].cooktime / 60);
                    var minutes = data[i].cooktime % 60;
                    data[i].time = `${hours} hr ${minutes} min`
                    if (recipeIdlist.indexOf(data[i].recipe_id) > -1) {
                        data[i].fav = true
                    } else {
                        data[i].fav = false
                    }
                }
            }
            resolve(data)
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

module.exports = {
    format
}