module.exports.GET_USER_DATA = `
SELECT 
    *
FROM
    users
WHERE
    email = ?;
`;

module.exports.SET_USER_DATA = `
INSERT INTO users (name, password, location, email) VALUES (?, ?, ?, ?);
`;

module.exports.Home_Recipes = `
SELECT 
    recipe_id,
    name,
    description,
    avg_rating,
    cooktime,
    image,
    steps_cnt
FROM
    recipes
LIMIT 10
OFFSET ?;
`;

module.exports.METADATA = `
SELECT 
    r.*, GROUP_CONCAT(DISTINCT rm.ingredients_name SEPARATOR ', ') as ingredientsName
FROM
    recipes AS r
        INNER JOIN
    recipe_ingredients_mapping AS rm ON r.recipe_id = rm.recipeId
WHERE
    recipe_id = ?;
`;

module.exports.ADD_FAVOURITE = `
INSERT INTO users_favourites (user_id, recipe_Id) VALUES (?, ?);
`;

module.exports.DELETE_FAVOURITE = `
DELETE FROM users_favourites
WHERE
    user_id = ? AND recipe_Id = ?;
`;

module.exports.GET_FAVOURITE = `
SELECT 
    r.*, GROUP_CONCAT(DISTINCT rm.ingredients_name SEPARATOR ', ') as ingredientsName
FROM
    recipes AS r
        INNER JOIN
    recipe_ingredients_mapping AS rm ON r.recipe_id = rm.recipeId
WHERE
	recipe_id in (select recipe_Id from users_favourites where user_id = ?)
group by recipe_id;
`;

module.exports.GET_FAVOURITE_IDS= `
SELECT 
    recipe_Id
FROM
    users_favourites
WHERE
    user_id = ?;
`;

module.exports.CHECK_FAVOURITE=`
SELECT 
    recipe_Id
FROM
    users_favourites
WHERE
    user_id = ? and recipe_Id = ?;
`;