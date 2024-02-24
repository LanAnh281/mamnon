<script>
import { ref, onMounted, reactive, defineComponent } from "vue";
import _ from "lodash";
import axios from "axios";
import { useRoute, useRouter } from "vue-router"
// services
import userService from "../../../service/user.service";
//component
import Select from "../../../components/select/dependent.select.vue";
export default {
    components: { Select },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const data = reactive({
            item: { name: "", birthday: "", gender: "", email: "", phone: "", address: "", positionName: "giáo viên", identification: "", nameCertification: "" },
            uploadFiles: [], files: [], uploadAvatar: [], fileAvatar: [],
            city: []
        })
        const uploadInput = document.getElementById('imageUpload');
        // uploadInput.addEventListener('click', function () { console.log('up'); })
        const uploadFile = async () => {
            try {
                console.log('up');
                // const uploadInput = document.getElementById('imageUpload');
                // uploadFile.addEventListener('click', function () {
                const uploadInput = document.createElement('input');
                uploadInput.type = 'file';
                uploadInput.accept = 'image/*';
                uploadInput.style.display = 'none'; // Ẩn thẻ input mặc định

                // Lắng nghe sự kiện khi người dùng chọn tệp
                uploadInput.addEventListener('change', function () {
                    const file = this.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function () {
                            // Xử lý hình ảnh ở đây (ví dụ: hiển thị trên trang web)
                            const uploadedImg = document.createElement('img');
                            uploadedImg.src = reader.result;
                            document.body.appendChild(uploadedImg);
                        };
                        reader.readAsDataURL(file);
                    }
                });

                // Thêm thẻ input vào body của trang web
                document.body.appendChild(uploadInput);

                uploadInput.click();



                // })
            } catch (error) {

            }
        }
        const formFields = ['name',
            'birthday',
            'gender',
            'identification',
            'address',
            'email',
            'phone',
            'positionName', 'nameCertification'
        ]
        const save = async () => {
            // router.push({
            //     name: "printAccount", params: {
            //         dataToPrint: document // Thay yourData bằng dữ liệu cần truyền
            //     }
            // });            
            try {
                const formData = new FormData();
                // avatar
                data.uploadAvatar.push({ name: "" });
                console.log("AV", data.uploadAvatar);

                _.forEach(data.uploadAvatar, (file) => {
                    formData.append("avatar", file);

                });
                //cccd

                _.forEach(data.uploadFiles, (file) => {
                    formData.append("files", file);
                });
                _.forEach(formFields, (field) => {
                    formData.append(field, data.item[field]);
                });
                const document = await userService.create(formData);
                console.log("DOC:", document, document.message['password'])
                if (document['status'] == 'success') {
                    // window.location.href = 'printAccount';
                    router.push({
                        name: "printAccount", params: {
                            dataToPrint: document.message, password: document.message['password'] // Thay yourData bằng dữ liệu cần truyền
                        }
                    });
                }
            } catch (error) {
                console.log("E:", error)
            }
        }
        const handleFileUpload = async (event) => {
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
            ];
            const files = event.target.files;
            data.uploadFiles = [...data.uploadFiles, ...files];
            data.files = [
                ...data.files,
                ..._.map(data.uploadFiles, (file) => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                })),
            ];
            const previewImages = document.getElementById("previewImages");
            previewImages.innerHTML = "";
            const rowImages = document.createElement("div");
            rowImages.classList.add("row");

            for (const file of data.uploadFiles) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const colImage = document.createElement("div");
                    colImage.classList.add("col-6", "mt-2");
                    colImage.style.position = "relative";
                    colImage.id = file.name;
                    if (allowedTypes.includes(file.type)) {
                        const img = document.createElement("img");
                        img.src = e.target.result;
                        img.style.maxWidth = "100%";
                        img.style.maxHeight = "100%";
                        img.style.objectFit = "containt";
                        colImage.append(img);
                    }

                    const deleteIcon = document.createElement("span");
                    deleteIcon.textContent = "x";
                    deleteIcon.style.cssText = `
                            position:absolute;
                            top:-16px;
                            right:10px;
                            width:24px;
                            height:24px;
                            font-weight:400;
                            font-size:1.2rem;
                            color:red;
                            background-color:rgba(240, 227, 227,0.5);
                            text-align:center;
                            line-height:1;                 
                    `;
                    deleteIcon.classList.add("rounded-circle");
                    deleteIcon.addEventListener("mouseenter", () => {
                        deleteIcon.style.cssText = `
                                position:absolute;
                                top:-16px;
                                right:10px;
                                width:24px;
                                height:24px;
                                font-weight:600;
                                font-size:1.2rem;
                                color:red;
                                background-color:rgb(240, 227, 227);
                                text-align:center;
                                line-height:1;                 
                        `;
                    });
                    deleteIcon.addEventListener("mouseleave", function () {
                        deleteIcon.style.cssText = `
                            position:absolute;
                            top:-16px;
                            right:10px;
                            width:24px;
                            height:24px;
                            font-weight:400;
                            font-size:1.2rem;
                            color:red;
                            background-color:rgba(240, 227, 227,0.5);
                            text-align:center;
                            line-height:1;                 
                        `;
                    });
                    deleteIcon.addEventListener("click", () => {
                        data.uploadFiles = data.uploadFiles.filter((item) => item != file);
                        const colRemove = document.getElementById(file.name);
                        colRemove.remove();
                    });

                    const br = document.createElement("br");

                    colImage.append(deleteIcon);
                    colImage.append(br);
                    const span = document.createElement("span");
                    colImage.append(span);
                    rowImages.append(colImage);
                    previewImages.append(rowImages);
                };

                reader.readAsDataURL(file);
            }
        };
        const handleFileUploadAvatar = async (event) => {
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
            ];
            const files = event.target.files;
            data.uploadAvatar = [...data.uploadAvatar, ...files];
            data.fileAvatar = [
                ...data.fileAvatar,
                ..._.map(data.uploadAvatar, (file) => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                })),
            ];
            const previewImages = document.getElementById("previewImageAvatar");
            previewImages.innerHTML = "";
            const rowImages = document.createElement("div");
            rowImages.classList.add("row");

            for (const file of data.uploadAvatar) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const colImage = document.createElement("div");
                    colImage.classList.add("col-6", "mt-2");
                    colImage.style.position = "relative";
                    colImage.id = file.name;
                    if (allowedTypes.includes(file.type)) {
                        const img = document.createElement("img");
                        img.src = e.target.result;
                        img.style.maxWidth = "100%";
                        img.style.maxHeight = "100%";
                        img.style.objectFit = "containt";
                        colImage.append(img);
                    }

                    const deleteIcon = document.createElement("span");
                    deleteIcon.textContent = "x";
                    deleteIcon.style.cssText = `
                            position:absolute;
                            top:-16px;
                            right:10px;
                            width:24px;
                            height:24px;
                            font-weight:400;
                            font-size:1.2rem;
                            color:red;
                            background-color:rgba(240, 227, 227,0.5);
                            text-align:center;
                            line-height:1;                 
                    `;
                    deleteIcon.classList.add("rounded-circle");
                    deleteIcon.addEventListener("mouseenter", () => {
                        deleteIcon.style.cssText = `
                                position:absolute;
                                top:-16px;
                                right:10px;
                                width:24px;
                                height:24px;
                                font-weight:600;
                                font-size:1.2rem;
                                color:red;
                                background-color:rgb(240, 227, 227);
                                text-align:center;
                                line-height:1;                 
                        `;
                    });
                    deleteIcon.addEventListener("mouseleave", function () {
                        deleteIcon.style.cssText = `
                            position:absolute;
                            top:-16px;
                            right:10px;
                            width:24px;
                            height:24px;
                            font-weight:400;
                            font-size:1.2rem;
                            color:red;
                            background-color:rgba(240, 227, 227,0.5);
                            text-align:center;
                            line-height:1;                 
                        `;
                    });
                    deleteIcon.addEventListener("click", () => {
                        data.uploadAvatar = data.uploadAvatar.filter((item) => item != file);
                        const colRemove = document.getElementById(file.name);
                        colRemove.remove();
                    });

                    const br = document.createElement("br");

                    colImage.append(deleteIcon);
                    colImage.append(br);
                    const span = document.createElement("span");
                    colImage.append(span);
                    rowImages.append(colImage);
                    previewImages.append(rowImages);
                };

                reader.readAsDataURL(file);
            }
        };

        onMounted(async () => {
            try {
            } catch (error) {

            }
        })
        return {
            data,
            uploadFile,
            handleFileUpload,
            handleFileUploadAvatar,
            save
        }
    }
}
</script>
<template>
    <div class="body p-3">

        <form class="px-3 row" @submit.prevent="save" enctype="multipart/form-data" method="post">
            <h2 class="text-center col-11">Thông tin giáo viên</h2>
            <button type="submit" class="btn btn-success mt-3">Thêm </button>

            <div class="col-6">
                <!-- Name -->
                <div class="form-group">
                    <label for="exampleInputName">Họ và tên: </label>
                    <input type="text" class="form-control" id="exampleInputName" v-model="data.item.name">
                </div>
                <!-- Birthday -->
                <div class="form-group">
                    <label for="exampleInputBirthday">Ngày sinh: </label>
                    <input type="date" class="form-control" id="exampleInputBirthday" v-model="data.item.birthday">
                </div>
                <!-- gender -->
                <div class="form-group">
                    <label for="exampleInputGender">Giới tính: </label>
                    <input type="radio" class="ml-3" id="exampleInputGender" name="gender" value="0"
                        v-model="data.item.gender">Nam
                    <input type="radio" class="ml-3" id="exampleInputGender" name="gender" value="1"
                        v-model="data.item.gender">Nữ
                </div>
                <!-- identification -->
                <div class="form-group">
                    <label for="exampleInputIdentification">Số CCCD: </label>
                    <input type="text" class="form-control" id="exampleInputIdentification"
                        v-model="data.item.identification">
                </div>
            </div>
            <div class="col-6">
                <!-- address -->
                <div class="form-group">
                    <label for="exampleInputAddress">Địa chỉ: </label>
                    <textarea name="" cols="10" rows="3" id="exampleInputAddress" class="form-control"
                        v-model="data.item.address"></textarea>
                </div>
                <!-- email -->
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="data.item.email">
                </div>
                <!-- phone -->
                <div class="form-group">
                    <label for="exampleInputPhone">SĐT: </label>
                    <input type="tel" class="form-control" id="exampleInputPhone" v-model="data.item.phone">
                </div>
            </div>


            <!-- Vai trò
            <div class="form-group">
                <label for="exampleInputBirthday">Vai trò: </label>
                <input type="radio" class="form-control" id="exampleInputGender" name="positionName" value="giáo viên">Giáo
                viên
                <input type="radio" class="form-control" id="exampleInputGender" name="positionName" value="phụ huynh">Phụ
                huynh
            </div> -->

            <!-- IMG -->
            <!-- Image cccd-->
            <div class="form-group  col-12">
                <label for="inputImage">Ảnh CCCD: </label>
                <input type="file" multiple @change="handleFileUpload($event)" class="form-control" id="inputImage" />
                <div id="previewImages" class="container mt-2"></div>
            </div>
            <!-- Ảnh avartar -->
            <div class="form-group  col-12">
                <label for="inputImage">Ảnh chân dung: </label>
                <input type="file" multiple @change="handleFileUploadAvatar($event)" class="form-control" />
                <div id="previewImageAvatar" class="container mt-2"></div>
            </div>
            <!-- Ảnh bằng cấp
            <div class="form-group  col-12">
                <label for="inputImage">Ảnh chứng chỉ: </label>
                <input type="file" multiple @change="handleFileUploadAvatar($event)" class="form-control" />
                <div id="previewImageAvatar" class="container mt-2"></div>
            </div> -->
            <div class="form-group  col-12">
                <label for="name">Chứng chỉ: </label>
                <input type="text" class="form-control" v-model="data.item.nameCertification" />
            </div>
        </form>
    </div>
</template>