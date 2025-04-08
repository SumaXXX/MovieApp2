import { Offline, Online } from 'react-detect-offline';
import './App.css';
import '../node_modules/antd/dist/reset.css';
import { Alert } from 'antd';
import { useState, useEffect } from 'react';

import CardList from './components/CardList/CardList';
import { GenreContext } from './components/GenreContext/GenreContext';
import MovieDBService from './movie-service';

function App() {


  const [error, setError] = useState(false);
  const isErrors = (error) => {
    setError(true);
    console.log(error);
  };

  const [genres, setGenres] = useState({});
  const movieDBService = new MovieDBService();
  
  const getMovieGenres = () => {
    const details = movieDBService.getDetails();
    details.then((res) => {
      if (res) {
        setGenres(res.genres ? res.genres : null);
      }
    });
  };
  useEffect(() => {
    getMovieGenres();
  }, [])
  return (
    <>
      <Online>
        {error ? (
          <Alert
            style={{ fontSize: 48 }}
            message="Something went wrong..."
            type="error"
          />
        ) : (
          <>
            <GenreContext.Provider value={genres}>
              <CardList numberOfCards={20} page={1} isErrors={isErrors} />
            </GenreContext.Provider>
          </>
        )}
      </Online>
      <Offline>
        <h1>Seems like you are offline -_-</h1>
      </Offline>
    </>
  );
}

export default App;
