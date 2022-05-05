<template>
  <div class="container is-max-desktop">
    <!-- ส่วนลด -->
    <section v-if="user" class="section">
      <h1 class="title">คูปองส่วนลด</h1>
      <div class="is-multiline columns is-variable is-3">
        <div class="column is-2" v-for="coupon in coupons" :key="coupon.id">
          <div class="card">
            <div class="card-image">
              <!-- image -->
              <figure class="image is-1by1">
                <img
                  src="https://cdn.discordapp.com/attachments/871416792613027851/969933848878141490/unknown.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <!-- Price -->
                <div class="media-content">
                  <p class="subtitle is-7">
                    ส่วนลด <br />
                    <strong class="title is-6">฿ {{ coupon.discount }}</strong>
                  </p>
                  <hr />
                  <p class="is-size-7">
                    code: <strong class="title is-7">{{ coupon.code }}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr v-if="user" style="height: 1px; background: rgb(221, 212, 212)" />

    <!-- Card Product -->
    <section v-if="productNew.length != 0" class="section">
      <h1 class="title">
        สินค้า
        <a class="icon is-medium" @click="showModalAdd = !showModalAdd">
          <i class="fas fa-lg fa-plus-circle"></i>
        </a>
      </h1>
      <div class="is-multiline columns is-variable is-3">
        <div
          class="column is-3"
          v-for="product in productNew"
          :key="product.product_code"
        >
          <div class="card">
            <div class="card-image">
              <!-- image -->
              <figure class="image is-1by1">
                <img
                  :src="'http://localhost:3000' + product.img"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- รหัส -->
                  <div>
                    <p
                      class="
                        subtitle
                        is-7
                        has-text-grey-light has-text-weight-light
                      "
                    >
                      รหัส #{{ product.product_code }}
                    </p>
                  </div>
                  <!-- Name -->
                  <router-link :to="`/ProductDetail/${product.product_code}`">
                    <p class="has-text-black has-text-weight-medium is-6">
                      {{ product.product_name }}
                    </p>
                  </router-link>
                </div>
              </div>
              <div class="media">
                <!-- Price -->
                <div class="media-content">
                  <p class="subtitle is-7">
                    ราคา
                    <strong class="title is-6"
                      >฿ {{ product.product_price }}</strong
                    >
                  </p>
                </div>
              </div>
              <div class="columns">
                <!-- btn Edit -->
                <div class="column is-6">
                  <div
                    v-if="isAdmin()"
                    class="button is-primary is-outlined is-rounded"
                    style="width: 100%"
                  >
                    <div class="icon is-size-4">
                      <i class="fas fa-edit"></i>
                    </div>
                  </div>
                </div>
                <!-- btn Delete -->
                <div class="column is-6">
                  <div
                    v-if="isAdmin()"
                    class="button is-danger is-outlined is-rounded"
                    style="width: 100%"
                    @click="deleteProduct(product.product_code, product)"
                  >
                    <div class="icon is-size-4">
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
              <!-- >>>>>ไอคอนรูปตะกร้า <<<<<< -->
              <div
                v-if="isUserOwner()"
                class="button is-warning is-outlined is-rounded"
                style="width: 100%"
              >
                <div class="icon is-size-4">
                  <i class="fa fa-shopping-cart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else class="section">
      <h1 class="title">
        สินค้า
        <a class="icon is-medium" @click="showModalAdd = !showModalAdd">
          <i class="fas fa-lg fa-plus-circle"></i>
        </a>
      </h1>
      <div class="is-multiline columns is-variable is-3">
        <div
          class="column is-3"
          v-for="product in products"
          :key="product.product_code"
        >
          <div class="card">
            <div class="card-image">
              <!-- image -->
              <figure class="image is-1by1">
                <img
                  :src="'http://localhost:3000' + product.img"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- รหัส -->
                  <div>
                    <p
                      class="
                        subtitle
                        is-7
                        has-text-grey-light has-text-weight-light
                      "
                    >
                      รหัส #{{ product.product_code }}
                    </p>
                  </div>
                  <!-- Name -->
                  <router-link :to="`/ProductDetail/${product.product_code}`">
                    <p class="has-text-black has-text-weight-medium is-6">
                      {{ product.product_name }}
                    </p>
                  </router-link>
                </div>
              </div>
              <div class="media">
                <!-- Price -->
                <div class="media-content">
                  <p class="subtitle is-7">
                    ราคา
                    <strong class="title is-6"
                      >฿ {{ product.product_price }}</strong
                    >
                  </p>
                </div>
              </div>
              <div class="columns">
                <!-- btn Edit -->
                <div class="column is-6">
                  <div
                    v-if="isAdmin()"
                    class="button is-primary is-outlined is-rounded"
                    style="width: 100%"
                  >
                    <div class="icon is-size-4">
                      <i class="fas fa-edit"></i>
                    </div>
                  </div>
                </div>
                <!-- btn Delete -->
                <div class="column is-6">
                  <div
                    v-if="isAdmin()"
                    class="button is-danger is-outlined is-rounded"
                    style="width: 100%"
                    @click="deleteProduct(product.product_code, product)"
                  >
                    <div class="icon is-size-4">
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
              <!-- >>>>>ไอคอนรูปตะกร้า <<<<<< -->
              <div
                v-if="isUserOwner()"
                class="button is-warning is-outlined is-rounded"
                style="width: 100%"
              >
                <div class="icon is-size-4">
                  <i class="fa fa-shopping-cart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ส่วนของ Add Product -->
    <div class="modal" :class="{ 'is-active': showModalAdd }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มสินค้า</p>
          <button
            class="delete"
            aria-label="close"
            @click="showModalAdd = !showModalAdd"
          ></button>
        </header>
        <section class="modal-card-body px-6 py-6">
          <div class="columns">
            <div class="column is-6">
              <label class="label has-text-weight-normal">ชื่อสินค้า</label>
              <input v-model="productName" class="input" type="text" />
            </div>
            <div class="column is-6">
              <label class="label has-text-weight-normal">ราคา</label>
              <input v-model="productPrice" class="input" type="text" />
            </div>
          </div>
          <div class="control">
            <label class="label has-text-weight-normal">รายละเอียดสินค้า</label>
            <textarea v-model="productDetail" class="textarea"></textarea>
          </div>

          <!-- Image Uploade-->
          <div class="control mt-5">
            <label class="label has-text-weight-normal">รูปภาพสินค้า</label>
            <input
              class="input"
              name="myImage"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              @change="selectImages"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-info" @click="submitProduct()">
            บันทึก
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Home",
  props: ["user", "products", "coupons"],
  data() {
    return {
      productNew: [],
      showModalAdd: false,
      productName: "",
      productPrice: 0,
      productDetail: "",
      images: "",
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files[0];
    },
    deleteProduct(proId, item) {
      const result = confirm(`ต้องการลบ \'${item.product_name}\' ใช่หรือไม่?`);
      if (result) {
        axios
          .delete(`/products/${proId}`)
          .then((res) => {
            this.getProduct();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    submitProduct() {
      let formData = new FormData();
      formData.append("product_name", this.productName);
      formData.append("product_price", this.productPrice);
      formData.append("des_product", this.productDetail);
      formData.append("myImage", this.images);

      const result = confirm(`ต้องการเพิ่มสินค้าชิ้นนี้หรือไม่?`);
      if (result) {
        axios
          .post("/products", formData)
          .then((res) => {
            this.getProduct();
            this.showModalAdd = false;
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    },
    getProduct() {
      axios
        .get("/poducts")
        .then((res) => {
          this.productNew = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isUserOwner() {
      if (!this.user) return false;
      return this.user.type === "customer";
    },
    isAdmin() {
      if (!this.user) return false;
      return this.user.type === "admin";
    },
  },
};
</script>
