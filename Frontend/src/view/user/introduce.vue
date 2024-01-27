<script>
import { reactive, onMounted } from "vue";
import schoolService from "../../service/school.service";
export default {
    components: {},
    setup() {
        const data = reactive({
            items: {

            }
        })
        onMounted(async () => {
            try {
                const document = await schoolService.getAll();
                data.items = document.message;
            } catch (error) {

            }
        })
        return {
            data
        }
    }
}
</script>

<template>
    <div class="body ">
        <div class="pt-3 px-4">
            <router-link :to="{ name: 'homepage' }">
                TRANG CHỦ >
            </router-link>
            <router-link :to="{ name: 'introduce' }">
                GIỚI THIỆU
            </router-link>
        </div>
        <!--  -->
        <div class="logan col-12 py-4 bg-primary">
            <img src="" alt="logo" class="img-fluid mx-auto d-block">
            <h2>{{ data.items['logan'] }}</h2>
        </div>
        <div class="post">
            <h1>Trường mầm non ...</h1>
            <p>{{ data.items['information'] }}</p>
            <img src="https://cdn.lawnet.vn/uploads/tintuc/2022/12/16/truong-mam-non.jpg" alt="ảnh trường mầm non"
                class="img-fluid mx-auto d-block">

        </div>

    </div>
</template>
<style>
.post {
    padding: 10px 30px;
}

.logan {
    text-align: center;
}

.logan h2 {
    text-transform: uppercase;
    font-size: 48px;
    color: antiquewhite
}

.logan .material-symbols-outlined {
    font-size: 42px;
    text-transform: uppercase;
    padding: 30px 0px;
    color: #fff;
}
</style>