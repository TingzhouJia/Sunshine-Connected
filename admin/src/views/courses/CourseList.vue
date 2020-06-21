<template>
  <div>
      
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class CourseList extends Vue{
    data={}
    async fetch(){
        const res=await this.$http.get('/courses')
        this.data=res.data
    }
    created(){
        this.fetch()
    }
}
</script>

<style>

</style>