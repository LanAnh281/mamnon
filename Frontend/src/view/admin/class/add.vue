<script>
import { reactive, onMounted, ref, onBeforeMount } from "vue";
import _ from "lodash";

//component

import { successAd, warning } from "../../../assets/js/alert.common";
export default {
    components: {},
    setup(props, { emit }) {
        const data = reactive({
            item: [
                {
                    name: "",
                    price: "",
                    unit: "",
                },
            ],
        });
        const isModalOpen = ref(false);

        const openModal = () => {
            isModalOpen.value = true;
            console.log("open modal room");
        };
        const closeModal = () => {
            console.log("close modal room");

            emit("closeModal");
        };



        const save = async () => {
            try {

                data.item = [
                    {

                    },
                ];
                successAd("Thêm dịch vụ thành công");
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
        onBeforeMount(async () => {
            $("#addClassModal").on("show.bs.modal", openModal); //lắng nghe mở modal
            $("#addClassModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal
        });

        return {
            data,
            save,

        };
    },
};
</script>
<template>
    <div class="modal fade" id="addClassModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                    <div class="row justify-content-end mr-3">
                        <span class="material-symbols-outlined add-icon mr-2 p-1" @click="add">
                            add
                        </span>
                        <span class="material-symbols-outlined remove-icon p-1" @click="remove">
                            remove
                        </span>
                    </div>
                    <form @submit.prevent="handleCreate" class="container mt-3">
                        <!--Table  -->
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Tên dịch vụ</th>
                                    <th>Đơn giá</th>
                                    <th>Đơn vị tính</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="(value, index) in data.item" :key="index" :id="index">
                                    <th>
                                        <input type="text" class="p-1 w-100" v-model="value.name" style="border: none" />
                                    </th>
                                    <th>
                                        <input type="text" v-model="value.price" class="p-1 w-100" style="border: none" />
                                    </th>
                                    <th>
                                        <input type="text" class="p-1 w-100" v-model="value.unit" style="border: none" />
                                    </th>
                                    <th class="text-center">
                                        <span class="material-symbols-outlined text-danger" @click="handleDelete(index)">
                                            cancel
                                        </span>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
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
    width: 160%;
    margin-left: -16%;
}

.add-icon {
    color: rgb(124, 205, 3);
    border-radius: 50%;
    background-color: #fff;
}

.add-icon:hover {
    font-weight: 600;
    background-color: #f9f7f7;
}

.remove-icon {
    color: red;
    border-radius: 50%;
    background-color: #fff;
}

.remove-icon:hover {
    font-weight: 600;
    background-color: #f9f7f7;
}
</style>