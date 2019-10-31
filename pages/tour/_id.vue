<template>
  <b-row>
    <b-col cols="12">
      <h3 class="mb-4">Экскурсия</h3>
    </b-col>

    <b-col class="sidebar">
      <b-card class="card-border-blue mb-4" title="">
        <div class="text-center">

          <el-avatar :size="120" :src="tour.avatar" class="mb-2"></el-avatar>
          <p class="h6 mb-1 font-weight-bold">{{ tour.name }}</p>
          <p class="text-secondary"><small>Дата создания: {{ tour.created_at }}</small></p>

          <el-divider></el-divider>

          <el-select placeholder="Select" v-model="tour.active" size="small" class="w-100" @change="changeTourActiveStatus">
            <el-option label="Активен" :value="2"></el-option>
            <el-option label="На модерации" :value="1"></el-option>
          </el-select>

          <el-divider></el-divider>

          <div v-if="tour.user" class="d-flex align-items-center mb-2">
            <el-avatar :size="70" :src="tour.user.avatar" class="mb-2 mr-3" v-if="tour.user && tour.user.avatar"></el-avatar>
            <div class="mb-2 text-left">
              <p class="h6 mb-0 font-weight-bold" v-if="tour.user.name">{{ tour.user.name }}</p>
              <a :href="'mailto:' + tour.user.email" class="h6 mb-0 text-secondary" v-if="tour.user.email">{{ tour.user.email }}</a>
            </div>
          </div>
          <nuxt-link :to="{ name: 'guide-id', params: { id: tour.user.id } }" v-if="tour.user">
            <el-button type="primary" class="w-100" size="small">Перейти в профиль</el-button>
          </nuxt-link>

        </div>
      </b-card>

      <b-card class="card-border-blue mb-4">
        <p class="mb-3"><strong>Город:</strong>
          <span v-for="(city, index) in tour.tour_city">
            {{ city.name }}, {{ city.city_country.name }} {{ index < tour.tour_category.length - 1 ? '; ' : ''}}
          </span>
        </p>

        <p class="mb-3"><strong>Цена:</strong>
          <span v-for="(currency, index) in tour.tour_currency">
            {{ tour.price }} ({{ currency.name }}{{ index < tour.tour_category.length - 1 ? ', ' : ''}})
          </span>
        </p>

        <p class="mb-3"><strong>Категория туров:</strong>
          <span v-for="(category, index) in tour.tour_category">
            {{ category.name }}{{ index < tour.tour_category.length - 1 ? ', ' : ''}}
          </span>
        </p>

        <p class="mb-3"><strong>Языки:</strong>
          <span v-for="(language, index) in tour.tour_language">
            {{ language.name }}{{ index < tour.tour_language.length - 1 ? ', ' : ''}}
          </span>
        </p>

        <p class="mb-3"><strong>Категория людей:</strong>
          <span v-for="(people_category, index) in tour.tour_people_category">
            {{ people_category.name }}{{ index < tour.tour_people_category.length - 1 ? ', ' : ''}}
          </span>
        </p>

        <p class="mb-3"><strong>Длительность:</strong>
          <span v-for="(timing, index) in tour.tour_timing">
            {{ timing.name }}{{ index < tour.tour_timing.length - 1 ? ', ' : ''}}
          </span>
        </p>

        <p class="mb-3"><strong>Маршрут: </strong><span>{{ tour.tour_route }}</span></p>

        <p class="mb-3"><strong>Услуги: </strong><span>{{ tour.tour_services }}</span></p>

        <p class="mb-3"><strong>Дополнительно: </strong><span>{{ tour.tour_more }}</span></p>

        <p class="mb-3"><strong>Что взять: </strong><span>{{ tour.tour_other }}</span></p>

      </b-card>

    </b-col>

    <b-col>
      <b-card class="card-border-blue mb-4">
        <h5 class="mb-4">Описание</h5>
        {{ tour.about }}
        <el-alert v-if="!tour.about" title="Не заполнено" type="error" effect="dark"></el-alert>
      </b-card>

      <b-card class="card-border-blue mb-4" title="">
        <h5 class="mb-4">Фотографии:</h5>
        <b-row v-if="tour.tour_image && tour.tour_image.length">
          <b-col cols="6" lg="3" class="mb-4" v-for="(image, index) in tour.tour_image" :key="index">
            <a :href="image.image" target="_blank">
              <el-image :src="image.image_crop" lazy></el-image>
            </a>
          </b-col>
        </b-row>
      </b-card>

    </b-col>

  </b-row>
</template>

<script>
export default {
    layout: 'admin',

    middleware: ['auth'],

    data() {
        return {
            tour: [],
        }
    },

    methods: {
        getTourProfile() {
            this.$axios.get(`/tours/${this.$route.params.id}`).then(({ data }) => {
                console.log(data.data);
                this.tour = data.data;
            })
        },

        changeTourActiveStatus(val) {
            this.$axios.post(`/tours/${this.$route.params.id}`, { active: val }).then( ({ data }) => {
                this.tour.active = val;
                this.$notify( { title: 'Успешно', message: 'Статус экскурсии изменен', type: 'success' } );
            })
        }
    },

    mounted() {
        this.getTourProfile();
    }
}
</script>

<style scoped lang="sass">
.sidebar
  flex: 0 0 400px
</style>
