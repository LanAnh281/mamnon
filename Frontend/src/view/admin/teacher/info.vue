<script>
import { ref, reactive, onMounted } from "vue";
// service
import userService from "../../../service/user.service";
//js
import { formatDateTime } from "../../../assets/js/format.common"
export default {
    props: { _id: String },
    setup(props, { emit }) {
        const data = reactive({ item: { Account: { Permission: { name: "" } } }, });
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
                const document = await userService.get(props._id);
                data.item = document.message;

                // format date 
                data.item.birthday = formatDateTime(data.item.birthday);
                data.item.gender = data.item.gender === true ? 'Nữ' : 'Nam';
                // console.log('d', props._id, data.item)
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
                    <h5 class="modal-title title" id="exampleModalLabel">Thông tin giáo viên</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body row">
                    <h3 class="text-center col-12">Thông tin cá nhân </h3>
                    <div class="col-2 img-fluid">
                        <img :src="`http://localhost:3000/api/user/getImg/${data.item.image}`" alt="avatar"
                            class="img-fluid">
                    </div>
                    <div class="col-10">
                        <form>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Họ và tên:</label>
                                <p class="col-sm-10">{{ data.item.name }}</p>
                            </div>
                            <div class="form-group row">
                                <label for="staticPermission" class="col-sm-2 col-form-label">Vai trò:</label>
                                <p class="col-sm-10">{{ data.item.Account.Permission.name }}</p>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Ngày sinh:</label>
                                <p class="col-sm-10">{{ data.item.birthday }}</p>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Giới tính:</label>
                                <p class="col-sm-10">{{ data.item.gender }}</p>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Số CCCD:</label>
                                <p class="col-sm-10">{{ data.item.identification }}</p>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Địa chỉ:</label>
                                <p class="col-sm-10">{{ data.item.address }}</p>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
                                <p class="col-sm-10">{{ data.item.email }}</p>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">SĐT:</label>
                                <p class="col-sm-10">{{ data.item.phone }}</p>
                            </div>

                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Ảnh CCCD:</label>
                                <div class="col-sm-10 row">
                                    <img :src="`http://localhost:3000/api/user/getImg/${data.item.imagePrevious}`"
                                        alt="ảnh cccd" class="img-fluid col-6">
                                    <img :src="`http://localhost:3000/api/user/getImg/${data.item.imageAfter}`"
                                        alt="ảnh cccd" class="img-fluid col-6">
                                </div>


                            </div>
                        </form>
                    </div>
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