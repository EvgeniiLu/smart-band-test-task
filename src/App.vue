<template>
  <div class="container">
    <div class="user">
      <div class="user-img">
        <el-skeleton style="width: 300px" :loading="loadingImg" animated>
          <template #template>
            <el-skeleton-item
              variant="image"
              style="width: 300px; height: 300px"
            />
          </template>
          <template #default>
            <div class="user-photo">
              <img :src="image.url" alt="УПС" />
            </div>
          </template>
        </el-skeleton>
      </div>
      <div class="user-info">
        <el-skeleton style="width: 300px" :loading="loading" animated>
          <template #template>
            <div style="padding: 14px">
              <el-skeleton-item variant="h3" />
              <el-skeleton-item variant="h3" style="margin-top: 10px" />
              <el-skeleton-item variant="h3" style="margin-top: 10px" />
            </div>
          </template>
          <template #default>
            <div class="user-name">
              Имя: {{ user.first_name }} {{ user.last_name }}
            </div>
            <div class="user-age">Возраст: {{ fullAge }}</div>
            <div class="user-employment">Должность: {{ user.employment }}</div>
          </template>
        </el-skeleton>
      </div>
    </div>
    <div class="beer">
      <el-skeleton style="width: 50%" :loading="loading" animated>
        <template #template>
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" />
            <el-skeleton-item variant="h3" style="margin-top: 10px" />
            <el-skeleton-item variant="h3" style="margin-top: 10px" />
          </div>
        </template>
        <template #default>
          <div class="beer-brand">Производитель: {{ beer.brand }}</div>
          <div class="beer-name">Название: {{ beer.name }}</div>
          <div class="beer-alcohol">
            Содержание алкоголя: {{ beer.alcohol }}
          </div>
        </template>
      </el-skeleton>
      <el-button type="primary" @click="clickFunc">Хочу другое пиво</el-button>
    </div>
  </div>
</template>
<script>
import { loadUser } from "./api.js";
import { loadBeer } from "./api.js";
import { loadImage } from "./api.js";
import { ref } from "vue";

export default {
  name: "App",

  data() {
    return {
      user: null,
      beer: null,
      image: null,

      loading: ref(true),
      loadingImg: ref(true),
    };
  },

  mounted: async function () {
    const [userObj, beerObj] = await Promise.all([loadUser(), loadBeer()]);
    this.user = {
      first_name: userObj.first_name,
      last_name: userObj.last_name,
      fullAge: userObj.date_of_birth,
      employment: userObj.employment.title,
    };
    this.beer = {
      brand: beerObj.brand,
      name: beerObj.name,
      alcohol: beerObj.alcohol,
    };
    this.loading = false;

    this.image = await loadImage(userObj.avatar);
    if (this.image) this.loadingImg = false;
  },

  computed: {
    fullAge() {
      let dateBirth = new Date(this.user.fullAge);
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
