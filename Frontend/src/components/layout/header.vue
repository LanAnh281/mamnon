<template>
  <div class="header">
    <!-- Navbar Start -->
    <nav
      class="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0"
    >
      <a href="index.html" class="navbar-brand ms-lg-5">
        <h1 class="m-0 text-uppercase text-dark">
          <!-- <i class="bi bi-shop fs-1 text-primary me-3"></i>Pet Shop -->
          <img
            src="../../assets/image/logo petshop.webp"
            style="width: 50px; height: 50px; margin-top: -20px"
            class="ml-5"
          />
        </h1>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto py-0">
          <a href="#" class="nav-item nav-link active">Trang chủ</a>
          <!-- <a href="#" class="nav-item nav-link"></a> -->
          <div class="nav-item dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              >Sản phẩm</a
            >
            <div class="dropdown-menu m-0">
              <!-- v-for -->
              <a href="price.html" class="dropdown-item"></a>
              <a href="team.html" class="dropdown-item">The Team</a>
              <a href="testimonial.html" class="dropdown-item">Testimonial</a>
              <a href="blog.html" class="dropdown-item">Blog Grid</a>
              <a href="detail.html" class="dropdown-item">Blog Detail</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script></script>
