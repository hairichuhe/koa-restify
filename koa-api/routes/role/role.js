const Router = require("koa-router");
const db = require("../../models");
let page = new Router();

module.exports = page;

page
    .get("/", async(ctx) => {
        ctx.body = "这里是用户获取！"
    })
    .get("/list", async(ctx) => {
        ctx.body = "这里是用户列表！"
    })
    .post("/save", async(ctx) => {
        ctx.body = "这里是保存位置！"
    })
    .get("/get_all", async(ctx) => {
        ctx.body = await db.Role.findAll({
        	attributes:['id','name','chinesename']
        })
    })
