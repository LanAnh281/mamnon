<template>
  <div class="body">
    <!-- <p>Hello User</p>
    <router-link :to="{ name: 'Login' }">Login </router-link>
    <router-link :to="{ name: 'Account' }">Account </router-link> -->
    <!-- Hero Start -->

    <!-- Video Modal Start -->
    <div
      class="modal fade"
      id="videoModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content rounded-0">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Youtube Video</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- 16:9 aspect ratio -->
            <div class="ratio ratio-16x9"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Video Modal End -->

    <!-- About Start -->
    <div class="container-fluid py-5">
      <div class="container">
        <div class="row gx-5">
          <div class="col-lg-5 mb-5 mb-lg-0" style="min-height: 500px">
            <div class="position-relative h-100">
              <img
                class="position-absolute w-100 h-100 rounded"
                src="../../assets/image/index.jpg"
                style="object-fit: cover"
              />
            </div>
          </div>
          <div class="col-lg-7">
            <div class="border-start border-5 border-primary ps-5 mb-5">
              <h6 class="text-primary text-uppercase">About Us</h6>
              <h1 class="display-5 text-uppercase mb-0">
                We Keep Your Pets Happy All Time
              </h1>
            </div>
            <h4 class="text-body mb-4">
              Diam dolor diam ipsum tempor sit. Clita erat ipsum et lorem stet
              no labore lorem sit clita duo justo magna dolore
            </h4>
            <div class="bg-light p-4">
              <ul
                class="nav nav-pills justify-content-between mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item w-50" role="presentation">
                  <button
                    class="nav-link text-uppercase w-100 active"
                    id="pills-1-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-1"
                    type="button"
                    role="tab"
                    aria-controls="pills-1"
                    aria-selected="true"
                  >
                    Our Mission
                  </button>
                </li>
                <li class="nav-item w-50" role="presentation">
                  <button
                    class="nav-link text-uppercase w-100"
                    id="pills-2-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-2"
                    type="button"
                    role="tab"
                    aria-controls="pills-2"
                    aria-selected="false"
                  >
                    Our Vission
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-1"
                  role="tabpanel"
                  aria-labelledby="pills-1-tab"
                >
                  <p class="mb-0">
                    Tempor erat elitr at rebum at at clita aliquyam consetetur.
                    Diam dolor diam ipsum et, tempor voluptua sit consetetur
                    sit. Aliquyam diam amet diam et eos sadipscing labore. Clita
                    erat ipsum et lorem et sit, sed stet no labore lorem sit.
                    Sanctus clita duo justo et tempor consetetur takimata
                    eirmod, dolores takimata consetetur invidunt magna dolores
                    aliquyam dolores dolore. Amet erat amet et magna
                  </p>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-2"
                  role="tabpanel"
                  aria-labelledby="pills-2-tab"
                >
                  <p class="mb-0">
                    Tempor erat elitr at rebum at at clita aliquyam consetetur.
                    Diam dolor diam ipsum et, tempor voluptua sit consetetur
                    sit. Aliquyam diam amet diam et eos sadipscing labore. Clita
                    erat ipsum et lorem et sit, sed stet no labore lorem sit.
                    Sanctus clita duo justo et tempor consetetur takimata
                    eirmod, dolores takimata consetetur invidunt magna dolores
                    aliquyam dolores dolore. Amet erat amet et magna
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->

    <!-- Products Start -->
    <div class="container-fluid">
      <div class="container">
        <div
          class="border-start border-5 border-primary"
          style="max-width: 600px"
        >
          <h6 class="text-primary text-uppercase">Sản phẩm</h6>
        </div>
        <div class="owl-carousel product-carousel row">
          <div class="pb-5 col-3">
            <div class="bg-light d-flex flex-column text-center">
              <img
                class="img-fluid mb-4"
                src="../../assets/image/background.jpg"
              />
              <h6 class="text-uppercase">Quality Pet Foods</h6>
              <h5 class="text-primary mb-0">$199.00</h5>
              <div class="btn-action d-flex justify-content-center">
                <span
                  class="material-symbols-outlined btn btn-success py-2 px-3"
                >
                  shopping_cart
                </span>
                <span
                  class="material-symbols-outlined btn btn-primary py-2 px-3"
                >
                  visibility
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
