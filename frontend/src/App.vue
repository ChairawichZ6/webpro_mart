<style scoped>
#app{
    font-family: 'Prompt', sans-serif;
    background: #F5F5F5;
}

.navbar-brand{
    padding: 20px;
}
.container {
    padding-top: 7%;
    padding-bottom: 7%;
}
#end{
    background: hsl(217, 71%, 53%);
    color: aliceblue;
    font-weight: 400;
    height: 10px;
    width: 100%;
}
#footer-text{
    margin-top: 12px;
}
</style>

<template>
  <div id="app">
    <!-- (1) Tab Menu -->
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">

        <!-- Logo -->
        <div class="navbar-brand">
            <div class="navbar-item">
                <h1 class="is-size-3 has-text-weight-semibold">MartNextGen</h1>
            </div>
        </div>

        <!-- Menu -->
        <div class="navbar-menu">
            <div class="navbar-start">
                <a href="index.html" class="navbar-item">หน้าหลัก</a>
            </div>

            <div class="navbar-end">
                <!-- search -->
                <div class="navbar-item">
                    <form class="search" action="/">
                        <div class="level-item">
                            <div class="field has-addons">
                                <p class="control">
                                    <input class="input is-rounded" type="text" placeholder="Search...">
                                </p>
                                <p class="control">
                                    <button class="button is-warning is-rounded" type="submit" value="Search">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- ตะกร้า สินค้า -->
                <a class="navbar-item is-size-4 px-5">
                    <i class="fa fa-shopping-cart fa-2x"></i>
                </a>

                <!-- Login -->
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        <i class="fa fa-user-circle fa-2x px-2"></i>
                        <span>เข้าสู่ระบบ</span>
                    </a>

                    <div class="navbar-dropdown">
                        <hr class="navbar-divider">
                        <router-link to="/user/login" class="navbar-item">
                            <i class="fa fa-user fa-lg pr-5"></i>
                            เข้าสู่ระบบ
                        </router-link>
                        <router-link to="/user/signup" class="navbar-item">
                            <i class="fa fa-user-plus fa-lg pr-4"></i>
                            สมัครสมาชิก
                        </router-link>
                        <hr class="navbar-divider">
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- (2) Home -->
    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user"/>

    <!-- (3) ส่วนท้าย -->
    <footer id="end" class="footer">
        <div class="content has-text-centered" id="footer-text">
            © สงวนลิขสิทธิ์ 2022 โดย MartNextGen จำกัด
        </div>
    </footer>
  </div>
</template>

<script>
import axios from '@/plugins/axios'

export default {
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.onAuthChange()
  },
  methods: {
    onAuthChange () {
      const token = localStorage.getItem('token')
      if (token) {
        this.getUser()
      }
    },
    getUser () {
      axios.get('/user/me').then(res => {
         this.user = res.data
      })
    },
  }
}
</script>
