<script>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// service
import userService from "../../../service/user.service";
import classService from "../../../service/class.service";
import gradeService from "../../../service/grade.service";
import childrenService from "../../../service/children.service"
//js
import { formatDateTime } from "../../../assets/js/format.common"
//component
import Table from "../../../components/table/checked.table.vue";

export default {
    components: { Table },
    props: { _id: String },
    setup(props, emit) {
        const router = useRouter();
        const route = useRoute();
        const isModalOpen = ref(false);
        const openModal = () => {
            isModalOpen.value = true;
            console.log("open modal info user");
        };
        const closeModal = () => {
            console.log("close modal info user");
            emit("closeModal");
        };

        const data = reactive({
            class: {

            },
            items: { name: "", birthday: "", gender: "" },
            active: ""
        });
        const handleActive = async (value) => {
            try {
                data.class = data.class.map((item) => {
                    return {
                        ...item,
                        active: false,
                    }
                });
                data.active = value;
                for (let i = 0; i < data.class.length; i++) {
                    if (data.class[i]._id == value) {
                        data.class[i].active = !data.class[i].active;
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
        }
        const handleEdit = async () => {
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
        }
        const handleInfo = async () => {
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
        }
        const handleAdd = async () => {
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
        }
        const handeleDelete = async () => {
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
        }
        onMounted(async () => {
            try {
                $("#infoTeacherModal").on("show.bs.modal", openModal); //lắng nghe mở modal
                $("#infoTeacherModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal

                const documentClass = await gradeService.get(route.query['_id']);
                data.class = documentClass.message.classRooms;
                data.class = data.class.map((item) => {
                    return {
                        ...item,
                        active: false,
                    }
                });
                data.class[0].active = true;
                data.active = data.class[0]._id;
                const document = await childrenService.get(data.active);
                data.items = document.message;
                console.log(document.message);
            } catch (error) {
                if (error.response) {
                    console.log("Server-side errors", error.response.data);
                } else if (error.request) {
                    console.log("Client-side errors", error.request);
                } else {
                    console.log("Errors:", error.message);
                }
            }
        })
        return {
            data,
            handleActive,
            handleAdd,
            handleEdit,
            handleInfo,
            handeleDelete,
        }
    }
}
</script>

<template>
    <div class="body">

        <h2 class="text-center mt-3">Danh sách trẻ</h2>
        <p class="mx-auto dash"></p>
        <button class="btn btn-success float-right mb-3 mr-3">+</button>
        <button class="btn  mx-2 my-3" v-for="(value, index) in data.class" :key="index"
            :class="value.active == true ? 'btn-success' : ''" @click="handleActive(value._id)">Lớp {{ value.name
            }}</button>

        <Table :data="data.items" :name="'Class'" :fields="['Họ tên', 'Giới tính', 'Ngày sinh']"
            :titles="['name', 'gender', 'birthday']" :action="true" :actionList="['info', 'edit', 'delete']" :checked="true"
            @info="handleInfo" @edit="handleEdit" @delete="handeleDelete">
        </Table>
    </div>
</template>

<style scoped>
.modal-content {
    width: 200%;
    margin-left: -40%;
}
</style>