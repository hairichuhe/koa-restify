<template>
	<el-form ref="form" :rules="rules" :model="form" label-width="80px" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="账号" prop="name">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="form.password" type="password"></el-input>
		</el-form-item>
		<el-form-item label="角色" prop="role">
			<el-select v-model="form.role" multiple placeholder="请选择" style="width:100%">
			    <el-option
			      v-for="item in db.allrole"
			      :key="item.id"
			      :label="item.chinesename"
			      :value="item.id">
			    </el-option>
			  </el-select>
		</el-form-item>
		<img class="img" :src="$root.loginHost+form.imgScr">
		<vue-core-image-upload
		    class="el-button el-button--primary imgbtn"
		    crop="local"
		    @imageuploaded="imageuploaded"
		    :max-file-size="5242880"
		    :maxWidth="300"
		    :maxHeight="300"
		    :data="form"
		    text="点击上传"
		    extensions="png,jpg"
		    :url="$root.loginHost+'/img/upload'" >
		</vue-core-image-upload>
		<el-form-item label="姓名" prop="username">
			<el-input v-model="form.username"></el-input>
		</el-form-item>
		<el-form-item label="手机" prop="phone">
			<el-input v-model="form.phone"></el-input>
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		<!-- <el-form-item label="是否启用">
			<el-switch on-value="1" off-value="0" on-text="" off-text="" v-model="form.open"></el-switch>
		</el-form-item> -->
		<el-form-item label="描述">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click.native.prevent="onSubmit">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import VueCoreImageUpload  from 'vue-core-image-upload';
	export default {
		data() {
			// var phone = (rule, value, callback) => {
		 //        if (value != '') {
		 //        	if(/^(((1[3578][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(value)){
		 //        		callback()
		 //        	}else{
		 //        		callback(new Error('您输入的电话号码格式不正确'));
		 //        	}
		 //        } else {
		 //          	callback();
		 //        }
		 //    };
			// var remote = (rule, value, callback,source,opts) => {
		 //        if (value != '') {
		 //        	console.log(rule)
		 //        	console.log(source)
		 //        	console.log(opts)
		 //        	if(/^(((1[3578][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(value)){
		 //        		callback()
		 //        	}else{
		 //        		callback(new Error('您输入的电话号码格式不正确'));
		 //        	}
		 //        } else {
		 //          	callback();
		 //        }
		 //    };
			return {
				form: {
					id: this.$route.params.id||"-1",
					name: '',
					password: '',
					username: '',
					phone: '',
					role:[],
					email:'',
					open: '1',
					desc: '',
					imgScr:'/img/user.png'
				},
		        rules: {
		          name: [
		            { required: true, message: '请输入账号', trigger: 'blur' },
		            { validator: this.utils.validate.remote, trigger: 'blur' ,url:this.$root.host+"/user/nameUniuqe"}
		          ],
		          password: [
		            { required: true, message: '请输入密码', trigger: 'blur' }
		          ],
		          role: [
		            { type: 'array',required: true, message: '请选择角色', trigger: 'change' }
		          ],
		          username: [
		            { required: true, message: '请输入真实姓名', trigger: 'blur' }
		          ],
		          phone: [
		            { validator: this.utils.validate.phone, trigger: 'change' }
		          ],
		          email: [
		            { type: 'email', message: '请输入正确的邮箱', trigger: 'blur,change' }
		          ]
		        },
				db:{
					allrole:[]
				}
			}
		},
	    components: {
	        'vue-core-image-upload': VueCoreImageUpload
	    },
	    mounted(){
	    	// console.log(this.$route.params.id)
	    	this.getAllRole()
	    },
		methods: {
			imageuploaded(res) {
		        this.form.imgScr = res.data+"?"+new Date().getTime();
		    },
			onSubmit() {
        		var _this=this;
		        this.$refs.form.validate((valid)=>{
		          if(valid){
		            _this.$ajax({
		              type:"POST",
		              url:_this.$root.host+"/user/save",
		              data:_this.form,
		              success:function(res){
		                console.log(res)
		              },
		              error:function(res){
		                _this.$message.error(res.meta.message);
		              }
		            })
		          }else{
		            return false;
		          }
		        })
			},
			getAllRole(){
				var _this=this;
				_this.$ajax({
					type:"get",
					url:_this.$root.host+"/role/get_all",
					success:function(res){
						_this.db.allrole=res.data;
					}
	            })
			}
		}
	}

</script>

<style lang="scss" scoped>
  .img {
  	width:100px;
  	height: 100px;
  	border-radius: 50px;
  	margin: 0 0 20px 80px;
  }
  .imgbtn{
  	left: 20px;
  	bottom: 20px;
  }
</style>