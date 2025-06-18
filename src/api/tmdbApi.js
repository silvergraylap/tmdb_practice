import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const AUTH_KEY = import.meta.env.VITE_TMDB_API_KEY

// axios 객체 생성
// create() 함수 실행 -> axios 객체 생성(tmdbApi) -> axios를 통해 API를 call
const tmdbApi = axios.create({
   baseURL: BASE_URL, // 똑같이 반복되는 URL
   headers: {
      accept: 'application/json', // JSON 객체로 결과값 받음
      Authorization: `Bearer ${AUTH_KEY}`, // 인증키
   },
})

// 인기영화 목록 가져오기
export const getMovies = async (page = 1) => {
   // https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=KR
   const response = await tmdbApi.get('/movie/popular', {
      //쿼리스트링
      params: {
         language: 'ko-KR',
         page,
         region: 'KR',
      },
   })

   return response //응답결과 데이터 리턴
}

// 개봉예정 영화 목록 가져오기
export const getUpcomingMovies = async (page = 1) => {
   const response = await tmdbApi.get('/movie/upcoming', {
      //쿼리스트링
      params: {
         language: 'ko-KR',
         page, //page: page
         region: 'KR',
      },
   })
   return response //응답결과 데이터 리턴
}

// 영화상세 정보 가져오기
export const getMovieDetails = async (movieId) => {
   // https://api.themoviedb.org/3/movie/{movie_id}?language=ko-KR
   const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
         language: 'ko-KR',
      },
   })
   return response //응답결과 데이터 리턴
}

export default tmdbApi
