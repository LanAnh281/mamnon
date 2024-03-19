<script>
import { ref, reactive, onMounted } from "vue";
import schoolService from "../../../service/school.service";
//component
import add from "./add.vue";
//js
import { success } from "../../../assets/js/alert.common";
import schoolMediaService from "../../../service/schoolMedia.service";
export default {
    components: { add },
    setup() {
        const data = reactive({
            items: {
                _id: "", name: "", phone: "", email: "", TAXID: "", address: "", clientId: "", secretId: "", logan: "", information: ""
            },
            isSchool: false,
            schoolMedia:[],
            removeImage:[]
        })
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
        const add = async () => {
            try {
                data.isSchool = !data.isSchool;

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
        const deleteImg = async (id) => {
            try {
                // data.removeImage.push(id);
                const schoolMediaElement = document.getElementById(id);
                if (schoolMediaElement) {
                    schoolMediaElement.remove();
                }
                console.log(schoolMediaElement);
                const documentDeleteMedia= await schoolMediaService.delete(id);
                console.log("doc:",documentDeleteMedia);
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
        const refresh =async()=>{
            try {
                const document = await schoolService.getAll();
                data.items = document.message;
                const documentMedia= await schoolMediaService.getAll();
                data.schoolMedia= documentMedia.message;
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
           await refresh();
        })
        return {           
            // data
            data,
            //method
            refresh,
            update, deleteImg, add,
        }
    }
}
</script>
<template>
    <div class="body p-3">
        <div class="information">
            <h2>Thông tin trường học</h2>
            <p class="mx-auto dash"></p>
            <div class="float-right mx-3 btn btn-success" @click="update">Lưu</div>

            <form action="" method="post" class=" row">
                <div class="col-6">
                    <div class="form-group row">
                        <label for="name" class="col-2">Trường: </label>
                        <input type="text" class="form-control col-10" id="name" name="name" v-model="data.items['name']">
                    </div>
                    <div class="form-group row">
                        <label for="phone" class="col-2">SĐT: </label>
                        <input type="tel" name="phone" id="phone" class="form-control col-10" v-model="data.items['phone']">
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-2">Email: </label>
                        <input type="email" name="email" id="email" class="form-control col-10"
                            v-model="data.items['email']">
                    </div>
                    <div class="form-group row">
                        <label for="address" class="col-2">Địa chỉ: </label>
                        <input type="text" name="address" id="address" v-model="data.items['address']"
                            class="form-control col-10">
                    </div>
                    <div class="form-group row">
                        <label for="TAXID" class="col-2">MST: </label>
                        <input type="text" name="TAXID" id="TAXID" v-model="data.items['TAXID']"
                            class="form-control col-10">
                    </div>
                    <div class="form-group row">
                        <label for="clientId" class="col-2">clientId: </label>
                        <input type="text" name="clientId" id="clientId" v-model="data.items['clientId']"
                            class="form-control col-10">
                    </div>
                    <div class="form-group row">
                        <label for="secretId" class="col-2">secretId: </label>
                        <input type="text" name="secretId" id="secretId" v-model="data.items['secretId']"
                            class="form-control col-10">
                    </div>
                    <div class="form-group row">
                        <label for="linkFB" class="col-2">Link Facebook: </label>
                        <input type="text" name="linkFB" id="linkFB" v-model="data.items['fb']" class="form-control col-10">
                    </div>
                </div>

                <div class="col-6">
                    <div class="form-group row">
                        <label for="logan" class="col-2">Logan: </label>
                        <textarea type="text" name="logan" id="logan" v-model="data.items['logan']"
                            class="form-control col-10"></textarea>
                    </div>
                    <div class="form-group row">
                        <label for="information" class="col-2">Thông tin: </label>
                        <textarea name="information" id="information" v-model="data.items['information']"
                            class="form-control col-10" rows="10"></textarea>
                    </div>
                </div>

            </form>

        </div>
        <div>
            <h2 class="text-primary">Góc ảnh trường {{ data.items['name'] }}</h2>
            <p class="dash mx-auto"></p>
            <!-- form -->
            <div class="float-right mx-3 btn btn-success" @click="add" data-toggle="modal" data-target="#schoolModal">
                +
            </div>
            <add v-if="data.isSchool" @closeModal="data.isSchool = !data.isSchool" :schoolId="data.items['_id']" @add="refresh()"></add>


            <div class="row">
                <div class="col-4 img-school" v-for="(value,index) in data.schoolMedia" :key="index" :id="`${value._id}`">
                    <!-- <img src=https://bcp.cdnchinhphu.vn/334894974524682240/2022/10/3/999999999-16647800140172071804579.jpg
                        alt="ảnh trường mầm non" class="d-block img-fluid ">
                    <span class="delete-school-img" @click="deleteImg">x</span> --> 
                    <img :src='`http://localhost:3000/static/images/${value.name}`'
                        alt="ảnh trường mầm non" class="d-block img-fluid ">
                    <span class="delete-school-img" @click="deleteImg(value._id)">x</span>
                </div>
            </div>
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