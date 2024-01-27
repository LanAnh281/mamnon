<script>
import { ref, reactive } from "vue";
export default {
    components: {},
    props: {
        data: { type: Array, default: [] },
        fields: { type: Array, default: [] },
        titles: { type: Array, default: [] },
        action: { type: Boolean, default: false },
        actionList: { type: Array, default: [] },
        name: { type: String, default: "" },
        currentPage: "",
        sizePage: "",
    },
    setup(props, emit) {
        return {};
    },
};
</script>
<template>
    <div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" v-for="(filed, index) in fields" :key="index">
                        {{ filed }}
                    </th>
                    <th scope="col" v-if="action"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, index) in data" :key="index">
                    <!-- <th scope="row">{{ (currentPage - 1) * sizePage + index + 1 }}</th> -->

                    <td v-for="(title, index1) in titles" :key="index1" style="">
                        {{ value[title] }}
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