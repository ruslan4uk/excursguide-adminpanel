<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-6 col-lg-4 login-page__form px-5 py-4">
          <div class="login-page__title text-center pb-3">Авторизация</div>

          <el-form :model="form" :rules="rules" ref="loginForm" label-width="0" class="demo-ruleForm">
            <el-form-item prop="email">
              <el-input placeholder="Введите ваш Email" v-model="form.email" id="email"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input placeholder="Пароль" v-model="form.password" show-password></el-input>
            </el-form-item>

            <el-form-item class="text-center">
              <el-button type="primary" class="w-100" @click="login('loginForm')">Вход</el-button>
            </el-form-item>
          </el-form>

          <el-alert
            v-if="errors.email"
            :title="errors.email"
            type="error"
            effect="dark">
          </el-alert>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  middleware: 'auth',

  data () {
    return {
      rules: {
          email: [
              { required: true, message: 'Поле Email обязательно для заполнения', trigger: 'blur' },
              { type: 'email', message: 'Вы ввели не корректный Email адрес', trigger: 'blur' }
          ],
          password: [
              { required: true, message: 'Пароль обязательный для заполнения', trigger: 'change' }
          ],
      },
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$auth.loginWith('local', { data: this.form })//.then(() => {
                //this.$router.push( { path: '/dashboard' } )
            //})
        } else {
            return false;
        }
      });
    },
  }
}
</script>

<style lang="sass">
  .login-page
    padding-top: 10rem
    min-height: 100vh
    background-image: url("~static/images/login_bg.png")
    &__form
      background-color: #fafafa
      border-radius: 6px
      box-shadow: 0 10px 30px 7px rgba(0,0,0,.2)
    &__title
      font-size: 1.375rem
      font-weight: 600
</style>

