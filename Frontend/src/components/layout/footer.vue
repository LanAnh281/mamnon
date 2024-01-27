<script></script>
<template>
  <div class="footer">
    <div class="row justify-content-between">
      <div class="col-4 school">
        <h5>Tên trường</h5>
        <ul>
          <li>SĐT</li>
          <li>Địa chỉ</li>
          <li>Tax</li>
        </ul>
      </div>
      <div class="col-4 navigation">
        <ul>
          <li>
            <router-link :to="{ name: 'homepage' }">Chương trình học </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'homepage' }">Học phí </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'homepage' }">Tuyển sinh </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'homepage' }">Tuyển dụng </router-link>
          </li>
        </ul>
      </div>
      <div class="col-4 social">
        <ul>
          <li>
            <i class="fa-brands fa-facebook"></i>
          </li>
          <li>
            <i class="fa-brands fa-google"></i>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>
<style>
.social ul li {
  display: inline-block;
  padding: 10px;

}

.social .fa-brands {
  font-size: 30px;
}

.social .fa-facebook {
  color: blue;
}

.social .fa-google {
  color: orangered;
}
</style>

