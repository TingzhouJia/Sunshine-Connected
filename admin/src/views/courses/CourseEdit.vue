<template>
  <div>
      <h3>{{isNew?'创建':'编辑'}}课程</h3>
      <ele-form v-model="data" :fields="field"> 

      </ele-form>
      
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class CourseEdit extends Vue{
    @Prop(String) id!:string
    data={}
    field={
       name:{label:"课程名称",type:"input"},cover:{label:"课程封面图",type:"input"}
    }
    async send(){
        const res=await this.$http.get('/courses')
        this.data=res.data
    }
    async submit(data){
        const url=this.isNew?'/courses':`/courses/${this.id}`
        const method=this.isNew?'post':'put'
        await this.$http[method]('/courses',data)
        this.data={}
        this.$message.success('成功')
        this.$router.go(-1)
    }
    async fetch(){
        const res=await this.$http.get(`/courses/${this.id}`)
        this.data=res.data
    }    

    get isNew(){
        return !this.id
    }
    created(){
          !this.isNew&&this.fetch()
    }
}
</script>

<style>

</style>