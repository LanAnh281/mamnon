<script>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
//service
export default {
  components: {},
  setup() {
    const data = reactive({
      item: {
        userName: "",
        password: "",
      },
    });
    const router = useRouter();

    // const setCookie = (cname, cvalue, exdays) => {
    //   const d = new Date();
    //   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    //   let expires = "expires=" + d.toUTCString();
    //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // };

    const login = async () => {
      try {
        //   const document = await Login.login(data.item);
        // console.log(`document:`, document._id);
        // setCookie("token", document.token, 10); //1 ngày
        // setCookie("role", document.role, 10);
        // if (document.role == "admin") {
        // router.push({ name: "school" });
        // } else 
        router.push({ name: "homepage" });
      } catch (error) {
        if (error.response) {
          console.log("Server-side errors", error.response.data);
        } else if (error.request) {
          console.log("Client-side errors", error.request);
        } else {
          console.log("Errors:", error.message);
        }
      }

    };
    return {
      login,
      data,
    };
  },
};
</script>
<template>
  <div class="login container-fluid">
    <div class="row justify-content-around align-items-center bg-login vh-100">

      <div class="card shadow col-4 rounded py-5 login-card">
        <div class="row justify-content-center">
          <router-link :to="{ name: 'homepage' }" class="col-4">
            <img src="../../assets/image/logo1.png" alt="logo" class="img-fluid" />
          </router-link>
          <h2 class="text-center mt-3 ml-3 col-12">Đăng nhập</h2>
        </div>
        <form @submit.prevent="login" class="container mt-3">
          <div class="form-group row">
            <label for="inputUserName" class="col-3 ">SĐT:</label>
            <input type="text" class="form-control col-9" id="inputUserName" />

          </div>
          <div class="form-group row">
            <label for="inputPassword" class="col-3">Mật khẩu :</label>
            <input type="password" id="inputPassword" class="form-control col-9 ">
          </div>
          <div class="row justify-content-around">
            <button type="submit" class="btn btn-login ">
              Đăng nhập
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg-login {
  background: no-repeat url('https://media.hanamtv.vn/upload/image/202307/medium/89351_7e413f1df53555f1cf5d04c52865f8bc.jpg');
}

.login-card {
  background: no-repeat url('https://media.hanamtv.vn/upload/image/202307/medium/89351_7e413f1df53555f1cf5d04c52865f8bc.jpg');
  opacity: 0.8;
}
</style>
