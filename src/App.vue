<template>
  <div class="container">
    <div class="app">
      <div class="user">
        <div class="user-img">
          <el-skeleton style="width: 300px" :loading="loadingImg" animated>
            <template #template>
              <el-skeleton-item
                variant="circle"
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
              <div>
                <el-skeleton-item
                  variant="h1"
                  style="width: 300px; margin-top: 25px"
                />
                <el-skeleton-item
                  variant="h1"
                  style="width: 300px; margin-top: 25px"
                />
                <el-skeleton-item
                  variant="h1"
                  style="width: 300px; margin-top: 25px"
                />
              </div>
            </template>
            <template #default>
              <div class="user-name">
                <span>Имя:</span> {{ user.first_name }} {{ user.last_name }}
              </div>
              <div class="user-age"><span>Возраст:</span> {{ fullAge }}</div>
              <div class="user-employment">
                <span>Должность:</span> {{ user.employment }}
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>

      <div class="beer">
        <el-skeleton :loading="loading" animated>
          <template #template>
            <div style="padding: 30px">
              <el-skeleton-item variant="h1" />
              <el-skeleton-item variant="h1" style="margin-top: 25px" />
              <el-skeleton-item variant="h1" style="margin-top: 25px" />
              <el-skeleton-item variant="h1" style="margin-top: 25px" />
            </div>
          </template>
          <template #default>
            <h2>
              <p>{{ user.first_name }} {{ user.last_name }} будет пить</p>
              <p>{{ beer.name }}</p>
            </h2>
            <div class="beer-brand">Производитель: {{ beer.brand }}</div>
            <div class="beer-name">Название: {{ beer.name }}</div>
            <div class="beer-alcohol">
              Содержание алкоголя: {{ beer.alcohol }}
            </div>
          </template>
        </el-skeleton>
        <el-button class="btn" type="success" @click="clickFunc"
          >Хочу другое пиво</el-button
        >
      </div>
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

<style lang="scss">
body {
  margin: 0;
  font-size: 16px;
  color: #6c7279;
  background-color: #fff;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

p {
  margin: 0;
}

.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.app {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(214, 214, 214);
  border-radius: 50px;
  padding: 30px;

  @media (max-width: 740px) {
    flex-direction: column;
    height: auto;
    .user {
      width: 100%;
      font-size: 14px;
    }
    .beer {
      width: 100%;
      font-size: 14px;
      h2 {
        font-size: 16px;
      }
    }
  }
}
%paramsinfo {
  margin: 15px 15px;
  padding: 15px;
  background: rgb(180, 214, 85);
  border-radius: 25px;
}
%params_block_intro_app {
  width: 50%;
  height: 80%;
  min-width: 330px;
  display: flex;
  flex-direction: column;
  background: #a1cdff;
  border-radius: 25px;
  margin: 15px 15px;
}
.user {
  @extend %params_block_intro_app;
  justify-content: flex-start;
  align-items: center;
  span {
    font-weight: 600;
  }

  .user-img {
    margin-top: 50px;
    width: 300px;
    height: 300px;
    background: rgb(240, 131, 131);
    border-radius: 50%;
    overflow: hidden;
  }

  .user-info {
    padding: 20px 0;
    .user-name {
      @extend %paramsinfo;
    }
    .user-age {
      @extend %paramsinfo;
    }
    .user-employment {
      @extend %paramsinfo;
    }
  }
}

.beer {
  @extend %params_block_intro_app;
  justify-content: center;

  h2 {
    background: rgb(240, 131, 131);
    border-radius: 50px;
    margin: 15px 15px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    position: relative;
    padding: 0 15px;
  }
  .beer-brand {
    @extend %paramsinfo;
  }
  .beer-name {
    @extend %paramsinfo;
  }
  .beer-alcohol {
    @extend %paramsinfo;
  }
  .btn {
    margin: 15px auto;
  }
}
</style>
