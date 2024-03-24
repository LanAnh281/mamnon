<script>
import { reactive, onMounted,ref,computed, onBeforeMount } from "vue";
// service
import userService from "../../../service/user.service";
import classService from "../../../service/class.service";
//js
import { formatDateTime } from "../../../assets/js/format.common"
//component 
import Table from "../../../components/table/checked.table.vue";
import paginationVue from "../../../components/pagination/pagination.vue";

export default {
    components:{Table,paginationVue},
    props: { _id: String },
    setup(props, {emit}) {
        const data = reactive({ items: {},
            setPage: [],
            searchPage: [],
            currentPage: 1,
            totalPage: 1,
            sizePage: 1,
            length: 0,
            searchText: ""
    });
    data.totalPage = computed(() =>
            data.searchPage ? Math.ceil(data.searchPage.length / data.sizePage) : 0
        );
        data.searchPage = computed(
            () => (
                (data.currentPage = 1),
                data.items.length>0
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
        const isModalOpen = ref(false);
        const openModal = () => {
            isModalOpen.value = true;
            console.log("open modal asignment teacher");
        };
        const closeModal = () => {
            console.log("close modal asignment teacher");
            emit("closeModal");
        };
        onMounted(async () => {
            try {
                $("#assignmentTeacherModal").on("show.bs.modal", openModal); //lắng nghe mở modal
                $("#assignmentTeacherModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal
                const document = await classService.getAll();
                data.items = document.message;
                data.items= data.items.map((item)=>{
                    return {
                        ...item,
                        checked: false,
                        count: item.children.length,
                        teacher: item.User == null ? '-' : item.User.name 
                    }
                })
                console.log(data.items);
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
        const save =async()=>{
            try {
                const listClass= data.items.filter((item)=>item.checked==true);
                console.log('save',listClass);

                for( let i =0;i<listClass.length;i++){
                    listClass[i].teacherId=props._id;
                    console.log("C",listClass[i]);

                    const document= await classService.update(listClass[i]._id,listClass[i]);
                    console.log(document);
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
        return {
            data,
            save
        }
    }
}
</script>

<template>
    <div class="modal fade" id="assignmentTeacherModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title" id="exampleModalLabel">Phân công giảng dạy</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="my-2 mx-2 row justify-content-between">
            <input type="search" placeholder="tìm kiếm theo tên lớp" class="p-2 border rounded" style="
            background-color: var(--background);
            width: 33%;
            font-size: 0.9rem;
            height: 36px;
          " v-model="data.searchText" />
        </div>
                    <h3 class="text-center">Danh sách lớp học  </h3>
                    <button class="btn btn-success float-right my-2" @click="save">Lưu</button>
                        <Table
                        :data="data.setPage" :name="'Children'" 
                        :fields="['Tên lớp', 'Số lượng học sinh', 'GVCN']"
                        :titles="['name', 'count','teacher']" :action="false" >
                        </Table>

                        <!-- pagination -->
                        <paginationVue class="m-0 p-0 mt-1" 
                        :currentPage="data.currentPage" 
                        :totalPage="data.totalPage"
                        :size="data.sizePage" 
                        :length="data.length"
                        @page="(value) => (data.currentPage = value)" 
                        @previous="() => {
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
        </div>
    </div>
</template>

<style scoped>
.modal-content {
    width: 200%;
    margin-left: -40%;

}
</style>