<script>
import { reactive, onMounted } from 'vue';
import socket from "../../socket.js";
//
import {checkPhone,checkMail,checkString} from "../../assets/js/checkInput.common"
// service
import schoolService from '../../service/school.service';
import notificationService from '../../service/notification.service';
export default {
    setup() {
        const data = reactive({ 
            item: {name:"",phone:"",email:"",message:""}, 
            school: {},
            error: {
                name:"",
                phone: "",
                email: "",
                message:""
            },
            flag:false,
     });
     const formFields = ['name',
            'email',
            'phone',
            'message'
        ]
        const save = async () => {
            try {
                
                for (let key in data.error) {
                    if (key == "sex") continue;
                    if (data.item[key] == "") {
                        data.error[key] = "Chưa nhập thông tin";
                        data.flag = true;
                        console.log("key:", key, data.item[key]);
                    }
                }
                if (!data.flag) {
                console.log('data.item:', data.item);
                const document = await notificationService.create(data.item);
                console.log(document)
                socket.emit("createNoti", data.item);
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
        const refresh = async () => {
            try {
                const document = await schoolService.getAll()
                data.school = document.message;

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
            save,
            checkMail,
            checkPhone,checkString
        }
    }
}
</script>
<template>
    <div class="body">
        <div class="pt-3 px-4">
            <router-link :to="{ name: 'homepage' }">
                TRANG CHỦ >
            </router-link>
            <router-link :to="{ name: 'contact' }">
                LIÊN HỆ
            </router-link>
        </div>
        <div class="row p-3">
            <div class="col-8">
                <h3 class="my-3">Liên hệ qua biểu mẫu</h3>
                <p class="dash"></p>
                
                <form @submit.prevent="save" enctype="multipart/form-data" class="container mt-3" style="text-align: start">
                <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label p-0">Họ và tên <sup
                                class="text-danger">(*)</sup></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputName" v-model="data.item.name" 
                            @blur="() => {
                            if (checkString(data.item.name)) {
                            data.flag = true;
                            data.error.name = 'Họ và tên là chữ.';
                                }
                            }
                            " @input="() => {
                                data.flag = false;
                                data.error.name = '';
                            }
                            ">
                            <div v-if="data.error.name" class="invalid-error">
                            {{ data.error.name }}
                </div>
                       
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPhone" class="col-sm-2 col-form-label p-0">SĐT <sup
                                class="text-danger">(*)</sup></label>
                        <div class="col-sm-10">
                            <input type="tel" class="form-control" id="inputPhone" 
                            v-model="data.item.phone"  
                            @blur="() => {
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
                            <div v-if="data.error.phone" class="invalid-error">
                    {{ data.error.phone }}
                </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputroom" class="col-sm-2 col-form-label p-0">Email <sup
                                class="text-danger">(*)</sup></label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputroom" v-model="data.item.email" @blur="() => {
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
                            <div v-if="data.error.phone" class="invalid-error">
                    {{ data.error.phone }}
                </div>
                        
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputComment" class="col-sm-2 col-form-label p-0">Tin nhắn <sup
                                class="text-danger">(*)</sup>
                        </label>
                        <div class="col-sm-10">
                            <textarea type="text" class="form-control" id="inputContent" rows="8"
                                v-model="data.item.message" @blur="() => {
                            if (checkPhone(data.item.phone)) {
                            data.flag = true;
                            data.error.description = 'Tin nhắn.';
                                }
                            }
                            " @input="() => {
                                data.flag = false;
                                data.error.phone = '';
                            }
                            ">
                            <div v-if="data.error.phone" class="invalid-error">{{ data.error.phone }}</div>
                            </textarea>
                        </div>
                    </div>
                   
                    <div class="form-group row justify-content-around mb-0 ">
                        <button type="submit" class="btn bg-primary text-white col-sm-2 py-2">
                            Gửi
                        </button>
                    </div>

                </form>
                    
              
       
            </div>   
            <div class="col-4">
                <h3 class="my-3">Tư vấn & giải đáp</h3>
                <p class="dash"></p>
                <div class="row contact">
                    <img src="../../assets/image/logo1.png" alt="logo" class="col-3 img-fluid">
                    <div class="col-9">
                        <p>Tên trường: {{ data.school['name'] }}</p>
                        <p>SĐT: {{ data.school['phone'] }}</p>
                        <p>Email: {{ data.school['email'] }}</p>
                    </div>
                </div>

            </div>
        </div>
  </div>
</template>
<style scoped>
.contact {
    line-height: 1.8;
}
</style>