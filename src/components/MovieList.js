import React, { useState, useEffect } from "react";
import { searchMovies, getMovieDetails } from "../api/omdbApi";
import { Link } from "react-router-dom";
import { Pagination, Container, Row, Col, Card, Form, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart, FaEraser } from "react-icons/fa";
import "../styles/MovieList.scss";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Pokemon");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [currentPg, setCurrentPg] = useState(1);
  const [totalFilms, setTotalFilms] = useState(0);
  const [loading, setLoading] = useState(false);
  const [getFetch, setGetFetch] = useState(true);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    if (!getFetch) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response1 = await searchMovies(searchTerm, currentPg, year, type);
        const moviesData = response1.data.Search || [];
        setTotalFilms(Number(response1.data.totalResults) || 0);

        const moviesWithDetails = await Promise.all(
          moviesData.map(async (movie) => {
            const details = await getMovieDetails(movie.imdbID);
            return { ...movie, imdbRating: details.data.imdbRating };
          })
        );

        setMovies(moviesWithDetails);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
      setGetFetch(false);
    };

    fetchMovies();
  }, [searchTerm, year, type, currentPg, getFetch]);

  const handleSearch = () => {
    setCurrentPg(1);
    setGetFetch(true);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setYear("");
    setType("");
    setCurrentPg(1);
    setGetFetch(true);
  };

  const totalPages = Math.ceil(totalFilms / 10);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPg(pageNumber);
      setGetFetch(true);
    }
  };

  const handleEllipsisClick = (direction) => {
    if (direction === "start") {
      setCurrentPg((prev) => Math.max(prev - 10, 1));
    } else {
      setCurrentPg((prev) => Math.min(prev + 10, totalPages));
    }
    setGetFetch(true);
  };

  const renderPaginationItems = () => {
    const items = [];
    let startPage, endPage;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPg <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPg + 5 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPg - 5;
        endPage = currentPg + 4;
      }
    }

    if (startPage > 1) {
      items.push(
        <Pagination.Item
          key={1}
          onClick={() => handlePageChange(1)}
          active={currentPg === 1}
        >
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(
          <Pagination.Ellipsis
            key="startEllipsis"
            onClick={() => handleEllipsisClick("start")}
          />
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          onClick={() => handlePageChange(i)}
          active={currentPg === i}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <Pagination.Ellipsis
            key="endEllipsis"
            onClick={() => handleEllipsisClick("end")}
          />
        );
      }
      items.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          active={currentPg === totalPages}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  const handleFavorite = (movie) => {
    const updatedFavorites = favorites.includes(movie.imdbID)
      ? favorites.filter((fav) => fav !== movie.imdbID)
      : [...favorites, movie.imdbID];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (imdbID) => favorites.includes(imdbID);

  return (
    <Container fluid className="movie-list-container">
      <h1
        className="text-center my-4"
        onClick={() => window.location.reload()}
        style={{ cursor: "pointer" }}
      >
        Movie Guide
      </h1>
      <Form className="mb-4 search-form">
        <Row>
          <Col md={6} className="mb-2">
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
            />
          </Col>
          <Col md={2} className="mb-2">
            <Form.Control
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year..."
            />
          </Col>
          <Col md={2} className="mb-2">
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All</option>
              <option value="movie">Movies</option>
              <option value="series">TV Series</option>
              <option value="episode">TV Episodes</option>
            </Form.Select>
          </Col>
          <Col md={2} className="mb-2 d-flex align-items-center">
            <Button
              variant="primary"
              onClick={handleSearch}
              style={{ marginRight: "20px", width: "75%" }}
            >
              Search
            </Button>
            <Button onClick={handleClearFilters} className="btn-clear">
              <FaEraser color="#0d6efd" />
            </Button>
          </Col>
        </Row>
      </Form>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Row>
          {movies &&
            movies.map((movie) => (
              <Col xs={3} md={2.4} key={movie.imdbID} className="mb-4">
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className="text-decoration-none"
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${movie.imdbID}`}>
                        {movie.Title}
                      </Tooltip>
                    }
                  >
                    <Card className="movie-card">
                      <div className="card-img-wrapper">
                        <Card.Img
                          variant="top"
                          src={
                            movie.Poster ||
                            "https://via.placeholder.com/200x300?text=No+Image"
                          }
                          alt={movie.Title}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="movie-title text-center">
                          {movie.Title}
                        </Card.Title>
                        <div className="movie-info d-flex justify-content-between align-items-center">
                          <div className="movie-year">{movie.Year}</div>
                          <div className="imdb-info">
                            IMDb: {movie.imdbRating || "N/A"}
                          </div>
                          <div
                            className="favorite-icon"
                            onClick={(e) => {
                              e.preventDefault();
                              handleFavorite(movie);
                            }}
                          >
                            {isFavorite(movie.imdbID) ? (
                              <FaHeart color="red" />
                            ) : (
                              <FaRegHeart />
                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </OverlayTrigger>
                </Link>
              </Col>
            ))}
        </Row>
      )}
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPg - 1)}
          disabled={currentPg <= 1}
        >
          <FaChevronLeft />
        </Pagination.Prev>
        {renderPaginationItems()}
        <Pagination.Next
          onClick={() => handlePageChange(currentPg + 1)}
          disabled={currentPg >= totalPages}
        >
          <FaChevronRight />
        </Pagination.Next>
      </Pagination>
    </Container>
  );
}

export default MovieList;
