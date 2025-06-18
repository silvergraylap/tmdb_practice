import { useEffect, useState } from 'react'
import { getMovies } from '../../api/tmdbApi'

function MoviList() {
   //§ 1. movies state 선언 코드의 주석을 해제합니다.
   const [movies, setMovies] = useState([]) //응답받은 영화 목록
   const [loading, setLoading] = useState(true) // 로딩 중 여부
   const [error, setError] = useState(null) //에러메세지

   // 빈 배열로 하면 언제 실행될까? 컴포넌트 되고 마운트 되고 나서 한번만 실행된다.
   //컴포넌트가 최초로 렌더링(마운트) 된 후 1번만 실행
   //이 시점에 API 호출 가능
   useEffect(() => {
      const fetchMovies = async () => {
         try {
            const response = await getMovies()
            // §2. setMovies 함수로 API 응답 결과를 state에 저장합니다.
            const movieList = await getMovies()
            // 👇 이 한 줄을 추가하면 두 가지 에러가 모두 해결됩니다.
            setMovies(response.data.results)
            // 'response' 변수를 사용하고, 'setMovies' 함수도 사용하게 됩니다.
            // API 응답(response)으로 state(setMovies)를 변경
            console.log(movieList.data.results)
         } catch (error) {
            setError(error.message) //error state에 에러메세지 저장
         } finally {
            setLoading(false) // loading 완료
         }
      }

      fetchMovies()
   }, [])

   // loading state가 true면 로딩 중 컴포넌트를 렌더링
   if (loading) return <p>로딩중..</p>
   //error state에 에러 메세지가 있으면 error 메세지 컴포넌트를 렌더링
   if (error) return <p>/Error: {error}</p>

   //loading state가 false면서 error state에 에러메세지가 없으면 영화 목록 컴포넌트를 렌더링

   return (
      <div>
         <h1>인기영화 목록</h1>
         <ul>
            {/* §3.이제 movies 변수가 존재하므로 에러가 발생하지 않습니다. */}
            {movies.map((movie) => (
               <li key={movie.id}>{movie.title}</li>
            ))}
         </ul>
      </div>
   )
}

export default MoviList
