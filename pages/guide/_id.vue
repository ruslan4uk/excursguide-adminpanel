<template>
  <b-row>
    <b-col cols="12">
      <h3 class="mb-4">Профиль пользователя</h3>
    </b-col>

    <b-col class="sidebar">
      <b-card class="card-border-blue mb-4" title="">
        <div class="text-center">
          <el-avatar :size="120" :src="profile.avatar" class="mb-2"></el-avatar>
          <p class="h6 mb-1 font-weight-bold">{{ profile.name }}</p>
          <a :href="'mailto:' + profile.email" class="h6 mb-0 text-secondary">{{ profile.email }}</a>

          <p class="text-secondary"><small>Дата создания: {{ profile.created_at }}</small></p>

          <el-divider></el-divider>

          <el-select placeholder="Select" v-model="profile.active" size="small" class="w-100" @change="changeGuideUserActiveStatus">
            <el-option label="Активен" :value="2"></el-option>
            <el-option label="На модерации" :value="1"></el-option>
          </el-select>
        </div>
      </b-card>

      <b-card class="card-border-blue mb-4" title="">
        <p class="mb-3"><strong>Город проживания:</strong>
          <span class="mb-0" v-for="(city, index) in profile.user_city" :key="index">{{ city.name }}, {{ city.city_country.name }}</span>
        </p>

        <p class="mb-3"><strong>Языки:</strong>
          <span v-for="(language, index) in profile.user_language">
            {{ language.name }}{{ index < profile.user_language.length - 1 ? ', ' : ''}}
          </span>
        </p>

        <p class="mb-3"><strong>Услуги:</strong>
          <span v-for="(service, index) in profile.user_service">
            {{ service.name }}{{ index < profile.user_service.length - 1 ? ', ' : ''}}
          </span>
        </p>

      </b-card>

      <b-card class="card-border-blue">
        <h5>Контакты:</h5>

        <p v-for="(contact, index) in profile.user_contact_type" class="mb-1">
          {{ contact.text }}
          <span v-for="(type, index) in contact.contact_type" class="text-secondary font-italic">({{ type.name }})</span>
        </p>

      </b-card>
    </b-col>

    <b-col>
      <b-card class="card-border-blue mb-4" title="">
        <h5 class="mb-4">Информация:</h5>
        {{ profile.about }}
        <el-alert v-if="!profile.about" title="Не заполнено" type="error" effect="dark"></el-alert>
      </b-card>

      <b-card class="card-border-blue mb-4" title="">
        <h5 class="mb-4">Лицензии:</h5>
        <b-row v-if="profile.user_license && profile.user_license.length">
          <b-col cols="6" lg="3" class="mb-4" v-for="(license, index) in profile.user_license" :key="index">
            <a :href="license.image" target="_blank">
              <el-image :src="license.image_crop" lazy></el-image>
            </a>
          </b-col>
        </b-row>

        <el-alert v-else title="Нет загруженных лицензий" type="error" effect="dark"></el-alert>
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
            profile: {},
        }
    },

    methods: {
        getUserProfile() {
            this.$axios.get(`/users/guides/${this.$route.params.id}`).then( ({ data }) => {
                this.profile = data.data
            })
        },

        changeGuideUserActiveStatus(val) {
            this.$axios.post(`/users/guides/${this.$route.params.id}`, { active: val }).then( ({ data }) => {
                this.profile.active = val;
                this.$notify( { title: 'Успешно', message: 'Статус профиля изменен', type: 'success' } );
            })
        }
    },

    mounted() {
        this.getUserProfile();
    }
}

</script>

<style scoped lang="sass">
.sidebar
  flex: 0 0 400px
</style>
