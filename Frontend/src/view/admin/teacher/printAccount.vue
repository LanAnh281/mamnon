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
                window.print();
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
                <p><strong>Trường: {{ data.school['name'] }}</strong></p>
                <p><strong>SĐT: {{ data.school['phone'] }}</strong></p>
                <p><strong>Địa chỉ: {{ data.school['address'] }}</strong></p>
            </div>

        </div>
        <div>
            <h3 class="text-center">Thông tin tài khoản</h3>
            <p>Kính chào anh/chị <strong>{{ route.query['name'] }}</strong> ,</p>
            <p>Chúc mừng anh/chị đã trúng tuyển giáo viên công tác tại trường. Hiện tại Trường {{
                data.school['name'] }} thực hiện thông báo
                thông tin đăng nhập hệ thống quản lý mầm non, nhằm mục đích
                giúp giáo viên có thể xem được chương trình học, thực đơn,
                sức khỏe của trẻ. Sau đây là thông tin tài khoản của anh/chị
                {{ route.query['name'] }}:</p>
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
                nơi {{ data.school['logan'] }}. Chúc anh/chị sẽ có thời gian làm việc tuyệt vời tại trường.</em>
        </div>


    </div>
</template>
