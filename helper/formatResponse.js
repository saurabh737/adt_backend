const db = require('../utils/db').services;

async function format(user_id, data, userFav) {
    return new Promise(async (resolve, reject) => {
        try {
            let recipeIdlist = [];
            if (!userFav) {
                let recipeIds = await db.getFavouriteIds(parseInt(user_id));
                recipeIds = JSON.parse(JSON.stringify(recipeIds))
                for (let j = 0; j < recipeIds.length; j++) {
                    recipeIdlist.push(recipeIds[j].recipe_Id)
                }
            }
            
            for (let i = 0; i < data.length; i++) {
                var hours = Math.floor(data[i].cooktime / 60);
                var minutes = data[i].cooktime % 60;
                data[i].time = `${hours} hr ${minutes} min`;
                data[i].avg_rating = parseFloat(data[i].avg_rating.toFixed(2));
                if (userFav || recipeIdlist.indexOf(data[i].recipe_id) > -1) {
                    data[i].fav = true
                } else {
                    data[i].fav = false
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