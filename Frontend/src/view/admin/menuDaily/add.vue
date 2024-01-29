<script>
import { reactive, onMounted, ref } from "vue";
import _ from "lodash";
//service

export default {
    components: {},
    setup(props, { emit }) {
        const data = reactive({
            items: {},
            uploadFiles: [],
        });
        const isModalOpen = ref(false);
        const openModal = () => {
            isModalOpen.value = true;
            console.log("open modal role");
        };
        const closeModal = () => {
            console.log("close modal role");
            emit("closeModal");
        };
        const refresh = () => {
            data.items = {
                name: "",
            };

        };
        const save = async () => {
            console.log("save");
            try {


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
            $("#menuModal").on("show.bs.modal", openModal); //lắng nghe mở modal
            $("#menuModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal
        });

        return {
            data,
            save,
        };
    },
};
</script>
<template>
    <div class="modal fade" id="menuModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title" id="exampleModalLabel">Thực đơn</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="save" class="container mt-1">
                        <div class="form-group row justify-content-end mr-2">
                        </div>
                        <div class="form-group row">
                            <label for="inputDate" class="col-sm-2 col-form-label px-3">Ngày: </label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" id="inputDate" name="inputDate" />
                            </div>
                        </div>
                        <label for="inputDate" class="col-sm-2 col-form-label p-0">Buổi: </label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineradio1" value="option1">
                            <label class="form-check-label" for="inlineradio1">Sáng</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineradio2" value="option2">
                            <label class="form-check-label" for="inlineradio2">Chiều</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineradio3" value="option3">
                            <label class="form-check-label" for="inlineradio3">Xế</label>
                        </div>
                        <div class="form-group row justify-content-around mb-0">
                            <button type="submit" class="btn btn-login col-sm-3">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal-content {
    width: 120%;
}

.img-menu {
    height: 50vh;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.img-menu input {
    border: none
}
</style>