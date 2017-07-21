const koa = require("koa")
const Router = require("koa-router")
const routes = require("./routes")
const app = new koa();
const bodyParser = require('koa-bodyparser');


app.use(async(ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    if(ctx.method=="OPTIONS"){
        ctx.body="";
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
app.use(bodyParser());
let router = new Router()
router.use('/api', routes.routes(), routes.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
