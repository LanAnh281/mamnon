<script>
import { reactive, onMounted, ref } from "vue";
import _ from "lodash";
//service
import categoriesService from "../../../service/categories.service";
import foodListService from "../../../service/foodList.service";
export default {
    components: {},
    setup(props, { emit }) {
        const data = reactive({
            items: {},
            categories: [{ name: "" }],
            listFood: [],// danh sách món ăn đã chọn
        });
        const isModalOpen = ref(false);
        const isMorning = ref(false);
        const isLunch = ref(false);
        const isAfternoon = ref(false);
        const openModal = () => {
            isModalOpen.value = true;
            console.log("open modal role");
        };
        const closeModal = () => {
            console.log("close modal role");
            emit("closeModal");
        };
        const save = async () => {
            console.log("save");
            try {
                const checkList = data.listFood;
                console.log(checkList);

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
        const refresh = async () => {
            try {
                const document = await categoriesService.getAll();
                data.categories = document.message;
                console.log(data.categories);
                const foods = await foodListService.getAll();
                data.items = foods.message;
            } catch (error) {
                if (error.response) {
                    console.log("Server-side errors", error.response.data);
                } else if (error.request) {
                    console.log("Client-side errors", error.request);
                } else {
                    console.log("Errors:", error.message);
                }
            }
        }
        onMounted(async () => {
            try {
                await refresh();
                $("#menuModal").on("show.bs.modal", openModal); //lắng nghe mở modal
                $("#menuModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal

            } catch (error) {

            }
        });

        return {
            data,
            isMorning,
            isLunch,
            isAfternoon,
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
                <div class="modal-body row">
                    <div class="col-2">
                        <ul>
                            <li @click="isMorning = !isMorning">Sáng</li>
                            <li class="btn btn-success m-2"
                                @click="() => { isLunch = !isLunch; isMorning = false; isAfternoon = false; console.log(isMorning) }">
                                Chiều</li>
                            <li @click="isAfternoon = !isAfternoon">Xế</li>
                        </ul>
                    </div>
                    <form @submit.prevent="save" class="container mt-1 col">
                        <div class="form-group row justify-content-end mr-2">

                        </div>
                        <div class="form-group row">
                            <label for="inputDate" class="col-sm-2 col-form-label px-3">Ngày: </label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" id="inputDate" name="inputDate" />
                            </div>
                        </div>
                        <div>
                            <label for="inputDate" class="col-sm-2 col-form-label p-0">Buổi: </label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="inlineradio1" value="sáng">
                                <label class="form-check-label" for="inlineradio1">Sáng</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="inlineradio2" value="chiểu">
                                <label class="form-check-label" for="inlineradio2">Chiều</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="inlineradio3" value="xế">
                                <label class="form-check-label" for="inlineradio3">Xế</label>
                            </div>
                        </div>
                        <div class="row">
                            <label for="inputDate" class="col-sm-2 col-form-label p-0">Món ăn: </label>
                            <div class="form-check form-check-inline col-3" v-for="(value, index) in data.items"
                                :key="index">
                                <input class="form-check-input" type="checkbox" id="" :value="`${value._id}`"
                                    v-model="data.listFood">
                                <label class="form-check-label" for="">{{ value.name }}</label>
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
<style scoped>
.modal-content {
    width: 160%;
    left: -16%;
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