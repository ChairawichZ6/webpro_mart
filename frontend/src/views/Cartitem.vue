<template>
        <div id="app">
        <!-- (1) Tab Menu -->
        <!-- (2) ส่วน crad -->
        <div class="container is-max-desktop p-5">
            <div class="column pt-6 pl-0 pr-0">
                <!-- card cart component แสดงข้อมูลที่อยู่ใน Localstorage ---------------------------------------------->
                <p class="title">ตะกร้าสินค้า</p>
                <div class="card mb-4" v-for="product in products" :key="product.product_code">
                    <div class="card-content p-0">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-96x96">
                                    <img :src="product[0].img"
                                        alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="media-content pt-2">
                                <p class="has-text-grey-light is-size-7">รหัส #{{ $route.params.productId }}</p>
                                <p class="is-5">{{ product.product_name }}</p>
                                <div style="display: flex;justify-content: space-between;">
                                    <div>
                                        <span class="is-6 has-text-danger">
                                            {{ product.product_price }}
                                        </span>
                                        <span>x {{ product.item_quantity }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="columns is-size-4">
                <div class="column is-2 is-offset-7">
                    ราคารวม
                </div>
                <div class="column is-3 has-text-right">
                    <!-- Total here ---------------------------------------- -->
                    12750
                </div>
            </div>

            <hr style="height: 1px; background: rgb(221, 212, 212);">

            <!-- <h1 class="is-size-4">User Info</h1>
            <br> -->




            <!-- Form Column --------------------------------------- -->
            <!-- <div class="columns">
                <div class="column">
                    <label class="label">ชื่อ</label>
                    <div class="control">
                        <input class="input" type="text" v-model="fname">
                    </div>
                </div>
                <div class="column">
                    <label class="label">นามสกุล</label>
                    <div class="control">
                        <input class="input" type="text" v-model="lname">
                    </div>
                </div>
                <div class="column">
                    <label class="label">เบอร์โทรศัพท์</label>
                    <div class="control">
                        <input class="input" type="text" v-model="tel">
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label">ที่อยู่</label>
                    <textarea class="textarea" placeholder="e.g. บ้านเลขที่ 123 ลาดกระบัง ...." v-model="address"></textarea>
                    <p id="check" v-if="checkk == true">กำลังพิมพ์</p>
                </div>
            </div> -->


            <!-- click this button to open Order modal ----------------- -->
            <div class="has-text-centered">
                <a class="button is-warning" @click="modal_confirm_order = !modal_confirm_order">Confirm Order</a>
            </div>
            <br>

            <!-- Modal ของตารางใบเสร็จ ------------------------------------------------------------------>
            <div class="modal" v-bind:class="{'is-active':modal_confirm_order}">
                <div class="modal-background" @click="modal_confirm_order = !modal_confirm_order"></div>
                <div class="modal-card" style="max-width: 960px;width: 90%;">
                    <section class="modal-card-body">
                        <div class="columns is-size-4">
                            <p class="column is-4 subtitle has-text-danger">Order สินค้าหมายเลข 1</p>
                            <div class="column is-4">
                                <img src="image/logo.jpg" alt="">
                            </div>
                            <p class="column is-4 subtitle has-text-right">เลขบัญชีร้านค้า <br>xxx-x-xxxxx-x</p>
                        </div>

                        <table id='order-table' style="width: 100%;" class="table is-bordered">
                            <!-- ใส่ข้อมูลของ table ไว้ในนี้ -------------------------------------------->
                            <tr>
                                <th colspan="4" style="text-align: center;">Order Detail</th>
                            </tr>
                            <tr>
                                <td colspan="2"><b>ชื่อ : Manee Kongsangthai</b></td>
                                <td colspan="2"><b>ที่อยู่ : Tha Raeng, Bang Khen, Bangkok 10220</b></td>
                            </tr>
                            <tr>
                                <td colspan="4" style="text-align: center;">รายการสินค้า</td>
                            </tr>
                            <tr>
                                <td><b>ชื่อสินค้า</b></td>
                                <td><b>ราคาต่อหน่วย</b></td>
                                <td><b>จำนวน</b></td>
                                <td><b>ราคารวม</b></td>
                            </tr>
                            <tr v-for="item in products" :key="item.item_id">
                                <td>{{item.product_name}}</td>
                                <td>{{item.product_price}}</td>
                                <td>{{item.item_quantity}}</td>
                                <td>{{item.product_price * item.item_quantity}}</td>
                            </tr>
                            <tr>
                                <td colspan="2"></td>
                                <td><b>ราคารวมทั้งหมด</b></td>
                                <td><b>12750</b></td>
                            </tr>
                        </table>
                    </section>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
    show_login: false,
    modal_confirm_order: false,
    counter: 1,
    user_id:[],
    cartItem: []
    };
  },
  mounted() {
    this.getCart(this.$route.params.id);
  },
  methods: {
    getCart(userId) {
      axios
        .get(`http://localhost:3000/cart/${userId}`)
        .then((response) => {
          this.cartItem = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    }
}
    </script>