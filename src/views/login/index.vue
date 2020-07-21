<template>
    <div class="login-container">
        <!-- autocomplete为是否输入框下面显示以前的输入信息 -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off" label-position="left">

            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>

            <el-form-item prop="username">
                <!-- <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span> -->
                <el-input
                    ref="username"
                    placeholder="Username"
                    v-model="loginForm.username"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                >
                </el-input>
            </el-form-item>  

            <el-form-item prop="password">
                <el-input
                    ref="password"
                    v-model="loginForm.password"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                >

                </el-input>
            </el-form-item>

            <el-button type="primary" style="width:100%; margin-bottom:30px;" @click.native.prevent="handleLogin" :loading="loading">Login</el-button>

            <div style="position:relative">
                <div class="tips">
                    <span>Username : admin</span>
                    <span>Password : any</span>
                </div>
                <div class="tips">
                    <span style="margin-right:18px;">Username : editor</span>
                    <span>Password : any</span>
                </div>

                <el-button type="primary" class="thirdparty-button" >
                    Or connect width
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import {validUsername} from "@/utils/validate"
export default {
    name:"Login",
    data(){
        const validateUsername = (rule,value,callback)=>{
            if(!validUsername(value)){
                return callback(new Error('Please enter the correct user name')) ;
            }else{
                callback();
            }
        }
        const validatePassword = (rule,value,callback)=>{
            if(value.length<6){
                callback(new Error("The password can not be less than 6 digits"))
            }else{
                callback()
            }
        }
        return {
            loginForm:{
                username:"admin",
                password:"111111"
            },
            loginRules:{
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading:false,
            redirect: undefined,
        }
    },
    methods:{
        handleLogin(){
            this.$refs.loginForm.validate(valid=>{
                if(valid){
                    this.loading = true;
                    this.$store.dispatch('user/login',this.loginForm)
                        .then(()=>{
                            this.$router.push({path:this.redirect || '/',query:this.otherQuery})
                            this.loading = false
                        })
                        .catch(()=>{
                            this.loading = false;
                        })
                }else{
                    console.log("error submit!!");
                    return false;//不明白什么作用，阻止
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    $bg:#2d3a4b;
    $dark_gray:#889aa4;
    $light_gray:#eee;
    

    .login-container{
        min-height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;
        .title-container{
            position: relative;
            .title{
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .tips{
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span{
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        
        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
        }
    }
</style>