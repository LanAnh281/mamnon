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
        <div class="post">
            <img src="" alt="logo" class="img-fluid mx-auto d-block">
            <h1>Trường mầm non ...</h1>
            <p>Nội dung giới thiệu trường</p>
            <img src="https://cdn.lawnet.vn/uploads/tintuc/2022/12/16/truong-mam-non.jpg" alt="ảnh trường mầm non"
                class="img-fluid mx-auto d-block">

        </div>
        <!--  -->
        <div class="logan col-12 pt-3 mt-2 bg-primary">

            <h5>Được thành lập từ 2008 với phương châm hoạt động
                “Ươm mầm tương lai”, trải qua gần 15 năm hình thành
                và phát triển, hệ thống trường mầm non Việt Đức
                đã không ngừng phát triển, khẳng định được chất lượng
                uy tín với quý phụ huynh cũng như vị trí xã hội về
                mặt giáo dục và đào tạo trẻ ở lứa tuổi mầm non.</h5>
            <h6>Đến với trường mầm non Việt Đức, các bé sẽ được đáp ứng đầy đủ các nhu cầu để bảo đảm sự phát triển tốt nhất
                về
                thể
                chất lẫn tinh thần.
            </h6>
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

.logan h5,
.logan h6 {
    color: #454545;
    line-height: 1.8;
}

.logan .material-symbols-outlined {
    font-size: 42px;
    text-transform: uppercase;
    padding: 30px 0px;
    color: #fff;
}
</style>