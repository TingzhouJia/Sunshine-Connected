<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
.avue-upload_avatar {
  height: auto !important;
}
</style>
