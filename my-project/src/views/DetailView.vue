<script>
import { RouterLink, RouterView } from "vue-router";
import { useMovieStore } from "../stores/movie";
import { mapState, mapActions } from "pinia";

export default {
  methods: {
    ...mapActions(useMovieStore, ["fetchMovieDetail"]),
    getImageUrl(posterPath) {
        if (posterPath == null || posterPath == undefined) {
        return "https://i.imgur.com/Z2MYNbj.png/large_movie_poster.png";
      } else {
        return `http://image.tmdb.org/t/p/w500${posterPath}`;
      }
    },
    getGenres(genres) {
     let data = genres.map( genre => genre.name).join(', ');
     return data 
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("id-ID", options);
    },
  },
  computed: { ...mapState(useMovieStore, ["movieDetail"]) },
  created() {
    this.fetchMovieDetail(this.$route.params.id);
    console.log(this.$route.params.id);
  },
};
</script>
<template>
    <div class="bg-[#221F1F] text-white rounded-lg p-6 pt-16">
      <div class="flex flex-col md:flex-row md:space-x-6">
        <div class="w-full md:w-1/3">
          <img :src="getImageUrl(movieDetail.poster_path)" alt="Movie Poster" class="w-full rounded-lg shadow-lg">
        </div>
        <div class="w-full md:w-2/3">
  <h1 class="text-4xl font-bold mb-4">{{ movieDetail.title }}</h1>
  <h1 class="text-3xl font-bold mb-4">{{ movieDetail.tagline }}</h1>
  <p class="text-gray-400 text-xl"><strong>Release Date:</strong> {{ formatDate(movieDetail.release_date) }}</p>
  <p class="text-gray-400 mt-2 text-xl"><strong>Genres:</strong> {{ getGenres(movieDetail.genres) }}</p>
  <p class="text-gray-400 mt-4 text-xl"><strong>Overview:</strong> {{ movieDetail.overview }}</p>
  <p class="text-gray-400 mt-4 text-xl"><strong>Runtime:</strong> {{ movieDetail.runtime }} minutes</p>
  <div class="flex items-center mt-4">
    <p class="text-gray-400 mr-2 text-xl"><strong>Vote Average:</strong></p>
    <div class="flex items-center">
      <span class="text-yellow-400 text-3xl mr-1">{{ Math.floor(movieDetail.vote_average * 10) / 10 }}</span>
      <div class="flex">
        <template v-for="i in 5">
          <svg v-if="i <= Math.floor(movieDetail.vote_average)"
            class="w-6 h-6 fill-current text-yellow-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M18.37 7.01a1 1 0 0 0-.86-.57l-5.93-.86l-2.65-5.37a1 1 0 0 0-1.8 0l-2.64 5.37l-5.93.86a1 1 0 0 0-.57 1.7l4.3 4.19l-1.02 5.93a1 1 0 0 0 1.45 1.05l5.33-2.8l5.32 2.8a1 1 0 0 0 1.44-1.05l-1.01-5.93l4.3-4.19a1 1 0 0 0 .19-1.13z"></path>
          </svg>
        </template>
      </div>
    </div>
  </div>
  <p class="text-gray-400 mt-4 text-xl"><strong>Vote Count:</strong> {{ movieDetail.vote_count }}</p>
</div>

      </div>
    </div>
  </template>
  
  
  
