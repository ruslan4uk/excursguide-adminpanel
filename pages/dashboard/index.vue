<template>
  <b-row>
    <b-col cols="12">
      <h3 class="mb-4">Dashboard</h3>
    </b-col>

    <b-col cols="12" md="3">
      <b-card class="card-border-blue text-center">
        <h5 class="mb-2">Гиды</h5>
        <div class="dashboard__number">{{ dashboard.guide_count }}</div>
      </b-card>
    </b-col>

    <b-col cols="12" md="3">
      <b-card class="card-border-blue text-center">
        <h5 class="mb-2">Туристы</h5>
        <div class="dashboard__number">{{ dashboard.tourist_count }}</div>
      </b-card>
    </b-col>

    <b-col cols="12" md="3">
      <b-card class="card-border-blue text-center">
        <h5 class="mb-2">Туры</h5>
        <div class="dashboard__number">{{ dashboard.tour_count }}</div>
      </b-card>
    </b-col>

    <b-col cols="12" md="3">
      <b-card class="card-border-blue text-center">
        <h5 class="mb-2">Комментарии</h5>
        <div class="dashboard__number">{{ dashboard.comment_count }}</div>
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
            dashboard: {},
        }
    },

    methods: {
        getDashboard() {
            this.$axios.get('/dashboard').then(({ data }) => {
                this.dashboard = data.data
            })
        }
    },

    mounted() {
        this.getDashboard();
    }
}
</script>

<style scoped lang="sass">
.dashboard
  &__number
    font-size: 2.5rem
    font-weight: 700
    line-height: 1
</style>
