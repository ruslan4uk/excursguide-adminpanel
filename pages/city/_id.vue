<template>
  <b-row v-if="country.name">
    <b-col cols="12">
      <b-card class="card-border-blue" v-loading="loading">
        <div class="d-flex">
          <h5>{{ country.name }} > Города:</h5>
          <el-button size="mini" class="ml-3" @click="handleAdd">Добавить город</el-button>
        </div>

        <el-table
          height="75vh"
          :data="cities.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            fixed
            label="Название"
            prop="name">

          </el-table-column>

          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Поиск"/>
            </template>

            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Изменить</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
            </template>
          </el-table-column>
        </el-table>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
    props: ['country'],

    data() {
        return {
            search: '',
            cities: [],
            loading: true,
        }
    },

    methods: {
        getCities() {
            if(this.country.length < 1) return;

            this.$axios.get(`/geo/city/${this.country.iso_code}`).then( ({ data }) => {
                this.cities = data.data;
                this.loading = false;
            } )
        },

        handleAdd() {
            this.$prompt('', 'Введите название города', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            }).then(({ value }) => {
                this.$axios.post(`/geo/city/${this.country.iso_code}`, { name: value }).then(({ data }) => {
                     this.cities.push(data.data);
                     this.$notify( { title: 'Успешно', message: 'Город успешно добавлен', type: 'success' } );
                });
            }).catch(() => {});
        },

        handleEdit(index, row) {
            this.$prompt('', 'Введите название города', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                inputValue: row.name,
            }).then(({ value }) => {
                this.$axios.post(`/geo/city/${this.country.iso_code}`, { name: value, id: row.id }).then(({ data }) => {
                    this.cities[index].name = data.data.name;
                    this.$notify( { title: 'Успешно', message: 'Город успешно добавлен', type: 'success' } );
                });
            }).catch(() => {});
        },

        handleDelete(index, row) {
            this.$confirm(`Вы уверены что хотите удалить город: ${row.name}`, 'Внимание!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.delete(`/geo/city/${row.id}`).then(({ data }) => {
                    this.cities.splice(index, 1);
                    this.$notify( { title: 'Успешно', message: 'Город успешно удален', type: 'success' } );
                })
            }).catch(() => {});
        }
    },

    mounted() {
        this.getCities();
    },

    watch: {
        country: function(newVal, oldVal) {
            this.loading = true;
            this.getCities(newVal);
        }
    }
}
</script>

<style scoped lang="sass">

</style>
