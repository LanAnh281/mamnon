<script>
import { reactive, onMounted } from "vue";
import schoolService from "../../service/school.service";
import schoolMediaService from "../../service/schoolMedia.service";

export default {
    components: {},
    setup() {
        const data = reactive({
            items: {
            },
            schoolMedia:[],
        })
        onMounted(async () => {
            try {
                const document = await schoolService.getAll();
                data.items = document.message;
                //
                const documentSchoolMedia= await schoolMediaService.getAll();
                data.schoolMedia= documentSchoolMedia.message;
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
    <div class="body">
        <div class="pt-3 px-4">
            <router-link :to="{ name: 'homepage' }">
                TRANG CHỦ >
            </router-link>
            <router-link :to="{ name: 'introduce' }">
                GIỚI THIỆU
            </router-link>
        </div>
        <!--  -->
        <div class="logan col-12 py-4">
            <img src="../../assets/image/logo1.png" alt="logo" class="img-fluid mx-auto d-block ">
            <h2 class="text-primary">{{ data.items['logan'] }}</h2>
        </div>
        <div class="post col-12">
            <h1 class="">Trường mầm non {{ data.items['name'] }}</h1>
            <p>{{ data.items['information'] }}</p>
            <img :src="`http://localhost:3000/static/images/${data.schoolMedia[0].name}`" alt="ảnh trường mầm non"
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