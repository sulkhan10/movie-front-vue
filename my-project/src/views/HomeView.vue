<script>
import { RouterLink, RouterView } from "vue-router";
import { useMovieStore } from '../stores/movie'
export default {
  data() {
    return {
      inputUsername: '',
      inputEmail: '',
      inputPassword: '',
    }
  },
  computed: {
    ...mapState(useMovieStore, ['movieList']),
  },

}
</script>
<template>
  
</template>


