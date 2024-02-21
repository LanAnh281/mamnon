<script>
import { reactive, onMounted } from "vue";
// service
import schoolService from "../../service/school.service";
export default {
  components: {},
  setup() {
    const data = reactive({ items: {} });
    onMounted(async () => {
      try {
        const document = await schoolService.getAll();

        data.items = document.message;
      } catch (error) {
        if (error.response) {
          console.log("Server-side errors", error.response.data);
        } else if (error.request) {
          console.log("Client-side errors", error.request);
        } else {
          console.log("Errors:", error.message);
        }
      }
    })
    return {
      data
    }
  }
}
</script>
<template>
  <div class="body ">
    <div id="carouselExampleFade" class="carousel slide carousel-fade " data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../../assets/image/241753796_100611019042258_5317607245526488899_n.jpg" class="d-block w-100"
            alt="...">
        </div>
        <div class="carousel-item">
          <img src="../../assets/image/292301365_175871391516220_3922383153984952461_n.jpg" class="d-block w-100"
            alt="...">
        </div>
        <div class="carousel-item">
          <img src="../../assets/image/292542366_162806212927398_6084405115164366378_n.jpg" class="d-block w-100"
            alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-target="#carouselExampleFade" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-target="#carouselExampleFade" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </button>
    </div>

    <!--  -->
    <div class="row content-homepage">
      <div class="logan col-12">
        <span class="material-symbols-outlined">
          potted_plant
        </span>
        <h2 class="text-light"> {{ data.items['logan'] }}
        </h2>
        <h6>{{ data.items['information'] }}</h6>
      </div>
      <!--  -->
      <div class="col-12 row classroom justify-content-center">
        <h2 class="col-12 text-center">chương trình học</h2>
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
    <!-- Hoạt động -->
    <div>
      <div class="row  actives">
        <h2 class="col-12">Hoạt động</h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RkpyFG8a7JmyLmGlzyKzwM9Lf64tKYJcVA&usqp=CAU"
          alt="" class="col-3 mb-5">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RkpyFG8a7JmyLmGlzyKzwM9Lf64tKYJcVA&usqp=CAU"
          alt="" class="col-3 mb-3">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RkpyFG8a7JmyLmGlzyKzwM9Lf64tKYJcVA&usqp=CAU"
          alt="" class="col-3 mb-5">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RkpyFG8a7JmyLmGlzyKzwM9Lf64tKYJcVA&usqp=CAU"
          alt="" class="col-3 mb-3">

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RkpyFG8a7JmyLmGlzyKzwM9Lf64tKYJcVA&usqp=CAU"
          alt="" class="col-3 mb-3">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RkpyFG8a7JmyLmGlzyKzwM9Lf64tKYJcVA&usqp=CAU"
          alt="" class="col-3 mb-5">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RkpyFG8a7JmyLmGlzyKzwM9Lf64tKYJcVA&usqp=CAU"
          alt="" class="col-3 mb-3">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RkpyFG8a7JmyLmGlzyKzwM9Lf64tKYJcVA&usqp=CAU"
          alt="" class="col-3 mb-5">
      </div>
    </div>
  </div>
</template>
<style>
.content-homepage,
.actives {
  background-color: #3c6ef5;
  padding: 10px 30px;
}

.logan {
  text-align: center;
}


.classroom h2 {
  color: #fff;
}

.logan h5 {
  font-size: 20px;
}

.logan h5,
.logan h6 {
  color: #ebe9e9;
  line-height: 1.8;

}

.logan .material-symbols-outlined,
.classroom h2 {
  font-size: 42px;
  text-transform: uppercase;
  padding: 30px 0px;
  color: #fff;
}

.classroom a {
  color: #fff;
  padding: 0;
  margin: 0;
}

.actives {
  background-color: #fff;
}

.actives h2 {
  padding: 30px 0px;
  text-transform: uppercase;
  text-align: center;
  color: #3c6ef5;

}</style>
