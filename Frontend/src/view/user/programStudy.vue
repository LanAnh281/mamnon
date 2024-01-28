<template>
    <div class="body">
        <div class="pt-3 px-4">
            <router-link :to="{ name: 'homepage' }">
                TRANG CHỦ >
            </router-link>
            <router-link :to="{ name: 'programStudy' }">
                CHƯƠNG TRÌNH HỌC
            </router-link>
        </div>
        <div class="col-12 row classroom justify-content-center">
            <h2 class="col-12 text-center text-primary">chương trình học</h2>
            <div class="col-3 classroom-item">
                <img src="../../assets/image/background.jpg" alt="lớp mầm" class="img-fluid">
                <h6>Tên lớp</h6>
                <p>Dành cho bé 3-4 tuổi</p>
                <router-link :to="{ name: 'detailStudy' }">Chi tiết</router-link>
            </div>
            <div class="col-3 classroom-item">
                <img src="../../assets/image/background.jpg" alt="lớp mầm" class="img-fluid">
                <h6>Tên lớp</h6>
                <p>Dành cho bé 3-4 tuổi</p>
                <router-link :to="{ name: 'detailStudy' }">Chi tiết</router-link>

            </div>
            <div class="col-3 classroom-item">
                <img src="../../assets/image/background.jpg" alt="lớp mầm" class="img-fluid">
                <h6>Tên lớp</h6>
                <p>Dành cho bé 3-4 tuổi</p>
                <router-link :to="{ name: 'detailStudy' }">Chi tiết</router-link>

            </div>
            <div class="col-3 classroom-item">
                <img src="../../assets/image/background.jpg" alt="lớp mầm" class="img-fluid">
                <h6>Tên lớp</h6>
                <p>Dành cho bé 3-4 tuổi</p>
                <router-link :to="{ name: 'detailStudy' }">Chi tiết</router-link>
            </div>
        </div>
    </div>
</template>