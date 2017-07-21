const Router = require("koa-router");
let home = new Router()
module.exports = home;

//路由列表获取
let user = require("./user/user")
let privilege = require("./privilege/privilege")
let file = require("./file/upload")
let role = require("./role/role")

//路由列表使用
home.use('/privilege', privilege.routes(), privilege.allowedMethods())
home.use('/user', user.routes(), user.allowedMethods())
home.use('/role', role.routes(), role.allowedMethods())
home.use('/file', file.routes(), file.allowedMethods())