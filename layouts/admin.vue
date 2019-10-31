<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">EG admin panel</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="logout">Выйти</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>

    <b-container fluid>
      <b-row>
        <b-col class="sidebar">
          <div class="sidebar__profile d-flex align-items-center">
            <div class="sidebar__avatar mr-3">
              <b-img :src="$auth.user.avatar" rounded="circle"></b-img>
            </div>
            <div class="sidebar__userinfo">
              <p class="m-0">{{ $auth.user.name }}</p>
              <p class="m-0"><small>{{ $auth.user.email }}</small></p>
            </div>
          </div>
          <ul class="sidebar__nav">
            <li class="sidebar__label">Навигация</li>
            <li class="sidebar__item">
              <b-link class="sidebar__link" active-class="active" :to="'/dashboard'">Dashboard</b-link>
            </li>
            <li class="sidebar__item">
              <b-link class="sidebar__link" active-class="active" :to="'/guide'">Список гидов</b-link>
            </li>
            <li class="sidebar__item">
              <b-link class="sidebar__link" active-class="active" :to="'/tour'">Список экскурсий</b-link>
            </li>
            <li class="sidebar__item">
              <b-link class="sidebar__link" active-class="active" :to="'/comment'">Комментарии</b-link>
            </li>

            <li class="sidebar__label">Настройки</li>
            <li class="sidebar__item">
              <b-link class="sidebar__link" active-class="active" :to="'/city'">Города</b-link>
            </li>
            <li class="sidebar__item">
              <b-link class="sidebar__link" active-class="active" :to="'/language'">Языки</b-link>
            </li>

          </ul>
        </b-col>
        <b-col class="py-3">
          <nuxt />
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
export default {

    middleware: ['auth'],

    methods: {
      logout() {
          this.$auth.logout()
      }
    }

}
</script>

<style scoped lang="sass">
.navbar-color
  background-color: #616a73

.sidebar
  max-width: 100%
  width: 250px
  flex: 0 0 250px
  padding: 0
  background-color: #262c31
  color: #EEEEEE
  min-height: 100vh
  font-size: 0.875rem
  &__profile
    padding: 1rem
  &__avatar
    width: 25%

  &__label
    background-color: #1d2124
    padding: 0.5rem 1rem
    color: #aaaaaa
  &__nav
    margin: 0
    padding: 0
    list-style: none
  &__link
    display: block
    color: #a5a5a5
    text-decoration: none
    padding: 0.5rem 1rem
    border-left: 2px solid transparent
    &.active
      background-color: #41474c
      border-color: #EEEEEE
      color: #EEEEEE
</style>
