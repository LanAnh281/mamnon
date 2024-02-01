<script>
import { reactive, onMounted } from "vue";
import schoolService from "../../../service/school.service";
//component
import Add from "./add.vue";
import Table from "../../../components/table/checked.table.vue";
//js
import { success } from "../../../assets/js/alert.common";
export default {
    components: { Add, Table },
    setup() {
        const data = reactive({
            items: [
                {
                    name: "a", phone: "a", email: "a", address: "a"
                },
                {
                    name: "b", phone: "a", email: "a", address: "a"
                }
            ],
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
            add, update
        }
    }
}
</script>
<template>
    <div class="body p-3">
        <div class="information">
            <h2>Danh sách giáo viên</h2>
            <p class="mx-auto dash"></p>
            <div class="float-right mx-3 btn btn-success" @click="update">Lưu</div>
        </div>
        <div>
            <Table :data="data.items" :name="'user'" :fields="['Họ và tên', 'SĐT', 'Email', 'Địa chỉ']"
                :titles="['name', 'phone', 'email', 'address']" :action="false" :checked="true"></Table>
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