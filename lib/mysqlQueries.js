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