const redis = require("redis")
var client = redis.createClient({
    password: 'root'
});

client.on("error", function(err) {
    console.log("Error :", err);
});

client.on('connect', function() {
    console.log('Redis连接成功.');
});

var rds = module.exports = {};

/**
 * 查询key
 * @param key 待查询的key
 * @returns {string}
 */

rds.get = function(key) {
    return new Promise(function(resolve, reject) {
        client.get(key, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

/**
 * 删除key
 * @param key 待删除的key
 * @returns 1 success 0 Unsuccess
 */

rds.del = function(key) {
    return new Promise(function(resolve, reject) {
        client.del(key, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};
