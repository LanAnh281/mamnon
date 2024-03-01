<script>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// service
import schoolService from "../../../service/school.service";
import gradeService from "../../../service/grade.service";

//component
import Add from "./add.vue";
import Info from "./info.vue";
import Edit from "./edit.vue";
import Table from "../../../components/table/checked.table.vue";
//js
import { success } from "../../../assets/js/alert.common";
export default {
    components: { Add, Info, Edit, Table },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            items: [],
            activeData: '',
        });
        const activeAdd = ref(false);
        const activeInfo = ref(false);
        const activeEdit = ref(false);
        const activeDelete = ref(false);
        const update = async () => {
            try {
                const document = await schoolService.update(data.items["_id"], data.items);
                if (document['status'] == 'success') {
                    success("Thành công", 'Cập nhật thành công')
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
        const handleInfo = async (value) => {
            try {
                data.active = value;
                // activeInfo.value = !activeInfo.value;
                router.push({ name: 'infoClass', query: { _id: data.active } })
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
        const handleAdd = async (value) => {
            try {
                data.active = value;
                activeAdd.value = !activeAdd.value;
            } catch (error) {

            }
        }
        const handeleDelete = async (value) => {
            try {
                data.activeData = value;
                const document = await gradeService.delete(data.activeData);
                console.log('de:', document);
                await refresh();
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
        const handleEdit = async (value) => {
            try {
                data.activeData = value;
                activeEdit.value = !activeEdit.value;
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
        const add = async () => {
            try {
                console.log('add1');
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
        const refresh = async () => {
            try {
                const document = await gradeService.getAll();
                data.items = document.message.map((item) => {
                    return {
                        ...item,
                        classNumber: item.classRooms.length
                    }
                });

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
            activeAdd,
            activeInfo,
            activeEdit,
            activeDelete,
            // method
            refresh,
            handleInfo,
            handeleDelete,
            handleEdit,
            add
        }
    }
}
</script>
<template>
    <div class="body p-3">
        <div class="information">
            <h2>Danh sách lớp học</h2>
            <p class="mx-auto dash"></p>
            <button class="btn btn-success float-right mb-3" @click="activeAdd = !activeAdd" data-toggle="modal"
                data-target="#addGradeModal">+</button>
        </div>
        <div>
            <Table :data="data.items" :name="'Class'" :fields="['Tên loại lớp', 'Mô tả', 'Số lớp']"
                :titles="['name', 'description', 'classNumber']" :action="true" :actionList="['info', 'edit', 'delete']"
                :checked="true" @info="handleInfo" @edit="handleEdit" @delete="handeleDelete">
            </Table>
            <Add v-if="activeAdd" @add="refresh()"></Add>
            <Info :_id="data.activeData" v-if="activeInfo"></Info>
            <Edit :_id="data.activeData" v-if="activeEdit"></Edit>
        </div>
    </div>
</template>
<style scoped>
h2 {
    text-align: center;
}

.information input,
.information textarea {
    padding: 6px;
    background-color: var(--light);
    border: none;
    cursor: pointer;
    width: 80%;
}

.img-school {
    position: relative;
}

.delete-school-img {
    position: absolute;
    color: red;
    border-radius: 50%;
    background-color: #ccc;
    padding: 2px 8px;
    font-weight: 600;
    top: -8px;
    right: 0;
    cursor: pointer;
    display: none;
}

.img-school:hover .delete-school-img {
    display: block;

}
</style>