<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="账号">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="密码">
			<el-input v-model="form.password"></el-input>
		</el-form-item>
		<el-form-item label="角色">
			<el-input v-model="form.role"></el-input>
		</el-form-item>
		<el-form-item label="姓名">
			<el-input v-model="form.username"></el-input>
		</el-form-item>
		<el-form-item label="电话">
			<el-input v-model="form.phone"></el-input>
		</el-form-item>
		<el-form-item label="邮箱">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		<el-form-item label="是否启用">
			<el-switch on-value="1" off-value="0" on-text="" off-text="" v-model="form.open"></el-switch>
		</el-form-item>
		<el-form-item label="描述">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					password: '',
					username: '',
					phone: '',
					role:'',
					email:'',
					open: '1',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script>