<script>
import { reactive } from 'vue';

export default {
    setup() {
        const data = reactive({ item: {} });
        const save = async () => {
            try {

            } catch (error) {

            }
        }
        return {
            data,
            save
        }
    }
}
</script>
<template>
    <div class="body">
        <div class="row p-3">
            <div class="col-9">
                <h3>Liên hệ qua biểu mẫu</h3>
                <form @submit.prevent="save" enctype="multipart/form-data" class="container mt-3" style="text-align: start">
                    <div class="form-group row">
                        <label for="inputroom" class="col-sm-2 col-form-label p-0">Họ và tên <sup
                                class="text-danger">(*)</sup></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputroom" v-model="data.item.name" />

                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputroom" class="col-sm-2 col-form-label p-0">SĐT <sup
                                class="text-danger">(*)</sup></label>
                        <div class="col-sm-10">
                            <input type="tel" class="form-control" id="inputroom" v-model="data.item.phone" />

                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputroom" class="col-sm-2 col-form-label p-0">Email <sup
                                class="text-danger">(*)</sup></label>
                        <div class="col-sm-10">
                            <input type="tel" class="form-control" id="inputroom" v-model="data.item.email" />

                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputComment" class="col-sm-2 col-form-label p-0">Tin nhắn <sup
                                class="text-danger">(*)</sup></label>
                        <div class="col-sm-10">
                            <textarea type="text" class="form-control" id="inputContent" rows="8"
                                v-model="data.item.comment"></textarea>
                        </div>
                    </div>
                    <div class="form-group row justify-content-around mb-0">
                        <button type="submit" class="btn bg-primary text-white col-sm-3">
                            Gửi
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-3">
                <h3>Tư vấn & giải đáp</h3>
            </div>
        </div>
    </div>
</template>