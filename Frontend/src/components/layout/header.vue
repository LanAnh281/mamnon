<script></script>
<template>
  <div class="header row align-item-end">
    <div class="logo col-2"><img src="" alt="logo"></div>

    <ul class="header-list col-10 ">
      <li>
        <router-link :to="{ name: 'homepage' }">Trang chủ </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'introduce' }"> Giới thiệu</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'programStudy' }">Chương trình học</router-link>
      </li>
      <!-- <li>
        <router-link :to="{ name: 'homepage' }">Học Phí</router-link>
      </li> -->
      <!-- <li>
        <router-link :to="{ name: 'homepage' }">Tuyển sinh</router-link>
      </li> -->
      <li>
        <router-link :to="{ name: 'contact' }">Liên hệ</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'login' }">Đăng nhập</router-link>
      </li>

    </ul>
  </div>
</template>
<style>
.header {
  margin: 10px;
}

.header-list {
  list-style: none;
  text-align: center;
}

.header-list li {
  display: inline-block;
  text-transform: uppercase;
  padding: 4px 20px;
  color: var(--black-light);
  font-weight: 600;
}
</style>
