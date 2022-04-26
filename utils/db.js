let mysql_pool;
const QUERIES = require("../lib/mysqlQueries");

module.exports.services = {

  initMysqlPool: function (connection) {
    mysql_pool = connection;
  },

  getUserData(email) {
    return new Promise((resolve, reject) => {
      let query = QUERIES.GET_USER_DATA;
      executeWrite(query, email, (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
  },


  setUserData(data) {
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.SET_USER_DATA, [data.name, data.password, data.location, data.email], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response[0]);
        }
      });
    })
  },

  homeRecipes(page) {
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.Home_Recipes, [page], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
  },

  metadata(recipe_id) {
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.METADATA, [recipe_id], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response[0]);
        }
      });
    })
  },

  addFavourite(data){
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.ADD_FAVOURITE, [data.user_id, data.recipe_id], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response[0]);
        }
      });
    })
  },

  deleteFavourite(data){
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.DELETE_FAVOURITE, [data.user_id, data.recipe_id], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response[0]);
        }
      });
    })
  },

  getFavourite(user_id){
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.GET_FAVOURITE, [user_id], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
  },

  checkFavourite(data){
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.CHECK_FAVOURITE, [data.user_id, data.recipe_id], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
  },

  getFavouriteIds(user_id){
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.GET_FAVOURITE_IDS, [user_id], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
  },

  filter_without_ingredirents(steps_cnt, cooktime, page_no){
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.FILTER_WITHOUT_INGREDIENTS, [cooktime, steps_cnt, page_no], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
  },

  filter_with_ingredirents(steps_cnt, cooktime, ingredients, page_no){
    return new Promise((resolve, reject) => {
      executeWrite(QUERIES.FILTER_WITH_INGREDIENTS, [cooktime, steps_cnt, ingredients, page_no], (error, response) => {
        if (error) {
          if (error.code == "ER_NO_SUCH_TABLE") {
            return resolve([]);
          }
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
  }

}

let executeWrite = (query, args = [], callback) => {
  if (mysql_pool) {
    mysql_pool.getConnection((error, connection) => {
      if (error) {
        return callback(error, null);
      }
      connection.query(query, args, (error, results) => {
        connection.release();
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      });
    })
  } else {
    console.log("Mysql not enabled or mysql service not initialized");
  }
}