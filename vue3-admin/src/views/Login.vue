<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img class="logo" src="https://s.yezgea02.com/1582958061265/mlogo.png" />
        <div class="name">
          <div class="title">新蜂商城</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form label-position="top" :rules="state.rules" :model="state.ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="state.ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="state.ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="state.checked" @change="!state.checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import axios from '@/utils/axios'
import md5 from 'js-md5'
import { reactive, ref } from 'vue'
import { localSet,localRemove  } from '@/utils'
import { reject } from 'lodash';
//做了一个拦截，无法直接获取value的值
const loginForm = ref(null)
const state = reactive({
  ruleForm: {
    username: 'admin',
    password: '123456'
  },
  checked: true,
  rules: {
    username: [
      { required: 'true', message: '账户不能为空', trigger: 'blur' }
    ],
    password: [
      { required: 'true', message: '密码不能为空', trigger: 'blur' }
    ]
  }
}) 
const submitForm = async () => {
/*   console.log(loginForm.value.validate((v)=>{
    // throw "cuowu"
    //我先执行，但不影响状态
    console.log(v)
    //后执行,循环已经走过一遍，状态已发生改变，无法更改
    setTimeout(()=>{
      throw "提交错误"
    },1000)
  })) */
 /*  console.log(loginForm.value)
  console.log(loginForm.value.validate) *///Proxy 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
  //pending promise未进行调用,再次在里面包一个函数，可以拿到参数，参数为布尔值
  // console.log(loginForm.value)
  loginForm.value.validate((valid) => {
    // console.log(valid)
    if (valid) {
    //请求并携带参数，服务器返回token令牌
      axios.post('/adminUser/login', {
        userName: state.ruleForm.username || '',
        passwordMd5: md5(state.ruleForm.password)
      }).then(res => {
        //服务器返回的密钥token res
        console.log(JSON.stringify(res))//通过json转换为字符串，键值对都应该为字符串模式
      //  通过本地储存 通过键值对把token存入本地储存
        localSet('token', res)
        //路由拦截里面会进行验证token存在不，不存在会提示管理员未登录
       //在app.vue界面中，设置了路由拦截，当没有token，就会重新进入登录界面
        // window.location.href = '/'
      })
    } else {
      console.log('error submit!!')
      return false;
    }
    // axios.required
    const requests = axios.create((config)=>{
      
    })
  })
}
const resetForm = () => {
  loginForm.value.resetFields();
}
</script>

<style scoped>
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
  }
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
  }
  .head .tips {
    font-size: 12px;
    color: #999;
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
  }
  .login-form >>> .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .login-form >>> .el-form-item {
    margin-bottom: 0;
  }
</style>