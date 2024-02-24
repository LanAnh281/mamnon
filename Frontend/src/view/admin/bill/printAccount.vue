<script>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({ item: {} });
        onMounted(async () => {
            try {
                const dataPrint = route.params.dataToPrint;
                console.log('print', dataPrint.name, route.params.password);
                window.print();
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
        <div class="row">
            <div class="col-6">
                Thông tin liên hệ của trường
            </div>
            <div class="col-6"></div>
        </div>
        <h2>Thông tin tài khoản</h2>
        <div>

        </div>


    </div>
</template>
