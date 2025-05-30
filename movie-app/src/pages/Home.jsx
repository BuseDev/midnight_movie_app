import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies, updateSearchCount } from "../appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

//Bu kod bloğu fetch() fonksiyonunu kullanarak TMDB API'ye veri çekmek için gerekli olan istek ayarlarını belirler.(options)
const API_OPTIONS = {
  method: 'GET', // API'ye GET isteği yapacağımızı belirtiyoruz.
  headers: {
    accept: 'application/json', // API'den JSON formatında veri almak istediğimizi belirtiyoruz.
    Authorization: `Bearer ${API_KEY}` // API'ye kimlik doğrulama için Bearer Token kullanıyoruz.
  }
}

function Welcome() {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  //Debounce the search term to prevent making too many requests
  //by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])


   const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

      try{
        const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

        const response = await fetch(endpoint, API_OPTIONS)//fetch ile istek yapılarak response değişkenine kaydedilir

        if(!response.ok){
          throw new Error('Failed to fetch movies')
        }//yanıt başarısız ise hata fırlat

        const data = await response.json()//yanıtı JSON formatına çevirip data değişkenine kaydeder
        console.log(data)
        
        if(data.Response =='False'){
          setErrorMessage(data.Error || 'Failed to fetch movies')
          setMovieList([])
          return;
        }

        setMovieList(data.results || [])

        if(query && data.results.length > 0){
          console.log("Updating search count for:", query, data.results[0]);
          await updateSearchCount(query, data.results[0])
        }
      }catch (error){
        console.error(`Error fetching movies: ${error}`)
        setErrorMessage('Error fetching movies. Please try again later.')
      }finally{
        setIsLoading(false)
      }
  }

   const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies()

      setTrendingMovies(movies)
    }catch (error){
      console.error(`Error fetching trending movies: ${error}`)
    }
   }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  },[debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  },[])

  return (
    <main>
      <div className="pattern" />

      <img className="logo-welcome" src="/logo.png" alt="midnight" />

      <div className="wrapper">
        <header>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>


          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}> {/*map yaparken key ile id belirtmeyi unutma*/}
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title}/>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
        <h2>All Movies</h2>

        {isLoading ? (
          <Spinner />
        ): errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (/*map yaparken key ile id belirtmeyi unutma*/
              <MovieCard key={movie.$id} movie={movie}/>
            ))}
          </ul>
        )}
        </section>
      </div>
    </main>
  );
}

export default Welcome;




//async fonksiyonlar eğer bir işlem uzun sürecekse (API'dan veri çekmek gibi)
//bu işlem tamamlana kadar diğer kodların çalışmaya devam edevilmesi için kullanılır. 
//Uzun süren işlemler bu sayede arka planda çalışır
//Eğer böyle durumlarda async kullanılmazsa sayfa donabilir,
//kullanıcı arayüzü yanıt vermez hale gelebilir.

//isLoadind state: yükleme göstergesi sağlar
//errorMessage state: hata mesajlarını günceller
//movieList state: Film listesini günceller