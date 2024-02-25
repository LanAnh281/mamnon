<script>
import { reactive, ref, onMounted, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//service
import schoolService from "../../../service/school.service";
import userService from '../../../service/user.service';
export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({ item: {}, school: { name: "", address: "", phone: "", } });
        onMounted(async () => {
            try {
                const documentSchool = await schoolService.getAll();
                data.school = documentSchool.message;

                const dataPrint = route.query.dataToPrint;
                console.log('print', route.query['name'], route.query['phone'], route.query['password']);
                // window.print();
            } catch (error) {

            }
        })
        return {
            data,
            route
        }
    }
}

</script>

<template>
    <div class="body px-3 py-3">
        <div class="row ">
            <div class="col-6">
                <p>Trường: {{ data.school['name'] }}</p>
                <p>SĐT: {{ data.school['phone'] }}</p>
                <p>Địa chỉ: {{ data.school['address'] }}</p>
            </div>

        </div>
        <div>
            <h3 class="text-center">Thông tin tài khoản</h3>
            <p>Kính chào khách hàng {{ route.query['name'] }} ,</p>
            <p>Hiện tại <strong>Trường {{ data.school['name'] }}</strong> thực hiện thông báo
                thông tin đăng nhập hệ thống quản lý mầm non, nhằm mục đích
                giúp phụ huynh có thể theo dõi được chương trình học, thực đơn,
                sức khỏe của trẻ. Sau đây là thông tin tài khoản của anh/chị
                {{ route.query['name'] }}</p>
            <div class="row">
                <label for="" class="col-2">Tên tài khoản:</label>
                <strong class="col">{{ route.query['phone'] }}</strong>
            </div>
            <div class="row">
                <label for="" class="col-2">Mật khẩu:</label>
                <strong class="col"> {{ route.query.password }}</strong>
            </div>
            <em>Cảm ơn anh/chị <strong>{{ route.query['name'] }} </strong> đã lựa chọn trường <strong>{{ data.school['name']
            }} </strong> là
                nơi {{ data.school['logan'] }}.</em>
        </div>


    </div>
</template>
