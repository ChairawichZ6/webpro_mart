<style scoped>
#detail_login {
  width: 50%;
}
#hide {
  position: absolute;
  right: 0;
}
</style>
<template>
  <div class="container is-fluid">
    <div id="detail_login" class="container">
      <div class="card px-3">
        <div v-if="showEditProfil" class="card-content">
          <div class="field">
            <p class="title">โปรไฟล์</p>
            <hr />

            <!-- Fname + Lname -->
            <div class="field">
              <div class="columns">
                <div class="column is-6">
                  <label class="label has-text-weight-light">ชื่อจริง</label>
                  <input v-model="user.fname" class="input" type="text" />
                </div>

                <div class="column is-6">
                  <label class="label has-text-weight-light">นามสกุล</label>
                  <input v-model="user.lname" class="input" type="text" />
                </div>
              </div>
            </div>
            <!-- Phone + Email -->
            <div class="field">
              <div class="columns">
                <div class="column is-6">
                  <div class="control">
                    <label class="label has-text-weight-light"
                      >เบอร์โทรศัพท์</label
                    >
                    <input
                      v-model="$v.phone.$model"
                      :class="'is-danger: $v.phone.$error'"
                      class="input"
                      type="text"
                    />
                  </div>
                  <template v-if="$v.phone.$error">
                    <p class="help is-danger" v-if="!$v.phone.required">
                      กรุณากรอก เบอร์โทรศัพท์
                    </p>
                    <p class="help is-danger" v-if="!$v.phone.phone">
                      กรุณากรอก เบอร์โทรศัพท์ ให้ถูกต้อง
                    </p>
                  </template>
                </div>
                <div class="column is-6">
                  <div class="control">
                    <label class="label has-text-weight-light">Email</label>
                    <input
                      v-model="$v.email.$model"
                      :class="{ 'is-danger': $v.email.$error }"
                      class="input"
                      type="email"
                    />
                  </div>
                  <template v-if="$v.email.$error">
                    <p class="help is-danger" v-if="!$v.email.email">
                      กรุณากรอก Email ให้ถูกต้อง
                    </p>
                  </template>
                </div>
              </div>
            </div>
            <!-- Address -->
            <div class="field">
              <div class="control">
                <label class="label has-text-weight-light">ที่อยู่</label>
                <textarea v-model="user.address" class="textarea"></textarea>
              </div>
            </div>

            <!-- btn -->
            <div class="field mb-5 mt-6">
              <div class="columns">
                <div class="column is-6">
                  <button
                    class="button is-primary is-rounded"
                    style="width: 100%; font-family: 'Prompt', sans-serif"
                    @click="saveEditProfile(user)"
                  >
                    บันทึก
                  </button>
                </div>
                <div class="column is-6">
                  <button
                    class="button is-danger is-rounded"
                    style="width: 100%; font-family: 'Prompt', sans-serif"
                    @click="showEditProfil = !showEditProfil"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card-content">
          <div class="field">
            <p class="title">โปรไฟล์</p>
            <hr />

            <!-- Fname + Lname -->
            <div class="field">
              <div class="columns">
                <div class="column is-6">
                  <p>
                    ชื่อจริง :
                    <span class="has-text-weight-light">{{ user.fname }}</span>
                  </p>
                </div>

                <div class="column is-6">
                  <p>
                    นามสกุล :
                    <span class="has-text-weight-light">{{ user.lname }}</span>
                  </p>
                </div>
              </div>
            </div>
            <!-- Phone + Email -->
            <div class="field">
              <div class="columns">
                <div class="column is-6">
                  <p>
                    เบอร์โทรศัพท์ :
                    <span class="has-text-weight-light">{{ user.phone }}</span>
                  </p>
                </div>

                <div class="column is-6">
                  <p>
                    Email :
                    <span class="has-text-weight-light">{{ user.email }}</span>
                  </p>
                </div>
              </div>
            </div>
            <!-- Address -->
            <div class="field">
              <p>
                ที่อยู่ :
                <span class="has-text-weight-light">{{ user.address }}</span>
              </p>
            </div>

            <!-- btn -->
            <div class="field mb-5 mt-6">
              <button
                class="button is-dark is-rounded"
                style="width: 100%; font-family: 'Prompt', sans-serif"
                @click="editProfil(user)"
              >
                แก้ไขโปรไฟล์
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  required,
  email,
} from "vuelidate/lib/validators";

function mobile(value) {
  return !!value.match(/0[0-9]{9}/);
}

// function complexPassword(value) {
//   if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
//     return false;
//   }
//   return true;
// }

export default {
  name: "Profile",
  props: ["user"],
  data() {
    return {
      checkHideEyeProf: false,
      checkHideEyeConPassProf: false,
      showEditProfil: false,
      email: "",
      phone: "",
    };
  },
  validations: {
    email: {
      email,
    },
    phone: {
      required,
      mobile,
    },
  },
  methods: {
    editProfil(user) {
      this.showEditProfil = true;
      this.phone = user.phone;
      this.email = user.email;
    },
    saveEditProfile(user) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        user.phone = this.phone
        user.email = this.email

        axios
          .put(`http://localhost:3000/profile/${user.user_id}`, {
            fname: user.fname,
            lname: user.lname,
            phone: user.phone,
            email: user.email,
            address: user.address
          })
          .then((res) => {
            user.fname = res.data.fname,
            user.lname = res.data.lname,
            user.phone = res.data.phone,
            user.email = res.data.phone,
            user.address = res.data.address
            alert("บันทึก การแก้ไขโปรไฟล์แล้ว !!");
            this.showEditProfil = false
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // getUser() {
    //   axios.get("/user/me").then((res) => {
    //     this.user = res.data;
    //   });
    // },
  },
};
</script>