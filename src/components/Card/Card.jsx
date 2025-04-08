import { useEffect, useState, useContext } from 'react';
import MovieDBService from '../../movie-service';
import { format } from 'date-fns';
import CardContent from '../Card-Content/Card-Content';
import Spinner from '../Spinner/Spinner';
import '@fontsource/inter/300.css';

import './Card.css';
import { GenreContext } from './../GenreContext/GenreContext';

const _Card = ({ id, page, isErrors, search, nothinWasfound, isUserRated }) => {

  const [poster, setPoster] = useState(null);
  const [movieName, setmovieName] = useState(null);
  const [movieDescription, setmovieDescription] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [firstGenre, setFirstGenre] = useState(null);
  const [secondGenre, setSecondGenre] = useState(null);
  const [rate, setRate] = useState(0)
  const [movieDBid, setMovieDBid] = useState(null);


  const getFormatedDate = (date) => {
    if (!date) return;
    return format(new Date(date), 'MMMM d, y');
  };

  const onError = (err) => {
    isErrors(err);
  };

  const movieDBService = new MovieDBService();
  const genres = useContext(GenreContext);
  let transformedGenres = {};
  if (genres.length) {
    transformedGenres = genres.reduce((acc, mv) => {
      acc = { ...acc, [mv.id]: mv.name };
      return acc;
    }, {});
  }

  function getMovieData() {
    let movies;
    if (search.length) {
      movies = movieDBService.getSearchResult(page, search)
    } else if (!search.length && isUserRated) {
      movies = movieDBService.getUserRatedResource(page);
    } else {
      movies = movieDBService.getResource(page);
    }
    movies
      .then((res) => {
        if (!res.results.length) {
          nothinWasfound();
        } else {
          setPoster(res.results[id].poster_path);
          setmovieName(res.results[id].title);
          setmovieDescription(res.results[id].overview);
          setReleaseDate(getFormatedDate(res.results[id].release_date));
          setFirstGenre(transformedGenres[res.results[id].genre_ids[0]]);
          setSecondGenre(transformedGenres[res.results[id].genre_ids[1]]);
          setRate(res.results[id].rating ? res.results[id].rating :  res.results[id].vote_average)
          setMovieDBid(res.results[id].id)
        }
      })
      .catch(onError);
  }
  useEffect(() => {
    getMovieData();
  }, []);

  let movie = {
    poster,
    movieName,
    movieDescription,
    releaseDate,
    firstGenre,
    secondGenre,
    rate,
    movieDBid,
    isUserRated
  };

  let content =
    movie.movieName || movie.poster ? (
      <CardContent movie={movie} />
    ) : (
      <Spinner />
    );

  return <article className="movie-card">{content}</article>;
};

export default _Card;
