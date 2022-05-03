<style scoped>
#detail_login {
    width: 40%;
}
#hide {
    position: absolute;
    right: 0;
}
</style>

<template>
  <div class="container is-fluid">
    <p v-if="error" class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light has-text-centered">
      {{ error }}
    </p>
    <div id="detail_login" class="container ">
      <div class="card px-3">
        <div class="card-content">
          <!-- username -->
          <div class="field">
              <p class="title">
                  เข้าสู่ระบบ
              </p>
              <hr>
              <label class="label has-text-weight-light">Username</label>
              <p class="control has-icons-left">
                  <input v-model="username" class="input" type="text">
                  <span class="icon is-small is-left">
                      <i class="fa fa-user"></i>
                  </span>
              </p>
          </div>

          <!-- password -->
          <div class="field">
            <label class="label has-text-weight-light">Password</label>
              <p class="control has-icons-left">
                  <input v-model="password" class="input" :type="checkHideEyeLogin ? 'text' : 'password' " placeholder="Password">
                  <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                  </span>
                  <span id="hide" class="button is-right" @click="checkHideEyeLogin = !checkHideEyeLogin">
                      <i class="fa fa-eye" :class="checkHideEyeLogin ? 'is-active' : 'is-hidden'"></i>
                      <i class="fa far fa-eye-slash" :class="checkHideEyeLogin ? 'is-hidden' : 'is-active'"></i>
                  </span>
              </p>
          </div>

          <!-- btn login -->
          <div class="field mt-6">
              <button id="btn" class="button is-dark is-rounded" style="width: 100%; font-family: 'Prompt', sans-serif;" @click="submit()">เข้าสู่ระบบ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  data () {
    return {
      checkHideEyeLogin: false,
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    submit () {
      const data = {
        username: this.username,
        password: this.password
      }

      axios.post('http://localhost:3000/user/login/', data)
        .then(res => {
          const token = res.data.token
          localStorage.setItem('token', token)
          this.$emit('auth-change')
          this.$router.push({path: '/'})
        })
        .catch(error => {
          this.error = error.response.data
          console.log(error.response.data)
        })
    }
  }
}
</script>