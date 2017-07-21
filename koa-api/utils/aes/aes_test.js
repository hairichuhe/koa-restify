var aes=require("./aes");
var conf=require("./conf.json")
var str="{id:6693,ip:127.0.0.1,over:1694907662}"
// console.log(aes.encrypt(str))
// console.log(aes.decrypt(aes.encrypt(str)))
var hashsalt=async()=>{
	var hash=await aes.hashsalt("!@#EDCvfr4")
	console.log(hash)
}
hashsalt();
// console.log(conf.name)
for(var i=0;i<10;i++){
	setTimeout(function(){
		console.log(i)
	},111)
};
for(let i=0;i<10;i++){
	setTimeout(function(){
		console.log(i)
	},111)
}