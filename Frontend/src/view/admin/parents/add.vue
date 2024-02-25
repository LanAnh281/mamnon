<script>
import { ref, onMounted, reactive, defineComponent } from "vue";
import _ from "lodash";
import axios from "axios";
import { useRoute, useRouter } from "vue-router"
// services
import userService from "../../../service/user.service";
import gradeService from "../../../service/grade.service";
//component
import Select from "../../../components/select/dependent.select.vue";
export default {
    components: { Select },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const data = reactive({
            item: { name: "", birthday: "", gender: "", email: "", phone: "", address: "", positionName: "giáo viên", identification: "", nameCertification: "", numberChildren: 0 },
            grades: [{ name: "" }]
        });
        const children = reactive({ items: [] })
        const save = async () => {
            try {
                console.log(children.items);
                // tạo tài khoản cho phụ huynh

                // mã phụ huynh và mã lớp (nếu có) theo từng học sinh

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

        const handleChildren = async () => {
            try {
                children.items = [];
                for (let i = 0; i < data.item.numberChildren; i++) {
                    children.items.push({ name: "", birthday: "", gender: "", classRoomId: "" })
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

        onMounted(async () => {
            try {
                const documentGrade = await gradeService.getAll();
                data.grades = documentGrade.message;
                console.log(documentGrade.message);
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
            data, children,
            save,
            handleChildren
        }
    }
}
</script>
<template>
    <div class="body p-3">

        <form class="px-3 row" @submit.prevent="save" enctype="multipart/form-data" method="post">
            <h2 class="text-center col-11">Thông tin phụ huynh</h2>
            <button type="submit" class="btn btn-success mt-3">Lưu </button>

            <div class="col-6">
                <!-- Name -->
                <div class="form-group">
                    <label for="exampleInputName">Họ và tên: </label>
                    <input type="text" class="form-control" id="exampleInputName" v-model="data.item.name">
                </div>
                <!-- Birthday -->
                <div class="form-group">
                    <label for="exampleInputBirthday">Ngày sinh: </label>
                    <input type="date" class="form-control" id="exampleInputBirthday" v-model="data.item.birthday">
                </div>
                <!-- gender -->
                <div class="form-group">
                    <label for="exampleInputGender">Giới tính: </label>
                    <input type="radio" class="ml-3" id="exampleInputGender" name="gender" value="0"
                        v-model="data.item.gender">Nam
                    <input type="radio" class="ml-3" id="exampleInputGender" name="gender" value="1"
                        v-model="data.item.gender">Nữ
                </div>
                <!-- identification -->
                <div class="form-group">
                    <label for="exampleInputIdentification">Số CCCD: </label>
                    <input type="text" class="form-control" id="exampleInputIdentification"
                        v-model="data.item.identification">
                </div>

            </div>
            <div class="col-6">
                <!-- address -->
                <div class="form-group">
                    <label for="exampleInputAddress">Địa chỉ: </label>
                    <textarea name="" cols="10" rows="3" id="exampleInputAddress" class="form-control"
                        v-model="data.item.address"></textarea>
                </div>
                <!-- email -->
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="data.item.email">
                </div>
                <!-- phone -->
                <div class="form-group">
                    <label for="exampleInputPhone">SĐT: </label>
                    <input type="tel" class="form-control" id="exampleInputPhone" v-model="data.item.phone">
                </div>

            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="exampleInputPhone">Số lượng trẻ: </label>
                    <input type="number" class="form-control" id="exampleInputPhone" v-model="data.item.numberChildren"
                        @input="handleChildren">
                </div>
                <div v-for="(value, index) in children.items" :key="index">
                    <h6 class="text-primary">Thông tin trẻ thứ {{ index + 1 }}</h6>
                    <div class="form-group">
                        <label for="exampleInputPhone">Tên trẻ: </label>
                        <input type="text" class="form-control" v-model="children.items[index].name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPhone">Ngày sinh: </label>
                        <input type="date" class="form-control" v-model="children.items[index].birthday">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputGender">Giới tính: </label>
                        <input type="radio" class="ml-3" id="exampleInputGender" name="gender" value="0"
                            v-model="data.item.gender">Nam
                        <input type="radio" class="ml-3" id="exampleInputGender" name="gender" value="1"
                            v-model="data.item.gender">Nữ
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPhone">Mối quan hệ với trẻ: </label>
                        <input type="text" class="form-control" v-model="children.items[index].relationship">
                    </div>
                    <!-- Loại lớp -->
                    <div class="form-group">
                        <label for="cars">Loại lớp :</label>
                        <select name="cars" id="cars" class="form-control">
                            <option value="Chọn loại lớp">--Chọn loại lớp--</option>
                            <option v-for="(grade, index) in data.grades" :key="index" :value="grade">
                                {{ grade.name }}</option>
                        </select>
                    </div>


                </div>

            </div>
        </form>
    </div>
</template>