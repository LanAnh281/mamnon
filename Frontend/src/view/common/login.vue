<script>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
//service
import Login from "../../service/login.service";
//js
import { warning } from "../../assets/js/alert.common";
import { setCookie, setLocalStrorage } from "../../assets/js/login.common"
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
    const login = async () => {
      try {
        console.log(`data:`,data.item);

        const document = await Login.login(data.item);
        console.log(`document:`, document);
        if (document['status'] == 'success') {
          setLocalStrorage(
            document["token"],
            document["permissionName"],
            document["expiresIn"]
          );
          // setCookie("token", document.token, 10); //1 ngày
          // setCookie("permission", document.permissionName, 10);
          if (document.permissionName == 'giáo viên' ||document.permissionName == 'phụ huynh'  ) {
            router.push({ name: "school" });
          }
          else{
            console.log('khác:vãng lai');
            router.push({ name: "homepage" });
          }
           
        }
        else {
          console.log('dn sai');
          warning('Thông tin sai', 'Tên đăng nhập hoặc mật khẩu sai');
        }
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
            <input type="text" class="form-control col-9" id="inputUserName" v-model="data.item.userName" />

          </div>
          <div class="form-group row">
            <label for="inputPassword" class="col-3">Mật khẩu :</label>
            <input type="password" id="inputPassword" class="form-control col-9" v-model="data.item.password">
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
