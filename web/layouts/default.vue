<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" :to="item.link" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
        <v-list>
          <v-list-item v-for="item in items2" :key="item.text" link>
            <v-list-item-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt />
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
       
        <v-list-item class="mt-4" v-if="$store.state.auth.user" link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-user</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1" >{{$store.state.auth.user.username}}</v-list-item-title>
        </v-list-item>
         <v-list-item v-else class="mt-4" link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1" @click="isShowLoginForm=true">登陆</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon class="mx-4" large>mdi-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Youtube</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row align="center;" style="max-width: 650px;">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        ></v-text-field>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        <nuxt-child />
      </v-container>
    </v-main>
    <v-bottom-sheet v-model="isShowLoginForm" inset>
     <v-form class="pa-4" @submit.prevent="login">
       <v-text-field label="用户名" v-model="loginModel.username"></v-text-field>
        <v-text-field label="密码" type="password"  v-model="loginModel.username"></v-text-field>
        <v-btn color="success" type="submit">登陆</v-btn>
     </v-form>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
export default {
  isshowLoginForm:false,
  loginModel:{},
  props: {
    source: String,
  },
  methods:{
    async login(){
      await this.$auth.loginWith('login',{
        data:this.loginModel
      })
    }
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: 'mdi-trending-up', text: 'Most Popular', link: '/courses' },
      {
        icon: 'mdi-youtube-subscription',
        text: 'Subscriptions',
        link: '/comments',
      },
      {
        icon: 'mdi-youtube-subscription',
        text: 'Subscriptions',
        link: '/comments',
      },
    ],
    items2: [
      { picture: 28, text: 'Joseph' },
      { picture: 38, text: 'Apple' },
      { picture: 48, text: 'Xbox Ahoy' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' },
    ],
  }),
  created() {
    this.$vuetify.theme.dark = true
  },
}
</script>
