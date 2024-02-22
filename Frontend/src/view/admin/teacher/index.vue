<script>
import { reactive, ref, onMounted } from "vue";
import schoolService from "../../../service/school.service";
import userService from "../../../service/user.service";
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
        const data = reactive({
            items: [],
            activeData: '',
        })
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
                data.activeData = value;
                activeInfo.value = !activeDelete.value;
            } catch (error) {

            }
        }
        const handeleDelete = async (value) => {
            try {
                data.activeData = value;
                const document = await userService.delete(data.activeData);
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
                console.log('add');
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
                const document = await userService.getAll();
                data.items = document.message;
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
            activeInfo,
            activeEdit,
            activeDelete,
            // method
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
            <h2>Danh sách giáo viên</h2>
            <p class="mx-auto dash"></p>
            <router-link class="float-right mx-3 btn btn-success" :to="{ name: 'addTeacher' }">+
            </router-link>
        </div>
        <div>
            <Table :data="data.items" :name="'Teacher'" :fields="['Họ và tên', 'SĐT', 'Email']"
                :titles="['name', 'phone', 'email']" :action="true" :actionList="['info', 'edit', 'delete']" :checked="true"
                @info="handleInfo" @edit="handleEdit" @delete="handeleDelete">
            </Table>
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