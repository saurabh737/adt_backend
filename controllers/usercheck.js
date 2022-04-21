const services = require('../utils/db').services

async function check(emailid) {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = await services.getUserData(emailid)
            resolve(userData)
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

module.exports = {
    check
}