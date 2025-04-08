export default class MovieDBService {
  _apiBaseTopRated = 'https://api.themoviedb.org/3/movie/top_rated';
  _apiBasePopular = 'https://api.themoviedb.org/3/movie/popular';
  _apiBaseUserRated = 'https://api.themoviedb.org/3/account/21800927/rated/movies?language=en-US&&sort_by=created_at.asc'
  _apiBaseDetails =
    'https://api.themoviedb.org/3/genre/movie/list?language=en';
  _apiBaseSearch =
    'https://api.themoviedb.org/3/search/movie?&sort_by=popularity&include_adult=false&language=en-US';
  _apiPosterbase = `https://image.tmdb.org/t/p/w500/`;
  _auth =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTY1ODk5OTliZTZkMzYxNTIxYThmMjc1MzhkZTM2YiIsIm5iZiI6MTczODg3MDM0NS44NjUsInN1YiI6IjY3YTUwZTQ5ZWE0OWRlN2FjMDJmZTEyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e5r8KTSzjM-DlpwUFYZLtBJJdTJgYLaEh6MHCqrS1dQ';
  _apiKey = '&api_key=416589999be6d361521a8f27538de36b';
  async getResource(page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this._auth,
      },
    };
    const res = await fetch(
      `${this._apiBaseTopRated}?language=en-US&page=${page}`,
      options
    );

    return await res.json();
  }

  async getUserRatedResource(page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this._auth,
      },
    };
    const res = await fetch(
      `${this._apiBaseUserRated}&page=${page}`,
      options
    );
    return await res.json();
  }

  async getDetails() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this._auth,
      },
    };
    const res = await fetch(`${this._apiBaseDetails}`, options);
    return await res.json();
  }

  async getSearchResult(page, searchValue) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this._auth,
      },
    };
    const res = await fetch(
      `${this._apiBaseSearch}&page=${page}&query=${searchValue}`,
      options
    );

    return await res.json();
  }

  // async getGuestSession() {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: this._auth,
  //     },
  //   };

  //   fetch(
  //     'https://api.themoviedb.org/3/authentication/guest_session/new',
  //     options
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       if (res.success) {
  //         const guestSession =
  //           JSON.parse(localStorage.getItem('guestSession')) || {};
  //         const { guest_session_id, expires_at } = res;
  //         const expiresDate = new Date(expires_at);

  //         if (guestSession.guest_session_id && expiresDate > new Date()) {
  //           console.log(guestSession);
  //           return guestSession.guest_session_id;
  //         } else {
  //           const newGuestSession = {
  //             guest_session_id,
  //             expires_at: expiresDate,
  //           };

  //           localStorage.setItem(
  //             'guestSession',
  //             JSON.stringify(newGuestSession)
  //           );
  //           console.log(newGuestSession);
  //           return newGuestSession.guest_session_id;
  //         }
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }

  async addRating(movieId, rating) {

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?`, {
      method: 'POST',
      headers: {
        Authorization: this._auth,  
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rating }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            console.error(
              'Ошибка аутентификации.'
            );
          } else {
            console.error(`HTTP error! status: ${response.status}`);
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Рейтинг успешно добавлен:', data);
      })
      .catch((error) => {
        console.error('Ошибка при добавлении рейтинга:', error);
      });
  }
}
