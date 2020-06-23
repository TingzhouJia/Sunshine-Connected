<template>
  <div class="pa-3">
    <h5>热门课程</h5>
    <v-row>
      <v-col md="2" v-for="item in courses" :key="item._id">
        <v-card :to="`/courses/${item._id}`" class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            src="item.cover"
          >
            <v-card-title>{{item.title}}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>Share</v-btn>

            <v-btn color="orange" text>Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    asyncData({$axios}){
        const data=await $axios.$get('/courses')
        return {
            courses:data.courses
        }
    }
}
</script>

<style>
</style>