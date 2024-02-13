<script>
import { reactive, onMounted, ref, onBeforeMount, defineComponent } from "vue";
import _ from "lodash";
//service
//js

// view
export default {
    components: {},
    props: { _id: { type: String, default: "" } },
    setup(props, { emit }) {
        const data = reactive({
            item: {


            },
            btnSubmit: "Lưu",

        });


        const save = async () => {
            try {
                console.log('save');
            } catch (error) {
                if (error.response) {
                    console.log("Server-side errors", error.response.data);
                } else if (error.request) {
                    console.log("Client-side errors", error.request);
                } else {
                    console.log("Errors:", error.message);
                }
            }
        };
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

        };


        onMounted(async () => {
            try {
                await refresh();
                $("#editUserModal").on("show.bs.modal", openModal); //lắng nghe mở modal
                $("#editUserModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal
            } catch (error) {
                if (error.response) {
                    console.log("Server-side errors", error.response.data);
                } else if (error.request) {
                    console.log("Client-side errors", error.request);
                } else {
                    console.log("Errors:", error.message);
                }
            }
        });
        return {
            data,
            save,

        };
    },
};
</script>
<template>
    <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title" id="exampleModalLabel">
                        Cập nhật
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mx-3">
                    <form class="row justify-content-around" @submit.prevent="save" enctype="multipart/form-data">
                        <!-- form 1 -->
                        <form class="col-6">
                            <!-- userName -->
                            <div class="form-group row">
                                <label for="inputUserName" class="col-sm-4 m-0 px-0 col-form-label">Họ và tên:</label>
                                <div class="col-sm-8 p-0 m-0">
                                    <input type="email" class="form-control" id="inputUserName" />
                                </div>
                            </div>
                        </form>



                        <div class="form-group mt-2 col-2 text-center">
                            <button type="submit" class="btn btn-login" :disabled="data.btnSubmit == 'Đang lưu'">
                                {{ data.btnSubmit }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal-content {
    width: 160%;
    margin-left: -16%;
}

.imagesDiv,
.imageAfter {
    position: relative;
    display: inline;
}

.delete-icon {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    opacity: 1;
    color: var(--red);
    background-color: #f6f1f1;

    border-radius: 50%;
    line-height: 1;
    text-align: center;
}

.delete-icon:hover {
    color: red;
    font-size: 1.1rem;
    border-radius: 50%;

    background-color: var(--gray);
}
</style>