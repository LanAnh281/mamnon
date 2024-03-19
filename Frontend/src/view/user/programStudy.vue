<script>
import {reactive,ref, onMounted} from "vue";
import gradeService from "../../service/grade.service"

export default{
    setup(){
        const data= reactive({
            item:{}
        })
        onMounted(async () => {
            try{
        //GRADE
        const documentGrade =await gradeService.getAll();
        data.grade=documentGrade.message;
      } catch (error) {
        if (error.response) {
          console.log("Server-side errors", error.response.data);
        } else if (error.request) {
          console.log("Client-side errors", error.request);
        } else {
          console.log("Errors:", error.message);
        }
      }})
        return{
            data
        }
    }
}
</script>
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
        <h2 class="col-12 text-center">chương trình học</h2>
    
        <div class="col-4 classroom-item" v-for="(value,index) in data.grade" :key="index">
          <img src="../../assets/image/lophoc.jpg" alt="lớp mầm" class="img-fluid" v-if="index%2==0">
          <img src="../../assets/image/lophoc2.jpeg" alt="lớp mầm" class="img-fluid" v-else>

          <h5 class=" py-2">{{ value.name }}</h5>
          <p class="">{{ value.description }}</p>
          <!-- <router-link :to="{ name: 'detailStudy' }">Chi tiết</router-link> -->
        </div>
      </div>
    </div>
</template>