import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/omdbApi';
import { Container, Card, Alert, Row, Col } from 'react-bootstrap';
import '../styles/MovieDetail.scss';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(id);
        if (response.data.Response === "True") {
          setMovie(response.data);
          setError(null);
        } else {
          setMovie(null);
          setError(response.data.Error);
        }
      } catch (err) {
        setMovie(null);
        setError('An error occurred while fetching movie details.');
        console.error('Error fetching movie details:', err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const imdbRating = movie?.Ratings?.find(rating => rating.Source === 'Internet Movie Database')?.Value;

  const fixFirstLetter = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const isValidInfo = (info) => info && info !== 'N/A';

  const displayInfo = (title, content) => {
    return isValidInfo(content) ? (
      <Card.Text>
        <strong>{title}:</strong> {content}
      </Card.Text>
    ) : null;
  };

  return (
    <Container className="movie-detail-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {movie && movie.Response === "True" && (
        <Card className="movie-detail-card">
          <Row className="no-gutters">
            <Col md={4} className="movie-detail-img-wrapper">
              <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
            </Col>
            <Col md={8} className="movie-detail-info">
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                {displayInfo('Plot', movie.Plot)}
                {displayInfo('Director', movie.Director)}
                {displayInfo('Actors', movie.Actors)}
                {displayInfo('Genre', movie.Genre)}
                {displayInfo('Language', movie.Language)}
                {displayInfo('Released', movie.Released)}
                {displayInfo('Runtime', movie.Runtime)}
                {displayInfo('Type', fixFirstLetter(movie.Type))}
                {displayInfo('IMDb Rating', imdbRating || movie.imdbRating)}
                {displayInfo('Awards', movie.Awards)}
                {displayInfo('Box Office', movie.BoxOffice)}
                {displayInfo('Country', movie.Country)}
                {displayInfo('DVD', movie.DVD)}
                {displayInfo('Production', movie.Production)}
                {displayInfo('Writer', movie.Writer)}
                {displayInfo('Metascore', movie.Metascore)}
                {displayInfo('Total Seasons', movie.totalSeasons)}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
}

export default MovieDetail;
