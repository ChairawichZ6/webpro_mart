<style scoped>
#detail_login {
    /* padding-top: 10px;
    padding-bottom: 10px; */
    width: 40%;
}
#hide {
    position: absolute;
    right: 0;
}
</style>

<template>
<div class="container is-fluid mt-5">
    <div id="detail_login" class="container">
        <div class="card px-3">
            <div class="card-content">
                <div class="field">
                    <p class="title">
                        สมัครสมาชิก
                    </p>
                    <hr>
                    <form action="/" method="GET">
                        <!-- Fname + Lname -->
                        <div class="field">
                            <div class="columns">
                                <div class="column is-6">
                                    <label class="label has-text-weight-light">ชื่อจริง</label>
                                    <input v-model="$v.fname.$model" :class="{'is-danger': $v.fname.$error}" class="input" type="text">
                                    <template v-if="$v.fname.$error">
                                        <p class="help is-danger" v-if="!$v.fname.required">กรุณากรอก ชื่อจริง</p>
                                    </template>
                                </div>

                                <div class="column is-6">
                                    <label class="label has-text-weight-light">นามสกุล</label>
                                    <input v-model="$v.lname.$model" :class="{'is-danger': $v.lname.$error}" class="input" type="text">
                                    <template v-if="$v.lname.$error">
                                      <p class="help is-danger" v-if="!$v.lname.required">กรุณากรอก นามสกุล</p>
                                    </template>
                                </div>

                            </div>
                        </div>
                        <!-- Age + Date -->
                        <div class="field">
                            <div class="columns">
                                <div class="column is-6">
                                    <label class="label has-text-weight-light">อายุ</label>
                                    <input v-model="$v.age.$model" :class="'is-danger: $v.age.$error'" class="input" type="text">
                                    <template v-if="$v.age.$error">
                                        <p class="help is-danger" v-if="!$v.age.required">กรุณากรอก อายุ</p>
                                    </template>
                                </div>
                                <div class="column is-6">
                                    <label class="label has-text-weight-light">วันเกิด</label>
                                    <input v-model="$v.birthdate.$model" :class="'is-danger: $v.birthdate.$error'" class="input" type="date">
                                    <template v-if="$v.birthdate.$error">
                                        <p class="help is-danger" v-if="!$v.birthdate.required">กรุณากรอก วันเกิด</p>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <!-- Address -->
                        <div class="field">
                            <dic class="control">
                                <label class="label has-text-weight-light">ที่อยู่</label>
                                <textarea v-model="$v.address.$model" :class="{'is-danger': $v.address.$error}" class="textarea"></textarea>
                            </dic>
                            <template v-if="$v.address.$error">
                                <p class="help is-danger" v-if="!$v.address.required">กรุณากรอก ที่อยู่</p>
                            </template>
                        </div>
                        <!-- Phone -->
                        <div class="field">
                            <div class="control">
                                <label class="label has-text-weight-light">เบอร์โทรศัพท์</label>
                                <input v-model="$v.phone.$model" :class="'is-danger: $v.phone.$error'" class="input" type="text">
                            </div>
                            <template v-if="$v.phone.$error">
                                <p class="help is-danger" v-if="!$v.phone.required">กรุณากรอก เบอร์โทรศัพท์</p>
                                <p class="help is-danger" v-if="!$v.phone.phone">กรุณากรอก เบอร์โทรศัพท์ ให้ถูกต้อง</p>
                            </template>
                        </div>
                        <!-- Email -->
                        <div class="field">
                            <dic class="control">
                                <label class="label has-text-weight-light">Email</label>
                                <input v-model="$v.email.$model" :class="{'is-danger': $v.email.$error}" class="input" type="email">
                            </dic>
                            <template v-if="$v.email.$error">
                                <p class="help is-danger" v-if="!$v.email.required">กรุณากรอก Email</p>
                                <p class="help is-danger" v-if="!$v.email.email">กรุณากรอก Email ให้ถูกต้อง</p>
                            </template>
                        </div>
                        <!-- Username -->
                        <div class="field">
                            <div class="control">
                                <label class="label has-text-weight-light">Username</label>
                                <input v-model="$v.username.$model" :class="'is-danger: $v.username.$error'" class="input" type="text">
                            </div>
                            <template v-if="$v.username.$error">
                              <p class="help is-danger" v-if="!$v.username.required">กรุณากรอก Username</p>
                              <p class="help is-danger" v-if="!$v.username.minLength">กรุณากรอกอย่างน้อย 5 ตัวอักษร</p>
                              <p class="help is-danger" v-if="!$v.username.maxLength">กรุณากรอกน้อยกว่า 20 ตัวอักษร</p>
                          </template>
                        </div>
                        <!-- Password -->
                        <div class="field">
                            <div class="control">
                                <label class="label has-text-weight-light">Password</label>
                                <input v-model="$v.password.$model" :class="{'is-danger': $v.password.$error}" class="input" :type="checkHideEye ? 'text' : 'password' " placeholder="Password">
                                <span id="hide" class="button is-right" @click="checkHideEye = !checkHideEye">
                                    <i class="fa fa-eye" :class="checkHideEye ? 'is-active' : 'is-hidden'"></i>
                                    <i class="fa far fa-eye-slash" :class="checkHideEye ? 'is-hidden' : 'is-active'"></i>
                                </span>
                            </div>
                            <template v-if="$v.password.$error">
                              <p class="help is-danger" v-if="!$v.password.required">กรุณากรอก password</p>
                              <p class="help is-danger" v-if="!$v.password.minLength">กรุณากรอก password อย่างน้อย 8 ตัวอักษร</p>
                              <p class="help is-danger" v-if="!$v.password.complexPassword">password ควรมี A-Z, a-z, 0-9 ผสมกัน</p>
                          </template>
                        </div>
                        <!-- Confirm Password -->
                        <div class="field">
                            <div class="control">
                                <label class="label has-text-weight-light">Confirm Password</label>
                                <input v-model="$v.confirm_password.$model" :class="{'is-danger': $v.confirm_password.$error}" class="input" :type="checkHideEyeConPass ? 'text' : 'password' " placeholder="Confirm sPassword">
                                <span id="hide" class="button is-right" @click="checkHideEyeConPass = !checkHideEyeConPass">
                                    <i class="fa fa-eye" :class="checkHideEyeConPass ? 'is-active' : 'is-hidden'"></i>
                                    <i class="fa far fa-eye-slash" :class="checkHideEyeConPass ? 'is-hidden' : 'is-active'"></i>
                                </span>
                                <template v-if="$v.confirm_password.$error">
                                  <p class="help is-danger" v-if="!$v.confirm_password.sameAs">กรุณากรอก password ให้ตรงกัน</p>
                                </template>
                            </div>
                        </div>
                        <!-- btn -->
                        <div class="field mb-5 mt-6">
                            <button class="button is-dark is-rounded" style="width: 100%;font-family: 'Prompt', sans-serif;" @click="submit()">สมัครสมาชิก</button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

function mobile (value) {
  return !!value.match(/0[0-9]{9}/)
}

function complexPassword (value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false
  }
  return true
}

export default {
    data () {
        return {
          checkHideEye: false,
          checkHideEyeConPass: false,
          username: '',
          password: '',
          confirm_password: '',
          email: '',
          phone: '',
          fname: '',
          lname: '',
          birthdate: '',
          age: '',
          address: '',
        }
    },
    // built-in validators
    validations: {
        email: {
            required,
            email
        },
        phone: {
            required,
            mobile
        },
        password: {
            required: required,
            minLength: minLength(8),
            complexPassword,
        },
        confirm_password: {
            sameAs: sameAs('password'),
        },
        username: {
            required,
            minLength: minLength(5),
            maxLength: maxLength(20)
        },
        fname: {
            required
        },
        lname: {
            required
        },
        birthdate: {
            required
        },
        address: {
            required
        },
        age: {
            required
        }
    },
    methods: {
        submit() {
            // Validate all fields
            this.$v.$touch();

            // เช็คว่าในฟอร์มไม่มี error
            if (!this.$v.$invalid) {
                let data = {
                    username: this.username,
                    password: this.password,
                    confirm_password: this.confirm_password,
                    email: this.email,
                    phone: this.phone,
                    fname: this.fname,
                    lname: this.lname,
                    birthdate: this.birthdate,
                    address: this.address,
                    age: this.age
                }

                axios.post("http://localhost:3000/user/signup", data)
                .then((res) => {
                    alert("Sign up Success");
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }
}
</script>