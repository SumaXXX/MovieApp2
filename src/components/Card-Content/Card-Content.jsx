import { truncateText } from '../../usefullFunctions';
import { Card, ConfigProvider, Tag, Rate } from 'antd';
import { useState} from 'react';
import CircleRating from '../CircleRating/CircleRating';
import MovieDBService from '../../movie-service';

const { Meta } = Card;

const CardContent = ({
  movie: {
    poster,
    movieName,
    movieDescription,
    releaseDate,
    firstGenre,
    secondGenre,
    rate,
    isUserRated,
    movieDBid
  },
}) => 
  {
  const _apiPosterbase = `https://image.tmdb.org/t/p/w500/`;
  const [starValue, setStarValue] = useState(isUserRated ? rate : 0);
  const [rating, setRating] = useState(0);
  const movieDBService = new MovieDBService();

  const handleRating = (rating) => {
    setStarValue(rating)
    setRating(rating)
    movieDBService.addRating(movieDBid, rating)
  }

  // const [imgSrc, setImgSrc] = useState(null);
  // const handleError = () => {
  //   setImgSrc('/noImage.png'); 
  // };

  return (
    <>
      <img
        className="movie-card--poster"
        alt="poster"
        src={poster ? `${_apiPosterbase}${poster}` : 'https://upload.wikimedia.org/wikipedia/commons/4/41/Noimage.svg'}
        // onError={handleError}
      />
      
      <div className="movie-card--info">
        <ConfigProvider
          theme={{
            token: {fontSize: 14},
            components: {
              Card: {
                bodyPadding: 0
              },
              Rate: {
                starSize: 17.12,
              },
            },
          }}
        >
          <Card
            style={{
              border: 'none',
              fontSize: 13,
              width: '16rem',
              fontFamily: 'Inter',
              paddingLeft: 8,
              paddingTop: 1
            }}
          >
            {/* <CircleRating score={rating === 0 ? rate.toFixed(1) : rating}/> */}
            <Meta title={truncateText(movieName, 28)} description={releaseDate} />
            
            <div className="movie-card--info--genres">
              {firstGenre ? (
                <Tag
                  style={{
                    fontSize: 12,
                    color: 'grey',
                  }}
                >
                  {firstGenre}
                </Tag>
              ) : null}
              {secondGenre ? (
                <Tag
                  style={{
                    fontSize: 12,
                    color: 'grey',
                  }}
                >
                  {secondGenre}
                </Tag>
              ) : null}
            </div>
            <p className="movie-card--info--description">
              {truncateText(movieDescription, 190)}
            </p>
          <Rate className='rate' allowHalf allowClear onChange={handleRating} value={starValue} count={10} />
          </Card>

        </ConfigProvider>
      </div>
    </>
  );
};

export default CardContent;
