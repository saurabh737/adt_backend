const common_fields_channels =
    `recipe_id,
    name,
    description,
    avg_rating,
    cooktime,
    image,
    steps_cnt
`;

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
    ${common_fields_channels}
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

module.exports.FILTER_WITHOUT_INGREDIENTS = `
SELECT 
    ${common_fields_channels}
FROM
    recipes AS r
WHERE
	recipe_id in (select recipe_id from recipes where steps_cnt <= ? and cooktime <= ? )
GROUP BY recipe_id
LIMIT 10 OFFSET ?;
`;

// module.exports.FILTER_WITH_INGREDIENTS = `
// SELECT 
//     ${common_fields_channels}
// FROM
//     recipes AS r
// WHERE
//     recipe_id IN (SELECT 
//             recipe_id
//         FROM
//             recipes
//         WHERE
//             steps_cnt <= ? AND cooktime <= ?
//                 AND recipe_id IN (SELECT 
//                     recipeId
//                 FROM
//                     recipe_ingredients_mapping
//                 WHERE
//                     cooking_made_easy.recipe_ingredients_mapping.ingredients_name IN ?))
// GROUP BY recipe_id
// LIMIT 10 OFFSET ?;
// `;
module.exports.FILTER_WITH_INGREDIENTS = `
SELECT 
    ${common_fields_channels}
FROM
    recipes AS r
WHERE
    recipe_id IN (SELECT 
            recipe_id
        FROM
            recipes
        WHERE
            steps_cnt <= ? AND cooktime <= ?
GROUP BY recipe_id
LIMIT 10 OFFSET ?;
`;