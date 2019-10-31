export default function({ $axios, store, app, redirect }) {

  $axios.interceptors.response.use(response => {

    return response;

  }, error => {
    switch (error.response.status) {
      case 401:
        store.$auth.reset();
        store.$auth.logout();
        break;
      case 422:
        store.dispatch('validation/setErrors', error.response.data.errors);
        break;
      default:
    }
    return Promise.reject(error)
  });

  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors');
  });
}
