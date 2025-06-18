import { useEffect, useState } from 'react'
import { getUpcomingMovies } from '../../api/tmdbApi'

function MovieUpcoming() {
   const [movies, setMovies] = useState([]) // 응답받은 영화 목록
   const [loading, setLoading] = useState(true) // 로딩중 여부
   const [error, setError] = useState(null) // 에러메세지

   // 컴포넌트가 최초로 렌더링(마운트) 된후 1번만 실행
   // API 호출가능
   useEffect(() => {
      const fetchMovies = async () => {
         try {
            const movieList = await getUpcomingMovies()
            setMovies(movieList.data.results) // moives state에 영화목록 데이터 저장
         } catch (error) {
            setError(error.message) // error state에 에러메세지 저장
         } finally {
            setLoading(false) // loading완료
         }
      }

      fetchMovies()
   }, [])

   // loading state가 true 면 로딩중 컴포넌트를 렌더링
   if (loading) return <p>로딩중..</p>

   // error state에 에러메세지가 있으면 erorr 메세지 컴포넌트를 렌더링
   if (error) return <p>Error: {error}</p>

   // loading state가 false면서 error state에 에러메세지가 없으면 영화 목록 컴포넌트를 렌더링
   return (
      <div>
         <h1>개봉예정 영화 목록</h1>
         <ul>
            {movies.map((movie) => (
               <li key={movie.id}>{movie.title}</li>
            ))}
         </ul>
      </div>
   )
}

export default MovieUpcoming
