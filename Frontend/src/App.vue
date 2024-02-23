<template>
  <div>
    <div v-if="isLoginPath == false">
      <Header v-if="userName != 'giáo viên'"></Header>

      <div class="fluid-container">
        <div class="row m-0 p-0">
          <SideBar class="col-2" v-if="userName == 'giáo viên' || userName == 'hiệu trưởng'"></SideBar>
          <span class=""></span>
          <router-view class="col"></router-view>
        </div>
        <Footer></Footer>
      </div>
    </div>
    <div v-if="isLoginPath">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Footer from "./components/layout/footer.vue";
import NavBar from "./components/layout/navbar.vue";
import SideBar from "./components/layout/sidebar.vue";
import Header from "./components/layout/header.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
export default {
  components: {
    SideBar,
    Header,
    Footer,
    NavBar,
  },
  setup() {
    const route = useRoute();
    const isLoginPath = ref(false);
    const userName = ref('');
    onMounted(() => {
      userName.value = localStorage.getItem('userName');
      console.log(userName.value);
    });
    watch(
      () => route.fullPath,
      (newPath, oldPath) => {
        if (newPath == "/login") isLoginPath.value = true;
        else {
          isLoginPath.value = false;
        }
        // Xử lý khi chuyển trang xảy ra
        console.log("Đã chuyển từ:", oldPath);
        console.log("Đã chuyển đến:", newPath);
        if (newPath == "/") {
          userName.value = '';
        }
        // Thực hiện các hành động khác khi chuyển trang xảy ra
      }

    );

    return {
      isLoginPath,
      userName
    };
  },
};
</script>
<style>
@media print {

  .sidebar,
  /* Thay .navbar bằng lớp hoặc id của navbar của bạn */
  .footer {
    /* Thay .footer bằng lớp hoặc id của footer của bạn */
    display: none;
  }
}
</style>
