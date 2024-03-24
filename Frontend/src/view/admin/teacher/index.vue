<script>
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
//service
import schoolService from "../../../service/school.service";
import userService from "../../../service/user.service";
import classService from "../../../service/class.service";
//component
import Add from "./add.vue";
import Info from "./info.vue";
import Edit from "./edit.vue";
import Assigment from "./assigment.vue";
import Table from "../../../components/table/checked.table.vue";
import paginationVue from "../../../components/pagination/pagination.vue";
//js
import { success } from "../../../assets/js/alert.common";
export default {
    components: { Add, Info, Edit, Assigment, Table, paginationVue },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const data = reactive({
            items: [],
            activeData: '',
            setPage: [],
            searchPage: [],
            currentPage: 1,
            totalPage: 1,
            sizePage: 2,
            length: 0,
            searchText: ""
        })
        const activeInfo = ref(false);
        const activeEdit = ref(false);
        const activeDelete = ref(false);
        const activeAssignment = ref(false);

        data.totalPage = computed(() =>
            data.searchPage ? Math.ceil(data.searchPage.length / data.sizePage) : 0
        );
        data.searchPage = computed(
            () => (
                (data.currentPage = 1),
                data.items
                    ? data.items.filter((item) =>
                        item.name
                            .toLowerCase()
                            .includes(data.searchText.toLocaleLowerCase())
                    )
                    : []
            )
        );
        data.length = computed(() => data.searchPage.length);
        data.setPage = computed(() =>

            data.searchPage
                ? data.searchPage.slice(
                    (data.currentPage - 1) * data.sizePage,
                    data.currentPage * data.sizePage
                )
                : []

        );
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
        const handleDelete = async (value) => {
            try {
                data.activeData = value;
                // xóa giáo viên 
                const document = await userService.delete(data.activeData);
                // xóa giáo viên thì lớp GVCN sẽ được set null
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
                router.push({ name: 'editTeacher', query: { _id: data.activeData } });
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
        const handeleAssignment = async (value) => {
            try {
                console.log(value);
                data.activeData = value;
                activeAssignment.value = !activeAssignment.value;
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
                data.items = document.message.filter((item) => item.positionName == 'giáo viên');
                data.items = data.items.map((item) => {
                    return {
                        ...item,
                        checked: false
                    }
                }
                )
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
            activeAssignment,
            // method
            handleInfo,
            handleDelete,
            handleEdit,
            handeleAssignment,
            add,
        }
    }
}
</script>
<template>
    <div class="body p-3">
        <div class="my-2 mx-2 row justify-content-between">
            <input type="search" placeholder="tìm kiếm theo tên giáo viên" class="p-2 border rounded" style="
            background-color: var(--background);
            width: 33%;
            font-size: 0.9rem;
            height: 36px;
          " v-model="data.searchText" />
        </div>
        <div class="information">
            <h2>Danh sách giáo viên</h2>
            <p class="mx-auto dash"></p>
            <router-link class="float-right mx-3 btn btn-success mb-3" :to="{ name: 'addTeacher' }">+
            </router-link>
        </div>
        <div>

            <Table :data="data.setPage" :name="'Teacher'" :fields="['Họ và tên', 'SĐT', 'Email']"
                :titles="['name', 'phone', 'email']" :action="true" :actionList="['info', 'edit', 'delete', 'assignment']"
                :checked="true" @info="handleInfo" @edit="handleEdit" @delete="handleDelete"
                @assignment="handeleAssignment">
            </Table>
            <Info :_id="data.activeData" v-if="activeInfo" @closeModal="() => { activeInfo = !activeInfo }"></Info>
            <Assigment :_id="data.activeData" v-if="activeAssignment"
                @closeModal="() => { activeAssignment = !activeAssignment }">
            </Assigment>
            <!-- <Edit :_id="data.activeData" v-if="activeEdit"></Edit> -->

            <!-- pagination -->
            <paginationVue class="m-0 p-0 mt-1" :currentPage="data.currentPage" :totalPage="data.totalPage"
                :size="data.sizePage" :length="data.length" @page="(value) => (data.currentPage = value)" @previous="() => {
                    if (data.currentPage > 1) {
                        data.currentPage = data.currentPage - 1;
                    }
                }
                    " @next="() => {
        if (data.currentPage < data.totalPage) {
            data.currentPage = data.currentPage + 1;
        }
    }
        "></paginationVue>
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