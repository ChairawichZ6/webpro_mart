<template>
  <div id="app">
    <!-- (1) Tab Menu -->
    <!-- (2) ส่วน crad -->
    <div class="container is-max-desktop">
      <!-- ส่วนลด -->
      <div class="columns">
        <div class="column">
          <div
            class="card">
            <div class="card-content">
              <div class="media">
                <!-- รูปภาพ -->
                <div class="media-left">
                  <figure class="image" style="max-width: 250px">
                    <img :src="imagePath(productDetails[0].img)" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content pl-6">
                  <div class="content">
                    <p class="is-size-7 has-text-grey-light mb-4">
                      รหัส #{{ $route.params.productId }}
                    </p>
                    <p
                      class="
                        title
                        has-text-black has-text-weight-normal
                        is-size-4
                        pb-2
                      "
                    >
                      {{ productDetails[0].product_name }}
                    </p>
                    <p
                      class="
                        subtitle
                        has-text-black has-text-weight-light
                        is-size-6
                      "
                    >
                      {{ productDetails[0].des_product }}
                    </p>
                    <p class="is-size-4 has-text-weight-semibold">
                      ฿ {{ productDetails[0].product_price }}
                    </p>
                  </div>
                  <hr style="height: 1px" />
                  <div class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <div class="field has-addons">
                          <div class="control">
                            <a
                              class="
                                button
                                is-danger is-light is-outlined is-rounded
                              "
                              style="width: 10px"
                              @click="counter == 1 ? 1 : counter--"
                            >
                              <i class="fa fa-minus"></i>
                            </a>
                          </div>
                          <div class="control">
                            <a class="button">{{ counter }}</a>
                          </div>
                          <div class="control">
                            <a
                              class="
                                button
                                is-primary is-light is-outlined is-rounded
                              "
                              style="width: 10px"
                              @click="counter++"
                            >
                              <i class="fa fa-plus"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="level-item">
                        <div
                          class="button is-warning is-outlined is-rounded"
                          style="width: 150px"
                        >
                          <!-- ไอคอนรูปตะกร้า -->
                          <div class="icon is-size-4">
                            <i class="fa fa-shopping-cart"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'Descipt',
  data() {
    return {
        productDetails:[]
    };
  },
  mounted() {
    this.getProductDetail(this.$route.params.productId);
  },
  methods: {
    getProductDetail(productId){
      axios
        .get(`http://localhost:3000/ProductDetail/${productId}`)
        .then((response) => {
            this.productDetails = response.data
            // console.log(response.data)
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    imagePath(img) {
      if (img){
        return 'http://localhost:3000/' + img
      } 
      else {
        return 'https://bulma.io/images/placeholders/640x360.png'
      }
    },
  }
};
</script>
