<script>
import { ref, onMounted, reactive, defineComponent } from "vue";
import _ from "lodash";
// services
import userService from "../../../service/user.service";
export default {
    setup() {
        const data = reactive({ item: { email: "" }, uploadFiles: [], files: [], uploadAvatar: [], fileAvatar: [] })
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
            'positionName'
        ]
        const save = async () => {
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
                formData.append('email', data.item['email']);
                const document = await userService.create(formData);
                console.log("DOC:", document)
                // _.forEach(formFields, (field) => {
                //     formData.append(field, data.item[field]);
                // });
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
        onMounted(() => {
            const uploadInput = document.getElementById('imageUpload');
            uploadInput.addEventListener('click', function () { console.log('up'); uploadFile(); })
            // console.log('hi', uploadInput);
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
    <div class="body">
        <div class="border rouned-circle">
            <img src="../../../assets/image/background.jpg" id="imageUpload" width="50px">
        </div>
        <form class="px-3" @submit.prevent="save" enctype="multipart/form-data" method="post">
            <h2 class="text-center">Thông tin giáo viên</h2>

            <!-- Image cccd-->
            <div class="form-group row">
                <label for="inputImage" class="col-sm-3 col-form-label p-0">Ảnh CCCD :</label>
                <div class="col-sm-9">
                    <input type="file" multiple @change="handleFileUpload($event)" class="form-control" id="inputImage" />

                </div>
                <div id="previewImages" class="container mt-2"></div>
            </div>
            <!-- Ảnh avartar -->
            <div class="form-group row">
                <label for="inputImage" class="col-sm-3 col-form-label p-0">Ảnh CCCD :</label>
                <div class="col-sm-9">
                    <input type="file" multiple @change="handleFileUploadAvatar($event)" class="form-control" />

                </div>
                <div id="previewImageAvatar" class="container mt-2"></div>
            </div>

            <!-- <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model="data.item.email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email
                    with anyone else.</small>
            </div> -->
            <!-- <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <div class="form-group">
                <label for="exampleFormControlFile1">Example file input</label>
                <input type="file" class="form-control-file" id="exampleFormControlFile1">
            </div> -->
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>