<script>
import { reactive, onMounted, onBeforeMount, ref } from "vue";
//service
import accountService from "../../service/account.service";
import permissionService from "../../service/permission.service.js";
//js
import { checkPhone } from "../../assets/js/checkInput.common";
import { successAd, warning } from "../../assets/js/alert.common";
export default {
    components: {},
    setup(props, { emit }) {
        const data = reactive({
            item: {
                name: "",
            },
            error: { name: "" },
            position: [],
            flag: true,
            disablebtn: false,
        });
        const isModalOpen = ref(false);
        const openModal = () => {
            isModalOpen.value = true;
            console.log("open modal account");
        };
        const closeModal = () => {
            console.log("close modal account");
            emit("closeModal");
        };

        const save = async () => {
            try {
                data.disablebtn = !data.disablebtn;
                if (!data.flag) {
                    const document = await accountService.create(data.item);
                    if (document["status"] == "success") {
                        successAd("Thành công tạo tài khoản mới.");
                        emit("add");
                        data.disablebtn = !data.disablebtn;
                        data.item.name = "";
                    }
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
        onMounted(async () => {
            $("#accountModal").on("show.bs.modal", openModal); //lắng nghe mở modal
            $("#accountModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal
        });
        onBeforeMount(async () => {
            const document = await permissionService.getAll();
            data.position = document.message;
            data.item.permissionId = data.permission[0]._id;
        });
        return {
            data,
            save,
            checkPhone,
        };
    },
};
</script>
<template>
    <div class="modal fade" id="accountModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title" id="exampleModalLabel">
                        Thêm tài khoản
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="save" class="container mt-3">
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">SĐT :</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputrole" @blur="() => {
                                    if (checkPhone(data.item.name)) {
                                        data.flag = true;
                                        data.error.name = 'sai định dạng SĐT';
                                    }
                                }
                                    " @input="() => {
        data.flag = false;
        data.error.name = '';
    }
        " v-model="data.item.name" />
                                <div v-if="data.error.name" class="invalid-error">
                                    {{ data.error.name }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group row" v-if="data.position">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Vai trò :</label>
                            <label class="col-sm" style="max-width: 25%" v-for="(value, index) in data.position"
                                :key="index">
                                <input type="radio" :value="value._id" v-model="data.item.permissionId" />
                                {{ value.name }}
                            </label>
                        </div>

                        <div class="form-group row justify-content-around mb-0">
                            <button type="submit" class="btn btn-login col-sm-3" :disabled="data.disablebtn">
                                Thêm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>