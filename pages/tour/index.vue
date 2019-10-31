<template>
  <b-row>
    <b-col>
      <h4 class="mb-4">Туры</h4>

      <b-card class="card-border-blue mb-4" title="">

        <el-table
          :data="tours.data"
          style="width: 100%"
          v-loading="loading">

          <el-table-column
            label="id"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="Имя">
            <template slot-scope="scope">
              <div class="d-flex align-items-center">
                <el-avatar src="https://empty" class="table-avatar">
                  <img :src="scope.row.avatar"/>
                </el-avatar>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="Дата создания"
            width="200">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.created_at }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="Статус тура"
            width="200">
            <template slot-scope="scope">
              <el-select placeholder="Select" v-model="scope.row.active" size="small" @change="changeTourActiveStatus(scope.row)">
                <el-option label="Активен" :value="2"></el-option>
                <el-option label="На модерации" :value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            label="Действия"
            width="130">
            <template slot-scope="scope">
              <el-button size="small" type="info" icon="el-icon-share" @click="handleRowClick(scope.row)">Просмотр</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-divider></el-divider>

        <el-pagination
          class="mt-3"
          background
          layout="prev, pager, next"
          :total="tours.total"
          :page-size="tours.per_page"
          :current-page="tours.current_page"
          @current-change="handleCurrentChange">
        </el-pagination>

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
            tours: [],
            loading: true
        }
    },

    methods: {
        getTour(page = null) {
            this.$axios.get(`/tours/?page=${page}`).then(({ data }) => {
                this.tours = data.data;
                this.loading = false;
            })
        },

        handleCurrentChange(val) {
            this.loading = true;
            this.getTour(val);
            window.scrollTo(0, 0);
        },

        handleRowClick(row) {
            this.$router.push( { name: 'tour-id', params: { id: row.id } } )
        },

        changeTourActiveStatus(row) {
            this.$axios.post(`/tours/${row.id}`, { active: row.active }).then( ({ data }) => {
                this.$notify( { title: 'Успешно', message: 'Статус экскурсии изменен', type: 'success' } );
            })
        }
    },

    mounted() {
        this.getTour();
    }
}
</script>

<style scoped lang="sass">
.table-avatar
  flex: 0 0 auto
</style>
