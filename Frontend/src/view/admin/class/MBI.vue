<script>
import { reactive, onMounted, ref } from "vue";
//service
import gradeService from "../../../service/grade.service";
//js
import { checkString, checkAddress } from "../../../assets/js/checkInput.common";
import { successAd, warning } from "../../../assets/js/alert.common";
import childrenService from "../../../service/children.service";
//
import {formatDateTime} from "../../../assets/js/format.common"
export default {
    components: {},
    props: { _id: { type: String, default: "" } },
    setup(props, { emit }) {
        const data = reactive({
            item:
            {
                name: "",
                birthday:"",
                weight:"",
                height:"",
                classRoom:{name:""}
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
                data.item.oldBMI=data.item.newBMI;
                data.item.newBMI= Math.round(data.item.weight/(data.item.height/100*data.item.height/100),1);
                if(data.item.newBMI<18.5){
                    data.item.newBMI=`Chiều cao:${data.item.height} - cân nặng: ${data.item.weight} - ${data.item.newBMI} (Nhẹ cân)`;
                }else if(data.item.newBMI>=18.5 && data.item.newBMI<24.9){
                    data.item.newBMI=`Chiều cao:${data.item.height} - cân nặng: ${data.item.weight} -  ${data.item.newBMI} (Bình thường)`;
                }
                else if(data.item.newBMI>=25 && data.item.newBMI<29.9){
                    data.item.newBMI=`Chiều cao:${data.item.height} - cân nặng: ${data.item.weight} -  ${data.item.newBMI} (Thừa cân)`;
                }
                else if(data.item.newBMI>=30 && data.item.newBMI<34.9){
                    data.item.newBMI=`Chiều cao:${data.item.height} - cân nặng: ${data.item.weight} -  ${data.item.newBMI} (Béo phì độ 1)`;
                }
                else {
                    data.item.newBMI=`Chiều cao:${data.item.height} - cân nặng: ${data.item.weight} -  ${data.item.newBMI} (Béo phì độ 2)`;
                }
                console.log(data.item);
                const document = await childrenService.update(props._id, data.item);
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
            const documnent = await childrenService.get(props._id);
            data.item = documnent.message;
            const dateObject = new Date(data.item.birthday);
                // Hiển thị ngày sinh dữ liệu
                data.item.birthday = dateObject.toISOString().substring(0, 10);
                console.log(data.item);
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
    <div class="modal fade" id="editChildrenModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title text-warning" id="exampleModalLabel">Chỉ số phát triển (BMI)</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" >
                    <form  class="container mt-1">
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Họ và tên:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputrole" v-model="data.item.name"  disabled/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Lớp:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputrole" v-model="data.item.classRoom.name" disabled />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Ngày sinh:</label>
                            <div class="col-sm-9">
                                <input type="date" class="form-control" id="inputrole" v-model="data.item.birthday" disabled/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">MBI cũ:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputrole" v-model="data.item.oldBMI" disabled />
                            </div>
                        </div>
                    </form>
                    <form @submit.prevent="save" class="container mt-1 col-12">
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Chiều cao (kg):</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" id="inputrole" v-model="data.item.height" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputrole" class="col-sm-3 col-form-label p-0">Cân nặng (cm):</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" id="inputrole" v-model="data.item.weight" />
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