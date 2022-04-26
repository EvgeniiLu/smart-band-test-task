<template>
  <div class="user" v-if="user">
    <div class="user-photo">
      <img :src="user.avatar" />
    </div>
    <div class="user-name">{{ user.first_name }}{{ user.last_name }}</div>
    <div class="user-age">{{ user.date_of_birth }}</div>
    <div class="user-employment">{{ user.employment.title }}</div>
  </div>
  <div class="beer" v-if="beer">
    <div class="beer-brand">Производитель {{ beer.brand }}</div>
    <div class="beer-name">Название {{ beer.name }}</div>
    <div class="beer-alcohol">Содержание алкоголя {{ beer.alcohol }}</div>
  </div>

  <button @click="clickFunc">Клик</button>
</template>

<script>
import { loadUser } from "./api.js";
import { loadBeer } from "./api.js";

export default {
  name: "App",

  data() {
    return {
      user: null,
      beer: null,
    };
  },

  created: async function () {
    this.user = await loadUser();
    this.fullAgeUser();
    this.beer = await loadBeer();
  },

  methods: {
    async clickFunc() {
      this.beer = await loadBeer();
    },

    fullAgeUser() {
      let date = new Date();
      console.log(date);
      console.log(this.user.date_of_birth);
    },
  },
};
</script>

<style lang="scss"></style>
