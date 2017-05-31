const Router=require("koa-router");
let page = new Router();

module.exports = page;

page
	.get("/",async(ctx)=>{
		ctx.body="这里是用户获取！"
	})
	.get("/list",async(ctx)=>{
		ctx.body="这里是用户列表！"
	})