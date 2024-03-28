<script>
import { reactive, ref, onMounted,computed,watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// service
import userService from "../../../service/user.service";
import classService from "../../../service/class.service";
import gradeService from "../../../service/grade.service";
import childrenService from "../../../service/children.service"
//js
import { formatDateTime } from "../../../assets/js/format.common"
import {deleted} from "../../../assets/js/alert.common"
//component
import Table from "../../../components/table/checked.table.vue";
import paginationVue from "../../../components/pagination/pagination.vue";
import Edit from "./MBI.vue"
export default {
    components: { Table,paginationVue,Edit },
    props: { _id: String },
    setup(props, {emit}) {
        const router = useRouter();
        const route = useRoute();
        const isModalOpen = ref(false);
        const activeEdit=ref(false);
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
            items: [{ name: "", birthday: "", gender: "",teacherName:"-" }],
            active: "",
            setPage: [],
            searchPage: [],
            currentPage: 1,
            totalPage: 1,
            sizePage: 1,
            length: 0,
            searchText: "",
            activeData:""
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
        const handleEdit = async (value) => {
            try {
                console.log('edit BBI',value);
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
        const handeleDelete = async (value) => {
            try {
                console.log('xóa');
                const isDelete= await deleted('Xóa trẻ','Bạn có muốn xóa trẻ này');
                console.log(isDelete);
                if(isDelete){
                    const document= await childrenService.delete(value);
                console.log(document); 
                }else{
                    console.log('k x');
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
        const refresh=async()=>{
            try {
                const document = await childrenService.getAllChildren(data.active);
                data.items = document.message;
                data.items=data.items.map((item)=>{
                    return{
                        ...item,
                        birthday:formatDateTime(item.birthday),
                        gender: item.gender ? 'Nữ' : 'Nam',
                        teacherName:  data.items[0] ? data.items[0].classRoom.User.name: '-'
                    }
                })
                console.log(data.items)
                // const teacherName= data.items[0] ? data.items[0].classRoom.User.name: '-';
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
            watch(()=>data.active,async(newValue,oldValue)=>{
                try {
                await refresh()
                } catch (error) {
                    
                }
            })
        })
        return {
            data,
            activeEdit,

            handleActive,
            handleAdd,
            handleEdit,
    
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
            :class="value.active == true ? 'btn-success' : ''" @click="handleActive(value._id)">Lớp {{ value.name}}</button>
            <h5 class="float-right pt-5">GVCN: {{data.items.length>0 ? data.items[0].teacherName : '-'}}</h5>
        <Table 
        :data="data.setPage" :name="'Children'" :fields="['Họ tên', 'Giới tính', 'Ngày sinh']"
            :titles="['name', 'gender', 'birthday']" 
            :action="true" 
            :actionList="[ 'edit', 'delete']" 
            :checked="true"
            @edit="handleEdit" 
            @delete="handeleDelete">
        </Table>
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
</template>

<style scoped>
.modal-content {
    width: 200%;
    margin-left: -40%;
}
</style>