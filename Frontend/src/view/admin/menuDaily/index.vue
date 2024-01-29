<script>
import { ref, reactive, onMounted, onBeforeMount } from "vue";
// component
import Table from "../../../components/table/tablebasic.vue";
import Add from "./add.vue";
//service
import menuDailyService from "../../../service/menuDaily.service";
// js
import { formatDateTime } from "../../../assets/js/format.common"
export default {
    components: { Table, Add },
    setup() {
        const data = reactive({
            items: [],
        })
        const refresh = async () => {
            try {
                const document = await menuDailyService.getAll();
                data.items = document.message;
                data.items = data.items.map((item) => {
                    return {
                        ...item,
                        date: formatDateTime(item.date)
                    }
                })
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
            data
        }
    }
}
</script>
<template>
    <div class="body p-3">
        <div class="border rounded row justify-content-end">
            <button class="btn-success m-2" data-toggle="modal" data-target="#menuModal">
                <span class="material-symbols-outlined text-light">
                    add
                </span>
            </button>
            <Add></Add>
        </div>
        <h2 class="text-center">Thực đơn</h2>
        <p class="dash mx-auto"></p>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Ngày</th>
                    <th scope="col">Buổi</th>
                    <th scope="col">Món ăn</th>
                    <th scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, index) in data.items" :key="index">
                    <td> {{ value['date'] }} </td>
                    <td>{{ value['day'] }}</td>
                    <td>
                        <p v-for="(value1, index1) in data.items[index].food" :key="index1">- {{ value1['name'] }}</p>
                    </td>
                    <td>
                        <span class="material-symbols-outlined delete-icon">
                            close
                        </span>
                        <span class="material-symbols-outlined edit-icon">
                            edit
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped></style>