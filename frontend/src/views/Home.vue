<template>
  <div class="container is-max-desktop">
    <!-- ส่วนลด -->
    <section class="section">
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
                    <strong class="title is-6">฿ {{ coupon.price }}</strong>
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

    <hr style="height: 1px; background: rgb(221, 212, 212)" />

    <!-- Card Product -->
    <section class="section">
      <h1 class="title">สินค้า</h1>
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
                  src="https://bulma.io/images/placeholders/128x128.png"
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
                    <strong class="title is-6">฿ {{ product.product_price }}</strong>
                  </p>
                </div>
              </div>
              <div
                class="button is-warning is-outlined is-rounded"
                style="width: 100%"
              >
                <!-- >>>>>ไอคอนรูปตะกร้า <<<<<<,s----------------------------------------->
                <div class="icon is-size-4">
                  <i class="fa fa-shopping-cart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from "axios";
// @ is an alias to /src
export default {
  name: "Home",
  props: [
    "user",
    "products"
  ],
  data() {
    return {
      coupons: [
        {
          price: 20,
          code: "fuB5QU5T",
        },
        {
          price: 30,
          code: "o6XaBOdN",
        },
        {
          price: 50,
          code: "Cc5hraHh",
        },
        {
          price: 250,
          code: "MEt1tSIG",
        },
      ],
    };
  },
  methods: {},
};
</script>
