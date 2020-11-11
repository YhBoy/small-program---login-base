const requestUrl = require("./request.js")

const API = {
    getIndexList:(data)=> requestUrl("http://www.sxwyyyyxgs.com/cishu","GET",data)
}


module.exports = {
    API
}


