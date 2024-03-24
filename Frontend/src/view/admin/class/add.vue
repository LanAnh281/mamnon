<script>
import { reactive, onMounted, ref } from "vue";
//service
import gradeService from "../../../service/grade.service";
//js
import { checkString, checkAddress } from "../../../assets/js/checkInput.common";
import { successAd, warning } from "../../../assets/js/alert.common";
export default {
    components: {},
    setup(props, { emit }) {
        const data = reactive({
            item:
            {
                name: "",
                description: ""
            },
            error: { name: "", description: "",price:"" },
            flag: true,
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
            data.item = {
                name: "",
                description:"",
                price:"",
            };
            data.error = { name: "",description:"",price:"" };
            data.flag = true;
        };

        const save = async () => {
            try {
                const document = await gradeService.create(data.item);
                if (document.status = 'success') {
                    successAd(`Đã thêm loại lớp ${data.item.name}.`);
                    refresh();
                    emit("add");
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
            $("#addGradeModal").on("show.bs.modal", openModal); //lắng nghe mở modal
            $("#addGradeModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal
        });

        return {
            data,
            save,
            checkString,
            checkAddress,
        };
    },
};
</script>
<template>
    <div class="modal fade" id="addGradeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title" id="exampleModalLabel">Thêm loại lớp</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="save" class="container mt-1">
                        <!-- <div class="form-group row justify-content-end mr-2">
                            <span class="radius mr-1" style="color: yellowgreen" @click="add">+</span>
                            <span class="radius" style="color: red" @click="remove"> - </span>
                        </div> -->
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Tên loại lớp :</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputrole" v-model="data.item.name" />
                                <div v-if="data.error.name" class="invalid-error">
                                    {{ data.error.name }}
                                </div>
                            </div>
                        </div>
                        <!-- giá -->
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Học phí:</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" id="inputrole" v-model="data.item.price" />
                                <div v-if="data.error.price" class="invalid-error">
                                    {{ data.error.price }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Mô tả :</label>
                            <div class="col-sm-9">

                                <textarea name="" cols="30" rows="2" class="form-control" id="inputrole"
                                    v-model="data.item.description">             </textarea>
                                <div v-if="data.error.description" class="invalid-error">
                                    {{ data.error.description }}
                                </div>
                            </div>
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