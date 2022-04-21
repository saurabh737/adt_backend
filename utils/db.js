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
      console.log(data.name, data.password, data.location, data.email, "=-=-=-=-=-=-=-=-=-=-=-")
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