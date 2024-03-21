<script>
import { ref, onMounted, reactive, defineComponent } from "vue";
import _ from "lodash";
import axios from "axios";
import { useRoute, useRouter } from "vue-router"
//js
import { checkString,checkPhone,checkAddress,checkMail,checkIdentification } from "../../../assets/js/checkInput.common";
// services
import userService from "../../../service/user.service";
import gradeService from "../../../service/grade.service";
import classService from "../../../service/class.service";
import childrenService from "../../../service/children.service"
//component
import Select from "../../../components/select/dependent.select.vue";
export default {
    components: { Select },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const data = reactive({
            item: { name: "", birthday: "", gender: "", email: "", phone: "", address: "", positionName: "phụ huynh", identification: "", nameCertification: "", numberChildren: 0 },
            grades: [{ name: "" }],
            class:[{name:""}],
            gradeId:"",
            classChoose:"",
            error:{
                name:"",
                phone:"",
                address:"",
                email:""
            },
            flag:false
        });
        const children = reactive({ items: [] })
        const save = async () => {
            try {
                if(!data.flag){
                // tạo tài khoản cho phụ huynh
                const document= await userService.createParent(data.item);
                console.log('Tài khoản:',document);
                children.items[0].userId= document.message._id;
                // mã phụ huynh và mã lớp (nếu có) theo từng học sinh
                console.log("Thông tin:",data.item,children.items);
                for(let i=0;i<children.items.length;i++){
                    children.items[i].userId= document.message._id;
                    const documentChildren= await childrenService.create(children.items[i]);
                    console.log("DOC children:",documentChildren);
                    }
                }
                else{
                    console.log('Lỗi')
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

        const handleChildren = async () => {
            try {
                children.items = [];
                const documentGrade = await gradeService.getAll();
                data.grades = documentGrade.message;
                console.log(documentGrade.message);
                for (let i = 0; i < data.item.numberChildren; i++) {
                    children.items.push({ name: "", birthday: "", gender: "", relationship:"",classRoomId: "", grade:documentGrade.message });
                }
                console.log(children.items[0].grade);
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
        const handleGrade =async(index,e)=>{
            try {
                children.items[index].gradeId=e.target.value;
                const documentClass= await gradeService.getAllClass(e.target.value);
                children.items[index].class=documentClass.message
                // data.class= documentClass.message;
                // console.log(children.items);
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
        const handleClass= async(index,e)=>{
            try {
                children.items[index].classRoomId= e.target.value;
                console.log(e.target.value);
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
            console.log(route.query['_id']);
            const document= await userService.get(route.query['_id']);
            console.log(document);
            data.item=document.message;
            // Chuyển đổi thành đối tượng Date
            const dateObject = new Date(data.item.birthday);
                // Hiển thị ngày sinh dữ liệu
                data.item.birthday = dateObject.toISOString().substring(0, 10);
                children.items=document.message.children;
       
                const documentGrade = await gradeService.getAll();
                data.grades = documentGrade.message;
                console.log(documentGrade.message);
                children.items= children.items.map((item)=>{
                    const birthdayCHildren = new Date(item.birthday);
                // Hiển thị ngày sinh dữ liệu
                 
                    return{
                        ...item,
                        birthday:birthdayCHildren.toISOString().substring(0, 10)
                    }
                })
                const birthdayCHildren = new Date(data.item.birthday);
                // Hiển thị ngày sinh dữ liệu
                data.children = birthdayCHildren .toISOString().substring(0, 10);
                const documentClass= await gradeService.getAllClass(children.items);
                children.items[index].class=documentClass.message;
                console.log(children.items);
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
            handleChildren,
            handleGrade,
            handleClass,
            checkString,
            checkPhone,
            checkAddress,
            checkMail,
            checkIdentification
        }
    }
}
</script>
<template>
    <div class="body p-3">
        <form class="px-3 row" @submit.prevent="save" enctype="multipart/form-data" method="post">
            <h2 class="text-center col-11 text-warning">Chỉnh sửa Thông tin phụ huynh</h2>
            <button type="submit" class="btn btn-warning text-light mt-3">Lưu </button>

            <div class="col-6">
                <!-- Name -->
                <div class="form-group">
                    <label for="exampleInputName">Họ và tên: </label>
                    <input type="text" class="form-control" id="exampleInputName" v-model="data.item.name"
                    required
                    @blur="() => {
                        if (checkString(data.item.name)) {
                            data.flag = true;
                            data.error.name = 'Họ tên không gồm ký tự đặc biệt';
                        }
                    }
                        " @input="() => {
                            data.flag = false;
                            data.error.phone = '';
                        }
                        "
                    >
                    <div v-if="data.error.name" class="invalid-error">
                    {{ data.error.name }}
                </div>
                </div>
                <!-- Birthday -->
                <div class="form-group">
                    <label for="exampleInputBirthday">Ngày sinh: </label>
                    <input type="date" class="form-control" id="exampleInputBirthday" v-model="data.item.birthday">
                </div>
                <!-- gender -->
                <div class="form-group">
                    <label for="">Giới tính: </label>
                    <input type="radio" class="ml-3" id="femaleRadio" name="gender" 
                        :checked="data.item.gender === true"
                        v-model="data.item.gender">Nữ
                    <input type="radio" class="ml-3" id="maleRadio" name="gender" 
                        :checked="data.item.gender === false"
                        v-model="data.item.gender">Nam 
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
                    <input type="tel" class="form-control" id="exampleInputPhone" v-model="data.item.phone" @blur="() => {
                        if (checkPhone(data.item.phone)) {
                            data.flag = true;
                            data.error.phone = 'SĐT gồm có 10 số.';
                        }
                    }
                        " @input="() => {
                            data.flag = false;
                            data.error.phone = '';
                        }
                        ">
                </div>
                <div v-if="data.error.phone" class="invalid-error">
                    {{ data.error.phone }}
                </div>

            </div>
            <div class="col-12">
                <!-- <div class="form-group">
                    <label for="exampleInputPhone">Số lượng trẻ: </label>
                    <input type="number" class="form-control" id="exampleInputPhone" v-model="data.item.numberChildren"
                        @input="handleChildren">
                </div> -->
                <div v-for="(value, index) in children.items" :key="index">
                    <h6 class="text-primary">Thông tin trẻ thứ {{ index + 1 }}</h6>
                    <div class="form-group">
                        <label for="exampleInputPhone">Họ và tên trẻ: </label>
                        <input type="text" class="form-control" v-model="children.items[index].name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPhone">Ngày sinh: </label>
                        <input type="date" class="form-control" v-model="children.items[index].birthday">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputGender">Giới tính: </label>
                        <input type="radio" class="ml-3" id="exampleInputGender" :name="`genderChildren${index}`" value="0"
                            v-model="children.items[index].gender"  :checked="children.items[index].gender == true">Nữ
                        <input type="radio" class="ml-3" id="exampleInputGender" :name="`genderChildren${index}`" value="1"
                            v-model="children.items[index].gender"  :checked="children.items[index].gender == false">Nam
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPhone">Mối quan hệ với trẻ:  </label>
                        <input type="text" class="form-control" v-model="children.items[index].relationship">
                    </div>
                    <!-- Loại lớp -->
                    <div class="row ">
                        <div class="form-group col-6">
                            <label for="cars">Loại lớp :</label>
                            <select name="grade" id="grade" class="form-control"   @change="handleGrade(index, $event)">
                                <option value="Chọn loại lớp">--Chọn loại lớp-- </option>
                                <option v-for="(grade, index1) in data.grades" :key="index1" :value="grade._id"
                                :selected="grade._id===children.items[index].gradeId"
                                >
                                    {{ grade.name }}</option>
                            </select>
                        </div>
                    <!-- Lớp -->
                    <!-- {{ data.class }} -->
                    <div class="form-group col-6">
                        <label for="cars">Lớp :</label>
                        <select name="cars" id="cars" class="form-control"  @change="handleClass(index, $event)">
                            <option value="Chọn lớp">--Chọn lớp-- {{ children.items[index].classRoomId }}</option>
                            <option v-for="(cla, index1) in  children.items[index].class" :key="index1" :value="cla._id"
                            :selected="cla._id===children.items[index].classRoomId"
>
                                {{ cla.name }} </option>
                        </select>
                    </div>
                    </div>
                    
                    


                </div>

            </div>
        </form>
    </div>
</template>