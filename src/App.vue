<template>
  <div class="user" v-if="user">
    <div class="photo"></div>
    <div class="name">{{ user.first_name }}{{ user.last_name }}</div>
    <div class="age">{{ user.date_of_birth }}</div>
    <div class="employment">{{ user.employment.title }}</div>
  </div>
  <div class="beer" v-if="beer">
    <div class="brand">Производитель {{ beer.brand }}</div>
    <div class="beer-name">Название {{ beer.name }}</div>
    <div class="alcohol">Содержание алкоголя {{ beer.alcohol }}</div>
  </div>
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

  methods: {},
};
</script>

<style lang="scss"></style>
