<script>
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// service
import schoolService from "../../../service/school.service";
import gradeService from "../../../service/grade.service";

//component
import Add from "./add.vue";
import Info from "./info.vue";
import Edit from "./edit.vue";
import Table from "../../../components/table/checked.table.vue";
import paginationVue from "../../../components/pagination/pagination.vue";

//js
import { success } from "../../../assets/js/alert.common";
import {formatCurrency} from "../../../assets/js/format.common"
export default {
    components: { Add, Info, Edit, paginationVue, Table },
    setup() {
        const route = useRoute();
        const router = useRouter();
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
        });


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
                console.log('edit');
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

                    const price=item.Fees &&  item.Fees.sort((a,b)=>new Date(b.updatedAt) - new Date(a.updatedAt));
                    // console.log(price);
                    return {
                        ...item,
                        classNumber: item.classRooms.length,
                        money: price[0] ?  formatCurrency(price[0].money) : formatCurrency(0)
                    }
                });
                // console.log(data.items);
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
            <Table :data="data.setPage" :name="'Children'" :fields="['Tên loại lớp','Học phí', 'Mô tả', 'Số lớp']"
                :titles="['name','money' ,'description', 'classNumber']" :action="true" :actionList="['info', 'edit', 'delete']"
                :checked="true" @info="handleInfo" @edit="handleEdit" @delete="handeleDelete">
            </Table>
            <Add v-if="activeAdd" @add="refresh()"></Add>
            <Info :_id="data.activeData" v-if="activeInfo"></Info>
            <Edit :_id="data.activeData" v-if="activeEdit" @edit="refresh()"></Edit>
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