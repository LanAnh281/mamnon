<script>
import { reactive, onMounted } from "vue";
import schoolService from '../../service/school.service';
export default {
  components: {},
  setup() {
    const data = reactive({
      items: {

      }
    })
    onMounted(async () => {
      const document = await schoolService.getAll();
      data.items = document.message;
    })
    return {
      data
    }
  }
}
</script>
<template>
  <div class="footer">
    <div class="row justify-content-between">
      <div class="col-5 school">
        <h5>{{ data.items['name'] }}</h5>
        <ul>
          <li>SĐT: {{ data.items['phone'] }}</li>
          <li>Email: {{ data.items['email'] }}</li>
          <li>Địa chỉ: {{ data.items['address'] }}</li>
          <li>Tax: {{ data.items['TAXID'] }}</li>
        </ul>
      </div>
      <div class="col-4 ">
        <ul class="navigation">
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
      <div class="col-3 social">
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
<style scoped>
.school h5 {
  text-transform: uppercase;
}

.school li,
.navigation li {
  line-height: 1.8;
}

.navigation li {
  cursor: pointer;
}

.navigation li a {
  color: #fff;
}

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

