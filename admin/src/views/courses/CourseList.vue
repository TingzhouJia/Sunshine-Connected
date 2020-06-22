<template>
  <div>
      <h3>课程列表</h3>
      <el-table :data="data.data" border stripe>
          <el-table-column v-for="(field,name) in fields"
              :prop="name"
              :key="name"
              :label="field.label"
              :width="col.width">
              <el-table-column
              label="操作" width="200"
              >
                <template v-slot="scope">
                    <el-button type="success" size="small" @click="$router.push(`/courses/edit/${scope.row._id}`)">编辑</el-button>
                     <el-button type="warning" size="small" @click="remove(scope.row._id)">删除</el-button>
                </template>

              </el-table-column>
          </el-table-column>
      </el-table>
      
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class CourseList extends Vue{
    data={}
    field={
        _id:{label:'ID'},name:{label:"课程名称"},cover:{label:"课程封面图"}
    }
    async fetch(){
        const res=await this.$http.get('/courses')
        this.data=res.data
    }
    async remove(id){
        try{
            await this.$confirm('是否删除')
           
        }catch(e){
            return
        }
         await this.$http.delete(`/course/${id}`)
        this.$message.success('删除成功')
        this.fetch()
        
    }
    created(){
      this.fetch()
    }
}
</script>

<style>

</style>