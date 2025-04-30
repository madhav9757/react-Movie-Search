import './MovieModal.css'

function MovieModal({ movie, onClose, isClosing }) {
    if (!movie) return null;

    return (
        <div
            className={`modal-overlay ${isClosing ? 'closing' : ''}`}
            onClick={onClose}
        >
            <div
                className={`modal ${isClosing ? 'closing' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.Title} />
                <p><strong>Year:</strong> {movie.Year}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Plot:</strong> {movie.Plot}</p>
                <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            </div>
        </div>
    );
}

export default MovieModal;