<script>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
//js
import { success, warning } from "../../assets/js/alert.common";
import { sanitizeInput } from "../../assets/js/checkInput.common";

//service
import accountService from "../../service/account.service";
export default {
    components: {},
    setup() {
        const router = useRouter();
        const route = useRoute();
        const data = reactive({
            item: { passwordOld: "", password: "", confirmPassword: "" },
            error: { passwordOld: "", password: "", confirmPassword: "" },
            flag: false,
        });
        const refresh = () => {
            data.item = { passwordOld: "", password: "", confirmPassword: "" };
            data.error = { passwordOld: "", password: "", confirmPassword: "" };
        };
        const changePassword = async () => {
            try {
                console.log(data.item);
                for (const key in data.item) {
                    if (data.item[key] == "") {
                        data.error[key] = "Chưa nhập mật khẩu";
                        data.flag = true;
                    }
                }
                if (!data.flag) {
                    const document = await accountService.update(data.item);
                    if (document.status === "success") {
                        success("Thành công", "Thay đổi mật khẩu thành công.");
                        refresh();
                    } else {
                        warning(
                            "Thất bại",
                            "Thay đổi mật khẩu thất bại. Bạn hãy kiểm tra lại mật khẩu cũ đã đúng chưa."
                        );
                    }
                }
            } catch (error) {
                console.error(">>>er:", error);
                warning("Thất bại", "Thay đổi mật khẩu thất bại.");
            }
        };
        onMounted(async () => { });
        return { data, changePassword, sanitizeInput };
    },
};
</script>
<template>
    <div class="body " style="padding-top:15%">
        <div class="row justify-content-around " style="height: calc(100vh - var(--footer));">
            <div class="card shadow col-6 w-100">
                <div class="row justify-content-center">
                    <h3 class="text-center mt-3 ml-3 col-12 title">Đổi mật khẩu</h3>
                </div>
                <form @submit.prevent="changePassword" class="container mt-3 ">
                    <div class="form-group row">
                        <label for="inputPasswordOld" class="col-sm-4 col-form-label p-0 m-0">Mật khẩu cũ :</label>
                        <div class="col-sm-8 p-0 m-0">
                            <input type="password" class="form-control" id="inputPasswordOld" @blur="() => {
                                if (data.item.passwordOld == '') {
                                    data.error.passwordOld = 'Chưa nhập mật khẩu';
                                    data.flag = true;
                                }
                            }" @input="
    data.error.passwordOld = '';
data.flag = false;
" v-model="data.item.passwordOld" />
                            <div v-if="data.error.passwordOld" class="invalid-error">
                                {{ data.error.passwordOld }}
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-4 col-form-label p-0">Mật khẩu mới :</label>
                        <div class="col-sm-8 p-0 m-0">
                            <input type="password" class="form-control" id="inputPassword" @blur="() => {
                                if (data.item.password == '') {
                                    data.error.password = 'Chưa nhập mật khẩu mới';
                                    data.flag = true;
                                }
                            }
                                " @input="
        data.error.password = '';
    data.flag = false;
    " v-model="data.item.password" />
                            <div v-if="data.error.password" class="invalid-error">
                                {{ data.error.password }}
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputConfirmPassword" class="col-sm-4 col-form-label p-0">Nhập lại mật khẩu:</label>
                        <div class="col-sm-8 p-0 m-0">
                            <input type="password" class="form-control" id="inputConfirmPassword" @blur="() => {
                                if (data.item.password !== data.item.confirmPassword) {
                                    data.flag = true;
                                    data.error.confirmPassword =
                                        'Mật khẩu nhắc lại chưa đúng';
                                }
                            }
                                " @input="
        data.flag = false;
    data.error.confirmPassword = '';
    " v-model="data.item.confirmPassword" />
                            <div v-if="data.error.confirmPassword" class="invalid-error">
                                {{ data.error.confirmPassword }}
                            </div>
                        </div>
                    </div>
                    <div class="form-group row justify-content-around" style="margin-top: 26px">
                        <button type="submit" class="btn btn-login col-sm-3 mx-2">
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped>
.body {
    min-height: 100vh;
}
</style>