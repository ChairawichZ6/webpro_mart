<style scoped>
#app {
  font-family: "Prompt", sans-serif;
  background: #f5f5f5;
}

.navbar-brand {
  padding: 20px;
}
.container {
  padding-top: 4%;
  padding-bottom: 5%;
}
#end {
  background: #485fc7;
  color: aliceblue;
  font-weight: 400;
  height: 10px;
  width: 100%;
}
#footer-text {
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
          <a class="navbar-item">หน้าหลัก</a>
        </div>

        <div class="navbar-end">
          <!-- search -->
          <div class="navbar-item">
            <div class="search">
              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    <input
                      v-model="search"
                      class="input is-rounded"
                      type="text"
                      placeholder="Search..."
                    />
                  </p>
                  <p class="control" @click="getProducts()">
                    <button
                      class="button is-warning is-rounded">
                      <i class="fa fa-search"></i>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- ตะกร้า สินค้า -->
          <a class="navbar-item is-size-4 px-5">
            <i class="fa fa-shopping-cart fa-2x"></i>
          </a>

          <!-- Login -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" v-if="user">
              <i class="fa fa-user-circle fa-2x px-2"></i>
              <span>{{ user.username }}</span>
            </a>
            <a class="navbar-link" v-if="!user">
              <i class="fa fa-user-circle fa-2x px-2"></i>
              <span>เข้าสู่ระบบ</span>
            </a>

            <div class="navbar-dropdown">
              <hr class="navbar-divider" />
              <router-link to="/user/login" class="navbar-item" v-if="!user">
                <i class="fa fa-user fa-lg pr-5"></i>
                เข้าสู่ระบบ
              </router-link>
              <router-link to="/user/signup" class="navbar-item" v-if="!user">
                <i class="fa fa-user-plus fa-lg pr-4"></i>
                สมัครสมาชิก
              </router-link>

              <router-link to="/profile" class="navbar-item">
                <i class="fa fa-address-card fa-lg pr-4"></i>
                โปรไฟล์
              </router-link>
              <hr class="navbar-divider" />
              <a class="navbar-item" @click="logout()" v-if="user">
                <i class="fa fa-door-open fa-lg pr-4"></i>
                <span>ออกจากระบบ</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- (2) Home -->
    <router-view
      :key="$route.fullPath"
      @auth-change="onAuthChange"
      :user="user"
      :products="products"
    />

    <!-- (3) ส่วนท้าย -->
    <footer id="end" class="footer">
      <div class="content has-text-centered" id="footer-text">
        © สงวนลิขสิทธิ์ 2022 โดย MartNextGen จำกัด
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      search: "",
      user: null,
      products: [],
    };
  },
  mounted() {
    this.onAuthChange();
    this.getProducts();
  },
  methods: {
    getProducts () {
      axios
        .get("http://localhost:3000", {
          params: {
            search: this.search
          },
        })
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      axios.get("/user/me").then((res) => {
        this.user = res.data;
      });
    },
    logout() {
      localStorage.removeItem("token");
      alert("ออกจากระบบสำเร็จแล้ว");
      this.user = null;
    },
  },
};
</script>
