<script>
import { reactive, onMounted, ref } from "vue";
import _ from "lodash";
//service

export default {
    components: {},
    setup(props, { emit }) {
        const data = reactive({
            items: {},
            uploadFiles: [],
        });
        const isModalOpen = ref(false);
        const openModal = () => {
            isModalOpen.value = true;
            console.log("open modal role");
        };
        const closeModal = () => {
            console.log("close modal role");
            emit("closeModal");
        };

        const refresh = () => {
            data.items = {
                name: "",
            };

        };
        const add = () => {
            console.log("add");

        };
        const remove = () => {

            console.log("remove");
        };

        const handleFilUpload = async (event) => {
            try {
                const files = event.target.files;
                data.uploadFiles = [...data.uploadFiles, ...files];
                const previewImages = document.getElementById("previewImages");
                previewImages.innerHTML = "";
                const rowImages = document.createElement("div");
                rowImages.classList.add("row");
                for (const file of data.uploadFiles) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const colImage = document.createElement("div"); colImage.classList.add("col-6", "mt-2");
                        colImage.style.position = "relative";
                        colImage.id = file.name;
                        const img = document.createElement("img");
                        img.src = e.target.result;
                        img.style.maxWidth = "100%";
                        img.style.maxHeight = "100%";
                        img.style.objectFit = "contain";
                        colImage.append(img);
                        rowImages.append(colImage);
                        previewImages.append(rowImages);
                    }
                    reader.readAsDataURL(file);
                }
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
        const save = async () => {
            console.log("save");
            try {
                data.items["countFiles"] = data.uploadFiles.length;
                const formData = new FormData();
                if (data.items['countFiles'] > 0) {
                    _.forEach(data.uploadFiles, (file) => {
                        formData.append("files", file);
                    })
                    const document = await schoolMediaService.create(formData);
                    if (document['status'] == 'success') {
                        emit("add");
                    }
                }

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
            $("#schoolModal").on("show.bs.modal", openModal); //lắng nghe mở modal
            $("#schoolModal").on("hidden.bs.modal", closeModal); //lắng nghe đóng modal
        });

        return {
            data,
            save,
            add,
            remove,
            handleFilUpload
        };
    },
};
</script>
<template>
    <div class="modal fade" id="schoolModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title" id="exampleModalLabel">Thêm ảnh</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="save" class="container mt-1">
                        <div class="form-group row justify-content-end mr-2">
                        </div>
                        <div class="form-group row">
                            <!-- <label for="inputrole" class="col-sm-2 col-form-label p-0">Ảnh</label> -->
                            <div class="col-sm-12 img-school">
                                <input type="file" class="form-control" multiple @change="handleFilUpload($event)"
                                    id="inputImage" ref="files" />
                                <div id="previewImages" class="container mt-2"></div>
                            </div>
                        </div>

                        <div class="form-group row justify-content-around mb-0">
                            <button type="submit" class="btn btn-login col-sm-3">Thêm</button>
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

.img-school {
    height: 50vh;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.img-school input {
    border: none
}
</style>