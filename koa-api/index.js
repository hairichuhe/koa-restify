const koa = require("koa")
const Router = require("koa-router")
const routes = require("./routes")
const aes = require("./utils/aes/aes");
const str = require("./utils/str")
const app = new koa();
const rds = require("./utils/redipool/redipool")


app.use(async(ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    if(ctx.method=="OPTIONS"){
        ctx.body=true;
    }else{
        await next();  
    }
});

/**
 * 统一封装数据格式
 */
app.use(async(ctx, next) => {
    try {
        await next();
        ctx.status = ctx.status
        if (ctx.status > 399 || ctx.status < 200) {
            ctx.body = {
                meta: {
                    success: false,
                    code: ctx.status,
                    message: ctx.message || "服务器错误，请联系管理员！"
                },
                data: null
            }
        } else {
            let data = { meta: { success: true, code: 0, message: "ok" }, data: ctx.body };
            ctx.body = data;
        }
    } catch (err) {
        noerr = false
        ctx.status = err.status || 500;
        ctx.body = {
            meta: {
                success: false,
                code: err.status || 500,
                message: err.message || "服务器错误，请联系管理员！"
            },
            data: null
        }
    }
});

// 权限验证中间件
app.use(async(ctx, next) => {
    if (ctx.header.authorization) {
        let key = "token_" + str.substr(JSON.stringify(aes.decrypt(ctx.header.authorization)), "id:", ",ip:");
        let token = await rds.get(key);
        if (token == ctx.header.authorization) {
            await next()
        } else {
            ctx.throw(403, "您无权访问，请登录！")
        }
    } else {
        ctx.throw(403, "您无权访问，请登录！")
    }
});
let router = new Router()
router.use('/api', routes.routes(), routes.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
