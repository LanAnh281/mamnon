<script>
import { reactive, onMounted, ref } from "vue";
//service
import gradeService from "../../../service/grade.service";
//js
import { checkString, checkAddress } from "../../../assets/js/checkInput.common";
import { successAd, warning } from "../../../assets/js/alert.common";
export default {
    components: {},
    props: { _id: { type: String, default: "" } },
    setup(props, { emit }) {
        const data = reactive({
            item:
            {
                name: "",
                description: ""
            },
            error: { name: "", description: "" },
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
            };
            data.error = { name: "" };
            data.flag = true;
        };

        const save = async () => {
            try {
                const document = await gradeService.update(props._id, data.item);
                if (document.status = 'success') {
                    successAd(`Đã chỉnh sửa loại lớp ${data.item.name}.`);
                    refresh();
                    emit("edit");
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
            console.log("props:", props._id);
            const documnent = await gradeService.get(props._id);
            data.item = documnent.message;
            $("#editGradeModal").on("show.bs.modal", openModal); //lắng nghe mở modal
            $("#editGradeModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal
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
    <div class="modal fade" id="editGradeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title text-warning" id="exampleModalLabel">Chỉnh sửa loại lớp</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="save" class="container mt-1">
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Tên loại lớp :</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputrole" v-model="data.item.name" />
                                <div v-if="data.error.name" class="invalid-error">
                                    {{ data.error.name }}
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
                            <button type="submit" class="btn btn-warning text-light col-sm-3">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>