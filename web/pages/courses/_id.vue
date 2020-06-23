<template>
  <div>
      <h3>{{course.name}}</h3>
      <v-select v-model="currentIndex" :items="course.episodes.map((v,k)=>({text:v.name,value:k}))"></v-select>
      <video src=""></video>
  </div>
</template>

<script>
export default {
    asyncData({params,$axios}){
            const res=await $axios.$get(`/courses/${params.id}`,{params:{query:{populate:"episodes"}}})
            return {
                id:params.id,
                course:res
            }
            
    },
    data(){
        return {
            currentIndex:0
        }
    },
    computed:{
        episode(){

        }
    }
    
}
</script>

<style>

</style>