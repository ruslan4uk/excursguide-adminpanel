<template>
  <b-row>
    <b-col cols="12">
      <h3 class="mb-4">Список гидов</h3>
    </b-col>

    <b-col cols="12" lg="12">
      <b-card class="card-border-blue mb-4" title="">

        <el-table
          :data="users.data"
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
            label="Дата регистрации"
            width="200">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.created_at }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="Статус аккаунта"
            width="200">
            <template slot-scope="scope">
              <el-select placeholder="Select" v-model="scope.row.active" size="small" @change="changeGuideUserActiveStatus(scope.row)">
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
          :total="users.total"
          :page-size="users.per_page"
          :current-page="users.current_page"
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

    data () {
        return {
            users: [],
            loading: false,
        }
    },

    methods: {
        getUsers(page = null) {
            this.$axios.get('/users/guides?page=' + page).then( ({ data }) => {
                this.users = data.data;
                this.loading = false;
            })
        },

        handleCurrentChange(val) {
            this.loading = true;
            this.getUsers(val);
            window.scrollTo(0, 0);
        },

        handleRowClick(row) {
            this.$router.push( { name: 'guide-id', params: { id: row.id } } )
        },

        changeGuideUserActiveStatus(row) {
            this.$axios.post(`/users/guides/${row.id}`, { active: row.active }).then( ({ data }) => {
                this.$notify( { title: 'Успешно', message: 'Статус профиля изменен', type: 'success' } );
            })
        }
    },

    mounted() {
        this.getUsers();
    }
}
</script>

<style scoped lang="sass">
.table-avatar
  flex: 0 0 auto
</style>
