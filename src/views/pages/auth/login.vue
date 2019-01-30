<template>
  <el-container class="login-container">
    <el-main>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-form :model="loginForm" ref="loginForm" label-width="80px" class="login-form">
            <el-form-item label="邮箱" prop="email" :rules="[
              { required: true, message: ' ', trigger: 'blur' },
              { type: 'email', message: ' ', trigger: ['blur'] }
            ]">
              <el-input type="text" v-model="loginForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="{
                required: true, message: ' ', trigger: 'blur'
              }">
              <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit('loginForm')">登录</el-button>
              <el-button @click="reset('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>


<style scoped>
  .login-container {
    margin-top: 220px;
  }
  .login-form {
    margin: 0 auto;
  }
</style>

<script>
  import auth from '../../../util/auth.js';
  import Alert from '../../../components/Alert.js';

  export default {
    data: () => {
      return {
        loginForm: {
          email: '',
          password: ''
        },
      };
    },
    methods: {
      submit(key) {
        const {
          loginForm: {
            email,
            password,
          },
        } = this;
        this.$refs[key].validate((valid) => {
          if (valid) {
            // TODO:  login
            auth.login(email, password, () => {
              this.$router.replace({
                path: '/hailoooo/e/meet',
              });
            }, () => { Alert.message.error('用户名或密码错误.'); });
          } else {
            return false;
          }
        });
      },
      reset(key) {
        this.$refs[key].resetFields();
      }
    }
  }
</script>
