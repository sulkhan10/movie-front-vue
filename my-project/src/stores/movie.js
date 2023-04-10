import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    baseUrl: "https://api.themoviedb.org/3/movie/now_playing?api_key=12b71e90fbfaf4c9bd6b49822f24b090&language=en-US&page=",
    searchUrl : "https://api.themoviedb.org/3/search/movie?api_key=12b71e90fbfaf4c9bd6b49822f24b090&query=",
    movieSearchResult: [],
    moviesResult: [],
    currentPage: 1,
    totalPage: 1,
    currentPageSearch: 1,
    totalPageSearch: 1,
    movieDetail: {},
  }),

  actions: {
    swalSuccess(title, message) {
      Swal.fire(title, message, "success");
    },
    swalError(title, message) {
      Swal.fire(title, message, "error");
    },
    swalErrorNotification(error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: error.response.statusText,
      });
    },
    swalNotification(title) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title,
      });
    },
    async searchMovie(value) {
      try {
        let { data } = await axios({
          method: "get",
          url: `${this.searchUrl}${value.name}&page=${value.page}`,
          
        });
        this.movieSearchResult = data.results;
        console.log(data);
        this.totalPageSearch = data.total_pages;
        this.currentPageSearch = data.page;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchMovies(page = 1) {
      try {
        let { data } = await axios({
          method: "get",
          url:
            this.baseUrl + page,
        });
        console.log(data);
        this.moviesResult = data.results;
        this.totalPage = data.total_pages;
        this.currentPage = data.page;
        this.swalNotification("Movies has loaded");
      } catch (error) {
        console.log(error);
        this.swalError("Movies failed to be loaded", "Movies failed to be loaded");
      }
    },
    async fetchMovieDetail(id) {
      try {
        let { data } = await axios({
          method: "get",
          url:
          `https://api.themoviedb.org/3/movie/${id}?api_key=12b71e90fbfaf4c9bd6b49822f24b090`
        });
        
        console.log(data);
        this.movieDetail = data;
    
        this.swalNotification("Movies has loaded");
      } catch (error) {
        console.log(error);
        this.swalError("Movies failed to be loaded", "Movies failed to be loaded");
      }
    },
  },
});
