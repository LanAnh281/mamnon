<script>
import { reactive, onMounted,ref } from "vue";
// service
import userService from "../../../service/user.service";
//js
import { formatDateTime } from "../../../assets/js/format.common"
//component 
import Table from "../../../components/table/tablebasic.vue"
export default {
    components:{Table},
    props: { _id: String },
    setup(props, {emit}) {
        const data = reactive({ item: {} })
        const isModalOpen = ref(false);
        const openModal = () => {
            isModalOpen.value = true;
            console.log("open modal info user");
        };
        const closeModal = () => {
            console.log("close modal info user");
            emit("closeModal");
        };
        onMounted(async () => {
            try {
                $("#infoTeacherModal").on("show.bs.modal", openModal); //lắng nghe mở modal
                $("#infoTeacherModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal

                const document = await userService.getParent(props._id);
                data.item = document.message;

                // format date 
                data.item.birthday = formatDateTime(data.item.birthday);
                data.item.gender = data.item.gender === true ? 'Nữ' : 'Nam';
                data.item.children= data.item.children.map((value)=>{
                    return{
                        ...value,
                        gender:value.gender ? 'Nữ' :'Nam',
                        birthday:formatDateTime(value.birthday)
                    }
                })
                console.log('d', data.item)
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
            data
        }
    }
}
</script>

<template>
    <div class="modal fade" id="infoTeacherModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title" id="exampleModalLabel">Thông tin phụ huynh</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h3 class="text-center">Thông tin cá nhân </h3>
                        <form class="row">
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Họ và tên:</label>
                                    <p class="col-sm-9">{{ data.item.name }}</p>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Ngày sinh:</label>
                                    <p class="col-sm-9">{{ data.item.birthday }}</p>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Giới tính:</label>
                                    <p class="col-sm-9">{{ data.item.gender }}</p>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">SĐT:</label>
                                    <p class="col-sm-9">{{ data.item.phone }}</p>
                                </div>
                            </div>
                            
                           <div class="col-6">
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Số CCCD:</label>
                                    <p class="col-sm-9">{{ data.item.identification }}</p>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Địa chỉ:</label>
                                    <p class="col-sm-9">{{ data.item.address }}</p>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Email:</label>
                                    <p class="col-sm-9">{{ data.item.email }}</p>
                                </div>
                                
                           </div>
                        </form>
                        <Table
                        :data="data.item.children" :name="'Children'" 
                        :fields="['Họ và tên', 'Giới tính', 'Ngày sinh','Mối quan hệ']"
                        :titles="['name', 'gender','birthday','relationship']" :action="false" >

                        </Table>
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