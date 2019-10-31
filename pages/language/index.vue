<template>
  <b-row>
    <b-col cols="12">
      <b-card class="card-border-blue" v-loading="loading">
        <div class="d-flex">
          <h5>Языки:</h5>
          <el-button size="mini" class="ml-3" @click="handleAdd">Добавить язык</el-button>
        </div>

        <el-table
          :data="language"
          style="width: 100%">
          <el-table-column
            fixed
            label="Название"
            prop="name">
          </el-table-column>

          <el-table-column
            align="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEditLanguage(scope.$index, scope.row)">Изменить</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
            </template>
          </el-table-column>

        </el-table>
      </b-card>

      <el-dialog
        title="Warning"
        :visible.sync="centerDialogVisible"
        @close="handleModalClose"
        width="30%"
        center>
        <el-form :model="modal_form" ref="languageForm" label-width="0" class="demo-ruleForm mb-0">
          <el-form-item prop="modal_name">
            <el-input placeholder="Введите название языка" v-model="modal_form.name" id="modal_name"></el-input>
          </el-form-item>

          <el-form-item prop="modal_iso_code" class="mb-0">
            <el-input placeholder="Введите iso_code" v-model="modal_form.iso_code" id="modal_iso_code"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="handleModalClose">Отмена</el-button>
          <el-button type="primary" @click="handleModalSave">Сохранить</el-button>
        </span>
      </el-dialog>
      {{ index }}
    </b-col>
  </b-row>
</template>

<script>
export default {
    layout: 'admin',

    middleware: ['auth'],

    data() {
        return {
            language: [],
            loading: false,
            centerDialogVisible: false,
            modal_form: {
                id: null,
                name: '',
                iso_code: '',
            },
            index: false
        }
    },

    methods: {
        getLanguage() {
            this.$axios.get('/language').then(({ data }) => {
                this.language = data.data;
                console.log(data.data)
            })
        },

        handleModalClose() {
            setTimeout(() => {
                this.centerDialogVisible = false;
                this.modal_form.id = null;
                this.modal_form.name = '';
                this.modal_form.iso_code = '';
                this.index = false;
            }, 200)
        },

        handleModalSave() {
            this.$axios.post(`/language/${this.modal_form.id}`, this.modal_form).then(({ data }) => {
                if(this.index === false) {
                    this.language.push(data.data);
                    console.log(this.index)
                } else {
                    this.language[this.index].id = data.data.id;
                    this.language[this.index].name = data.data.name;
                    this.language[this.index].iso_code = data.data.iso_code;
                    this.$notify( { title: 'Успешно', message: 'Язык успешно обновлен', type: 'success' } );
                }

                this.handleModalClose();
            });
        },

        handleAdd() {
            this.centerDialogVisible = true;
            this.modal_form.id = null;
            this.modal_form.name = '';
            this.modal_form.iso_code = '';
            this.index = false;
        },

        handleEditLanguage(index, row) {
            let rowObj = Object.assign({}, row);

            this.modal_form = rowObj;

            this.centerDialogVisible = true;

            this.index = index;
        },

        handleDelete(index, row) {
            this.$confirm(`Вы уверены что хотите удалить язык: ${row.name}`, 'Внимание!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.delete(`/language/${row.id}`).then(({ data }) => {
                    this.language.splice(index, 1);
                    this.$notify( { title: 'Успешно', message: 'Язык успешно удален', type: 'success' } );
                })
            }).catch(() => {});
        }
    },

    mounted() {
        this.getLanguage();
    }
}
</script>
