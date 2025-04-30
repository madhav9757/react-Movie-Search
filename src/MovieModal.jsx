import './MovieModal.css';

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
                <div className="modal-content">
                    <div className="modal-image">
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                    <div className="modal-text">
                        <h2>{movie.Title}</h2>
                        <p><strong>Year:</strong> {movie.Year}</p>
                        <p><strong>Genre:</strong> {movie.Genre}</p>
                        <p><strong>Director:</strong> {movie.Director}</p>
                        <p><strong>Actors:</strong> {movie.Actors}</p>
                        <p><strong>Plot:</strong> {movie.Plot}</p>
                        <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                        <p><strong>Runtime:</strong> {movie.Runtime}</p>
                        <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
                        <p><strong>Language:</strong> {movie.Language}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
