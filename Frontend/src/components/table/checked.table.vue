<script>
import { ref, reactive, onMounted } from "vue";
export default {
    components: {},
    props: {
        data: { type: Array, default: [] },
        fields: { type: Array, default: [] },
        titles: { type: Array, default: [] },
        action: { type: Boolean, default: false },
        actionList: { type: Array, default: [] },
        name: { type: String, default: "" },
        checked: { type: Boolean, default: false },

    },
    setup(props, emit) {

        onMounted(async () => {
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
        })
        return {};
    },
};
</script>
<template>
    <div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#
                        <!-- <input type="checkbox" v-model="data.checkedList"> -->
                    </th>
                    <th scope="col" v-for="(filed, index) in fields" :key="index">
                        {{ filed }}
                    </th>
                    <th scope="col" v-if="action">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, index) in data" :key="index">
                    <td>
                        <input type="checkbox" v-model="value.checked" />
                    </td>
                    <td v-for="(title, index1) in titles" :key="index1">
                        {{ value[title] }}
                    </td>
                    <td v-if="action" class="ml-2">
                        <span v-for="(value2, index2) in actionList" :key="index2"
                            class="material-symbols-outlined rounded-circle" :class="`${value2}-icon`" data-toggle="modal"
                            :data-target="`#${value2}${name}Modal`" style="display: inline"
                            @click="$emit(value2, value._id)">
                            {{ value2 }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
span {
    font-size: 24px;
}

.info-icon:hover {
    color: #00c1cf;
    text-shadow: 0 0 2px #00f0ff;
    transition: 0.5s;
}

.edit-icon:hover {
    color: #f8cb03;
    text-shadow: 0 0 2px #ffbb00;
    transition: 0.5s;
}

.cancel-icon:hover {
    color: #f80303;
    text-shadow: 0 0 2px #ff6200;
    transition: 0.5s;
}
</style>