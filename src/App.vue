<template>
  <div class="user" v-if="user">
    <div class="user-photo">
      <img :src="user.avatar" />
    </div>
    <div class="user-name">{{ user.first_name }}{{ user.last_name }}</div>
    <div class="user-age">{{ fullAgeUser }}</div>
    <div class="user-employment">{{ user.employment.title }}</div>
  </div>
  <div class="beer" v-if="beer">
    <div class="beer-brand">Производитель: {{ beer.brand }}</div>
    <div class="beer-name">Название: {{ beer.name }}</div>
    <div class="beer-alcohol">Содержание алкоголя: {{ beer.alcohol }}</div>
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
    this.beer = await loadBeer();
  },
  computed: {
    fullAgeUser() {
      let dateBirth = new Date(this.user.date_of_birth);
      let date = new Date();
      return Math.floor((date - dateBirth) / (60 * 60 * 24 * 365 * 1000));
    },
  },
  methods: {
    async clickFunc() {
      this.beer = await loadBeer();
    },
  },
};
</script>

<style lang="scss"></style>
