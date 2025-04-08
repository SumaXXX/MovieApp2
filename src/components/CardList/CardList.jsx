import './CardList.css';
import { fillArray, simpleHash } from '../../usefullFunctions';
import _Card from '../Card/Card';
import { Space, Pagination, Input, Alert, Tabs } from 'antd';
import { useState, useEffect} from 'react';
import MovieDBService from '../../movie-service';
import { debounce } from 'lodash';

export default function CardList({ numberOfCards, isErrors }) {
  const [_page, setPage] = useState(1);
  const [_totalPages, setTotalPages] = useState(50);
  const [isnothingWasFound, setIsNothingWasFound] = useState(false);
  const [ratedNumberOfCards, setRatedNumberOfCards] = useState(1);

  const [search, setSearch] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(true);

  const changePage = (page) => {
    setPage(page);
  };

  const nothinWasfound = () => {
    setIsNothingWasFound(true);
  };

  const movieDBService = new MovieDBService();

  const getTotalPages = () => {
    if (search) {
      movieDBService.getSearchResult(1, search).then((res) => {
        setTotalPages(res.total_pages);
      });
    } else if (!isSearchActive) {
      movieDBService.getUserRatedResource(1).then((res) => {
        setTotalPages(res.total_pages);
      });
    } else {
      movieDBService.getResource(1).then((res) => {
        setTotalPages(res.total_pages);
      });
    }
  };
  let ratedMovies = movieDBService.getUserRatedResource(1);
  ratedMovies.then((res) => {
    console.log(res.results.length);
    setRatedNumberOfCards(res.results.length);
  });
  const onChange = (key) => {
    if (key === '1') {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
      setSearch('')
    }
  };

  const goToSearch = (value) => {
    console.log(value);
    setSearch(value);
    getTotalPages(value);
    setIsNothingWasFound(false);
  };
  useEffect(() => {
    getTotalPages();
  }, [onChange, goToSearch]);

  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ];

  if (isnothingWasFound && isSearchActive) {
    return (
      <>
        <div className="centered">
          <Space size={[32, 32]} wrap className="cards">
            <Tabs
              className="tabs"
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              style={{
                height: 10,
              }}
            />
            <Input
              className="search"
              placeholder="Type to search..."
              onChange={debounce((e) => goToSearch(e.target.value), 700)}
            />
            <Alert
              className="alert-not-found"
              message="Nothing was found"
              type="warning"
              showIcon
              style={{ marginLeft: '1rem', marginBottom: '1000px'}}
            />
          </Space>
        </div>
      </>
    );
  }
  if (isSearchActive)
    return (
      <>
        <div className="centered">
          <Space size={[32, 32]} wrap className="cards">
            <Tabs
              className="tabs"
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              style={{
                height: 10,
              }}
            />

            <Input
              className="search"
              placeholder="Type to search..."
              onChange={debounce((e) => goToSearch(e.target.value), 700)}
            />

            {fillArray(numberOfCards).map((id) => (
              <_Card
                id={id}
                page={_page}
                isErrors={isErrors}
                key={simpleHash(`${Math.random()}`)}
                isUserRated={false}
                search={search}
                nothinWasfound={nothinWasfound}
              />
            ))}
          </Space>
        </div>
        <Pagination
          className="pagination"
          align="center"
          defaultCurrent={_page}
          total={_totalPages}
          showSizeChanger={false}
          onChange={changePage}
        />
      </>
    );

  if (!isSearchActive && ratedNumberOfCards > 0)
    return (
      <>
        <div className="centered">
          <Space size={[32, 32]} wrap className="cards">
            <Tabs
              className="tabs"
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              style={{
                marginBottom: 12,
                height: 10,
                marginLeft: 1000,
                marginRight: 1000,
              }}
            />

            {fillArray(
              ratedNumberOfCards < numberOfCards
                ? ratedNumberOfCards
                : numberOfCards
            ).map((id) => (
              <_Card
                id={id}
                page={_page}
                isErrors={isErrors}
                isUserRated={true}
                key={simpleHash(`${Math.random()}`)}
                search={search}
                nothinWasfound={nothinWasfound}
              />
            ))}
          </Space>
        </div>
        <Pagination
          className="pagination"
          align="center"
          defaultCurrent={_page}
          total={_totalPages}
          showSizeChanger={false}
          onChange={changePage}
        />
      </>
    );

    if (!isSearchActive && ratedNumberOfCards === 0) return (
      <>
        <div className="centered">
          <Space size={[32, 32]} wrap className="cards">
            <Tabs
              className="tabs"
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              style={{
                marginBottom: 12,
                height: 10,
                marginLeft: 1000,
                marginRight: 1000,
              }}
            />
            <Alert
              className="alert-not-found"
              message="Rate a movie to see rated list"
              type="warning"
              showIcon
              style={{ marginBottom: '100rem', top: '60px', fontSize: '24px'}}
            />
          </Space>
        </div>
      </>
    )
    
}
