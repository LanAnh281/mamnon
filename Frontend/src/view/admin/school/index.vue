<script>
import { ref, reactive, onMounted } from "vue";
import schoolService from "../../../service/school.service";

export default {
    components: {},
    setup() {
        const data = reactive({
            items: {},
        })
        const update = async () => {
            try {
                console.log('upda');
                // remove list
                //add list
            } catch (error) {

            }
        }
        const deleteImg = async () => {
            try {
                console.log('de');
            } catch (error) {

            }
        }
        onMounted(async () => {
            const document = await schoolService.getAll();
            data.items = document.message;
        })
        return {
            data, update, deleteImg
        }
    }
}
</script>
<template>
    <div class="body p-3">
        <div class="information">
            <h2 class="text-primary">Thông tin trường học</h2>
            <p class="mx-auto dash"></p>
            <div class="float-right mx-3 btn btn-success" @click="update">Lưu</div>
            <p> Tên trường:
                <input type="text" name="name" id="name" v-model="data.items['name']">
            </p>
            <p>SĐT:
                <input type="text" name="name" id="phone" v-model="data.items['phone']">
            </p>

            <p>Email:
                <input type="text" name="email" id="email" v-model="data.items['email']">
            </p>
            <p>Địa chỉ:
                <input type="text" name="address" id="adress" v-model="data.items['address']">

            </p>
            <p>Mã số thuế:
                <input type="text" name="TAXID" id="TAXID" v-model="data.items['TAXID']">
            </p>
        </div>
        <div>
            <h2 class="text-primary">Góc ảnh ...</h2>
            <p class="dash mx-auto"></p>
            <div class="float-right mx-3 btn btn-success" @click="update">+</div>

            <div class="row">
                <div class="col-4 img-school">
                    <img src=https://bcp.cdnchinhphu.vn/334894974524682240/2022/10/3/999999999-16647800140172071804579.jpg
                        alt="ảnh trường mầm non" class="d-block img-fluid ">
                    <span class="delete-school-img" @click="deleteImg">x</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
h2 {
    text-align: center;
}

.information input {
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