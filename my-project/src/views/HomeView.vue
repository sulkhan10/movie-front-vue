<script>
import { RouterLink, RouterView } from "vue-router";
import { useMovieStore } from "../stores/movie";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      inputSearch: "",
      showSearch: false,
    };
  },
  methods: {
    ...mapActions(useMovieStore, ["fetchMovies", "searchMovie"]),
    addWwwToImageUrl(imageUrl) {
      if (imageUrl == null || imageUrl == undefined) {
        return "https://i.imgur.com/Z2MYNbj.png/large_movie_poster.png";
      } else {
        return `http://image.tmdb.org/t/p/w500${imageUrl}`;
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.fetchMovies(page);
    },
    getPageButtonClass(page) {
      return [
        "px-3 py-1 text-gray-600 font-medium rounded-md mx-1",
        { "bg-[#E50914] text-white": page === this.currentPage },
      ];
    },
    goToPageSearch(page) {
      console.log(page);
      this.currentPageSearch = page;
      console.log(this.currentPageSearch);
      let data = {
        name: this.inputSearch,
        page,
      };
      this.searchMovie(data);
    },
    getPageButtonClassSearch(page) {
      return [
        "px-3 py-1 text-gray-600 font-medium rounded-md mx-1",
        { "bg-[#E50914] text-white": page === this.currentPage },
      ];
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    submitSearch() {
      let data = {
        name: this.inputSearch,
        page: this.currentPageSearch,
      };
      this.searchMovie(data);
      this.showSearch = true;
    },
  },
  computed: {
    ...mapState(useMovieStore, ["moviesResult", "movieSearchResult", "currentPage", "totalPageSearch", "totalPage", "currentPageSearch"]),
    totalPagesArr() {
      let pageNumbers = [];
      let pages;
      if (this.totalPage > 10) {
        pages = 10;
      } else {
        pages = this.totalPage;
      }
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    },
    totalPagesSearchArr() {
      let pageNumbers = [];
      let pages;
      if (this.totalPageSearch > 10) {
        pages = 10;
      } else {
        pages = this.totalPageSearch;
      }
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    },
  },
  created() {
    this.fetchMovies(this.currentPage);
  },
};
</script>
<template>
  <div class="bg-[#221F1F]">
    <div class="py-4 px-12 pt-16 mb-4 w-full">
      <form @submit.prevent="submitSearch">
        <div class="">
          <div class="flex space-x-4">
            <div class="flex rounded-md overflow-hidden w-full">
              <input
                v-model="inputSearch"
                type="text"
                class="font-bold px-2 text-xl w-full rounded-md rounded-r-none"
              />
              <button
                type="submit"
                class="bg-indigo-600 text-white px-10 text-xl font-semibold py-1 rounded-r-md"
              >
                Search
              </button>
            </div>
            <button
              @click.prevent="
                inputSearch = '';
                showSearch = false;
              "
              class="bg-red-700 px-10 text-xl font-semibold py-1 rounded-md"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
    <div
      v-if="!showSearch"
      class="px-12 py-4 grid text-white grid-cols-5 gap-10"
    >
    <div v-for="movie in moviesResult" class="relative overflow-hidden">
        <RouterLink :to="{ name: 'detail', params: { id: movie.id } }">
          <img
            :src="addWwwToImageUrl(movie.poster_path)"
            :alt="movie.title"
            class="w-full rounded-xl transition-transform duration-300 ease-in-out transform-gpu hover:scale-105"
          />
          <div
            class="absolute top-0 right-0 p-2 bg-gray-800 bg-opacity-75 rounded-lg group-hover:flex items-center z-10"
          >
            <svg
              class="w-4 h-4 fill-current text-yellow-500 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M18.37 7.01a1 1 0 0 0-.86-.57l-5.93-.86l-2.65-5.37a1 1 0 0 0-1.8 0l-2.64 5.37l-5.93.86a1 1 0 0 0-.57 1.7l4.3 4.19l-1.02 5.93a1 1 0 0 0 1.45 1.05l5.33-2.8l5.32 2.8a1 1 0 0 0 1.44-1.05l-1.01-5.93l4.3-4.19a1 1 0 0 0 .19-1.13z"
              ></path>
            </svg>
            <span class="text-white font-medium">{{
              Math.floor(movie.vote_average * 10) / 10
            }}</span>
          </div>
          <div class="mt-2 text-center">
            <h3 class="text-xl font-medium hover:text-red-500">
              {{ movie.title }}
            </h3>
          </div>
        </RouterLink>
      </div>
    </div>
    <div
      v-if="showSearch"
      class="px-12 py-4 grid bg-[#221F1F] text-white grid-cols-5 gap-10"
    >
      <div v-for="movie in movieSearchResult" class="relative overflow-hidden">
        <RouterLink :to="{ name: 'detail', params: { id: movie.id } }">
          <img
            :src="addWwwToImageUrl(movie.poster_path)"
            :alt="movie.title"
            class="w-full rounded-xl transition-transform duration-300 ease-in-out transform-gpu hover:scale-105"
          />
          <div
            class="absolute top-0 right-0 p-2 bg-gray-800 bg-opacity-75 rounded-lg group-hover:flex items-center z-10"
          >
            <svg
              class="w-4 h-4 fill-current text-yellow-500 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M18.37 7.01a1 1 0 0 0-.86-.57l-5.93-.86l-2.65-5.37a1 1 0 0 0-1.8 0l-2.64 5.37l-5.93.86a1 1 0 0 0-.57 1.7l4.3 4.19l-1.02 5.93a1 1 0 0 0 1.45 1.05l5.33-2.8l5.32 2.8a1 1 0 0 0 1.44-1.05l-1.01-5.93l4.3-4.19a1 1 0 0 0 .19-1.13z"
              ></path>
            </svg>
            <span class="text-white font-medium">{{
              Math.floor(movie.vote_average * 10) / 10
            }}</span>
          </div>
          <div class="mt-2 text-center">
            <h3 class="text-xl font-medium hover:text-red-500">
              {{ movie.title }}
            </h3>
          </div>
        </RouterLink>
      </div>
    </div>
    <div v-if="!showSearch" class="flex justify-center items-center mt-8">
      <button
        class="px-3 py-1 text-gray-600 font-medium rounded-md mr-2"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>
      <div class="flex">
        <button
          v-for="page in totalPagesArr"
          class="text-white"
          :key="page"
          :class="getPageButtonClass(page)"
          @click="goToPage(page)"
        >
          {{ page }}
          <!-- {{ totalPages }} -->
        </button>
      </div>
      <button
        class="px-3 py-1 text-gray-600 font-medium rounded-md ml-2"
        :disabled="currentPage >= 10"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
    <div v-if="showSearch" class="flex justify-center items-center mt-8">
      <button
        class="px-3 py-1 text-gray-600 font-medium rounded-md mr-2"
        :disabled="currentPageSearch === 1"
        @click="goToPageSearch(currentPageSearch - 1)"
      >
        Previous
      </button>
      <div class="flex">
        <button
          v-for="page in totalPagesSearchArr"
          class="text-white"
          :key="page"
          :class="getPageButtonClassSearch(page)"
          @click="goToPageSearch(page)"
        >
          {{ page }}
          <!-- {{ totalPages }} -->
        </button>
      </div>
      <button
        class="px-3 py-1 text-gray-600 font-medium rounded-md ml-2"
        :disabled="currentPage >= 10"
        @click="goToPageSearch(currentPageSearch + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
