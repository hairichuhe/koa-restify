const Router=require("koa-router");
const db = require("../../models");
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
		let params=ctx.request.body;
		let rolearr=params.role.split(",");
		let password=await aes.hashsalt(params.password);
		if(params.id=="-1"){
			return db.sequelize.transaction(async(t)=> {
				let user =await db.User.create({
					username:params.name,
					password:password,
					realname:params.username,
					mobile:params.phone,
					email:params.email,
					imgsrc:params.imgSrc,
					description:params.desc,
					createuser:str.substr(JSON.stringify(aes.decrypt(ctx.header.authorization)), "id:", ",ip:")
				},{transaction: t});
				await user.setUserRole(rolearr,{transaction: t});
				ctx.body="保存成功！"
			});
		}else{
			ctx.body="保存！"
		}
	})
	.post("/nameUniuqe",async(ctx)=>{
		let result=await db.User.findAll({
			where:{
				username:ctx.request.body.params
			}
        });
        if(result.length>0){
        	ctx.body="用户名已存在!"
        }else{
        	ctx.body=true;
        }
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
    .get("/get_all", async(ctx) => {
        ctx.body = await db.User.findAll({
        	attributes:{include: [[db.sequelize.fn('DATE_FORMAT', db.sequelize.col('created_at'),'%Y-%m-%d'), 'created_at'],[db.sequelize.fn('DATE_FORMAT', db.sequelize.col('updated_at'),'%Y-%m-%d'), 'updated_at']]}
        })
    })
	.post("/save/study/first",async(ctx)=>{
		let params=ctx.request.body;
		let rolearr=params.role.split(",");
		let roles=[];
		let password=await aes.hashsalt(params.password);
		for(var i=0;i<rolearr.length;i++){
			roles.push({id:rolearr[i]-0})
		};
		if(params.id=="-1"){
			let [user,role] = await Promise.all([ 
				db.User.create({
					username:params.name,
					password:password,
					realname:params.username,
					mobile:params.phone,
					email:params.email,
					imgsrc:params.imgSrc,
					description:params.desc,
					createuser:str.substr(JSON.stringify(aes.decrypt(ctx.header.authorization)), "id:", ",ip:")
				}),
				db.Role.create({name:'test',chinesename:'测试'})
			]);
			// var result=user.setUserRole(roles);
			console.log(user)
			console.log(role)
			user.setUserRole(role)
			ctx.body="保存"
		}else{
			ctx.body="保存！"
		}
	})