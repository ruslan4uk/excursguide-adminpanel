<template>
  <b-row>
    <b-col cols="12">
      <h3 class="mb-4">Список гидов</h3>
    </b-col>

    <b-col cols="12" lg="12">
      <b-card class="card-border-blue mb-4" title="">

        <el-table
          :data="comment.data"
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
            label="Автор"
            width="250">
            <template slot-scope="scope">
              <div class="d-flex align-items-center">
                <el-avatar src="https://empty" class="table-avatar">
                  <img :src="scope.row.comment_author.avatar"/>
                </el-avatar>
                <span style="margin-left: 10px">{{ scope.row.comment_author.name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="Комментарий">
            <template slot-scope="scope">
              <span>{{ scope.row.text }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="Дата"
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

        </el-table>

        <el-divider></el-divider>

        <el-pagination
          class="mt-3"
          background
          layout="prev, pager, next"
          :total="comment.total"
          :page-size="comment.per_page"
          :current-page="comment.current_page"
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
            comment: [],
            loading: true
        }
    },

    methods: {
        getComment() {
            this.$axios.get('/comment').then(({ data }) => {
                this.comment = data.data;
                this.loading = false;
                // console.log(data.data.data)
            })
        },

        handleCurrentChange(val) {
            this.loading = true;
            this.getUsers(val);
            window.scrollTo(0, 0);
        },

        changeGuideUserActiveStatus(row) {
            this.$axios.post(`/comment/${row.id}`, { active: row.active }).then( ({ data }) => {
                this.$notify( { title: 'Успешно', message: 'Статус комментария изменен', type: 'success' } );
            })
        }
    },

    mounted() {
        this.getComment();
    }
}
</script>

<style scoped lang="sass">

</style>
