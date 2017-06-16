const Router=require("koa-router");
const str = require("../../utils/str");
const aes = require("../../utils/aes/aes");
const rds = require("../../utils/redipool/redipool")
let page = new Router();

module.exports = page;

page
	.get("/",async(ctx)=>{
		ctx.body="这里是用户获取！"
	})
	.get("/list",async(ctx)=>{
		ctx.body="这里是用户列表！"
	})
	.post("/save",async(ctx)=>{
		ctx.body="这里是保存位置！"
	})
	.post("/revoke",async(ctx)=>{
		let key = "token_" + str.substr(JSON.stringify(aes.decrypt(ctx.header.authorization)), "id:", ",ip:");
	    let result = await rds.del(key);
	    if(result==1){
	    	ctx.body="退出成功！"
	    }else{
	    	ctx.throw(500, "退出失败！")
	    }
	})