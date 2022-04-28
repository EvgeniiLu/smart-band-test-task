<template>
  <div class="user" v-if="user">
    <div class="user-photo">
      <img :src="user.avatar" alt="УПС" />
    </div>
    <div class="user-name">Имя: {{ user.first_name }} {{ user.last_name }}</div>
    <div class="user-age">Возраст: {{ fullAge }}</div>
    <div class="user-employment">Должность: {{ user.employment }}</div>
  </div>
  <div class="beer" v-if="beer">
    <div class="beer-brand">Производитель: {{ beer.brand }}</div>
    <div class="beer-name">Название: {{ beer.name }}</div>
    <div class="beer-alcohol">Содержание алкоголя: {{ beer.alcohol }}</div>
  </div>
  <el-button type="primary" @click="clickFunc">Хочу другое пиво</el-button>
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

  mounted: async function () {
    const [userObj, beerObj] = await Promise.all([loadUser(), loadBeer()]);
    this.user = {
      avatar: userObj.avatar,
      first_name: userObj.first_name,
      last_name: userObj.last_name,
      fullAge: userObj.fullAge,
      employment: userObj.employment.title,
    };
    this.beer = {
      brand: beerObj.brand,
      name: beerObj.name,
      alcohol: beerObj.alcohol,
    };
  },

  computed: {
    fullAge() {
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

<style lang="scss">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
