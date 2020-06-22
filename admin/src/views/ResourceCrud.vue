<template>
  <div>
      <avue-crud v-if="option.column" :data="data.data" :option="option"
        @row-save="save" @row-del="remove" @row-update="update" 
      >
      </avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class ResourceCrud extends Vue {
    @Prop(String) resource:string
    option={}
    data={}
     async fetch(){
        const res=await this.$http.get(`/${this.resource}`)
        this.data=res.data
    } 
     async fetchOption(){
        const res=await this.$http.get(`/${this.resource}/option`)
        this.option=res.data
    } 
    async create(row,down,loading){
        await this.$http.post(`/${this.resource}`,row)
        this.$message.success('成功')
        this.fetch()
        down()
    }   
    async update(row,index,down,loading){
        const data=JSON.parse(JSON.stringify(row))
        delete data.$index
        await this.$http.put(`/${this.resource}/${row._id}`,row)
        this.$message.success('更新成功')
        this.fetch()
        down()
    }

    async remove(row){
         try{
            await this.$confirm('是否删除')
           
        }catch(e){
            return
        }
         await this.$http.delete(`/${this.resource}/${row._id}`)
        this.$message.success('删除成功')
        this.fetch()
    }
}
</script>

<style>

</style>