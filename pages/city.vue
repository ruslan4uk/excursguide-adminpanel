<template>
  <b-row>
    <b-col cols="12">
      <h3 class="mb-4">Города и страны</h3>
    </b-col>

    <b-col cols="12" md="4">
      <b-card class="card-border-blue" v-loading="loading">
        <h5>Страны</h5>
        <el-table
          height="75vh"
          :data="countries.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          @row-click="changeCountry">
          <el-table-column
            fixed
            label="Название"
            prop="name">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="Поиск"/>
            </template>
          </el-table-column>
        </el-table>

      </b-card>
    </b-col>

    <b-col cols="12" md="6">
      <nuxt-child :country="countryRow"></nuxt-child>
    </b-col>

  </b-row>
</template>

<script>
    export default {
        layout: 'admin',

        middleware: ['auth'],

        data() {
            return {
                search: '',
                countryRow: [],
                countries: [],
                loading: true,
            }
        },

        methods: {
            getCountry() {
                this.$axios.get('/geo/country').then( ({ data }) => {
                    this.countries = data.data;
                    this.loading = false;
                } )
            },

            changeCountry(row) {
                this.countryRow = row
            }
        },

        mounted() {
            this.getCountry();
        }
    }
</script>

<style scoped lang="sass">

</style>
