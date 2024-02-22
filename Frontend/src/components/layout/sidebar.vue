<script>
import { reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
      item: [
        { name: "Thông báo", icon: "bar_chart_4_bars", active: "dashboard" },
        { name: "Thống kê", icon: "bar_chart_4_bars", active: "dashboard" },
        {
          name: "Trường học",
          icon: "school",
          active: "school",
        },
        { name: "Giáo viên", icon: "person", active: "teacher" },
        { name: "Lớp học", icon: "holiday_village", active: "room" },
        { name: "Thực đơn", icon: "menu", active: "menuDaily" },

        {
          name: "Hóa đơn",
          icon: "payments",
          active: "bill",
        },
        {
          name: "Báo cáo",
          icon: "text_snippet",
          active: "report",
        },
        {
          name: "Tài khoản",
          icon: "manage_accounts",
          active: "account",
        },
        { name: "Đổi mật khẩu", icon: "key", active: "changePassword" },
        { name: "Đăng xuất", icon: "power_settings_new", active: "logout" },
      ],
      active: "dashboard",
      userName: "",
    });
    const logout = async () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("position");
      localStorage.setItem("username", '');
      router.push({ name: 'homepage' })
    };
    watch(
      () => route.fullPath,
      (newPath, oldPath) => {
        data.active = newPath.substring(newPath.lastIndexOf("/") + 1);
        console.log("Path:", data.active);
      }
    );

    onMounted(async () => {
      data.userName = localStorage.getItem("userName");
    });
    return { data, router, logout };
  },
};
</script>
<template>
  <div class="sidebar px-0">
    <div style="width: 100%" class="row justify-items-around align-items-center">
      <img src="../../assets/image/logo1.png" style="
          object-fit: contain;
          box-shadow: 0 0 20px 1px rgba(255, 255, 0, 0.3);
        " class="col-3 ml-4 mr-0 p-0" />
      <div class="col row mt-0">
        <div class="col-12 my-3">
          <span style="
              display: block;
              color: var(--beige);
              text-shadow: 0 0 5px #ffff;
              font-size: 0.9rem;
            ">
            Xin chào</span>
          <span style="
              color: var(--beige);
              text-shadow: 0 0 5px #ffff;
              font-size: 0.9rem;
            ">
            {{ data.userName }}
          </span>
        </div>
      </div>
    </div>
    <!-- Sử dụng inline styles để tùy chỉnh dòng gạch ngang -->
    <hr style="border-color: rgb(230, 221, 221)" class="m-0" width="" />
    <div class="list mx-2">
      <ul>
        <li v-for="(value, index) in data.item" :key="index" class="pl-2 my-3"
          :class="data.active == value.active ? 'isActive' : ''" @click="() => {
            if (value.active == 'logout') {
              logout();
              return;
            }
            data.active = value.active;
            router.push({ name: data.active });
          }
            ">
          <div>
            <span class="material-symbols-outlined mr-2" style="font-size: 16px">
              {{ value.icon }}
            </span>
            <p class="mb-0" style="font-size: 16px">{{ value.name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
ul {
  list-style: none;
}

li {
  display: block;
}

.list li>div {
  display: flex;
  align-items: center;
  /* Căn chỉnh theo chiều dọc */
}

.material-symbols-outlined {
  font-size: 1.2rem;
}

li div>* {
  color: var(--beige);
  display: inline-block;
}

li:hover>div>* {
  color: white;
  text-shadow: 0 0 6px rgba(255, 255, 255, 1);
}

.isActive>div>* {
  text-shadow: 0 0 6px rgba(255, 255, 255, 1);

}

.isActive {
  border: 1px solid #fff;
  padding: 4px;
  border-radius: 6px;
}
</style>