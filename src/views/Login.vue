<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="app-title">后台管理系统</div>
      <div class="form-wrapper">
        <el-form
          ref="loginForm"
          :rules="rules"
          :label-position="labelPosition"
          label-width="80px"
          :model="queryform"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="queryform.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="queryform.password" show-password></el-input>
          </el-form-item>
          <el-form-item class="vertify-content">
            <el-button type="primary" @click="submitForm('loginForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  // validate
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      queryform: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [{ validator: validatePass, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.queryform).then(() => {
            // 登录成功
            console.log('object');
            this.$router.replace("/")
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: $c-bg-color-grey;
  .login-wrapper {
    margin-top: 100px;
    text-align: center;
  }
  .app-title {
    font-size: 18px;
    margin-top: 90px;
    margin-bottom: 24px;
  }
  .form-wrapper {
    width: 400px;
    .vertify-content {
      margin-top: 40px;
    }
  }
}
</style>
