import './movieCard.css';

function MovieCard({ Title, Year, Type, Poster, imdbID }) {
    return (
        <div className="movie-card">
            <img src={Poster} alt={Title} className="poster" />
            <div className="movie-info">
                <h3>{Title}</h3>
                <p><strong>Year:</strong> {Year}</p>
                <p><strong>Type:</strong> {Type}</p>
            </div>
        </div>
    );
}

export default MovieCard;
