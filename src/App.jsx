import { useEffect, useState } from "react";
import MovieCard from "./movieCart.jsx";
import MovieModal from './MovieModal.jsx';
import './index.css'

async function fetchData(name, page = 1) {
    const response = await fetch(`https://www.omdbapi.com/?s=${name}&apikey=33f76330&page=${page}`);
    const data = await response.json();
    return data.Search || [];
}

async function fetchMovieDetails(imdbID) {
    const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=33f76330`);
    const data = await res.json();
    return data;
}

function App() {
    const [inputSearch, setInputSearch] = useState('Batman');
    const [fetchMovie, setFetchMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // Show modal
    const handleCardClick = (imdbID) => {
        setLoading(true);
        fetchMovieDetails(imdbID).then(data => {
            setSelectedMovie(data);
            setShowModal(true);
            setIsClosing(false); // 🔧 ensure not closing on open
            setLoading(false);
        });
    };

    // Close modal
    const handleCloseModal = () => {
        setIsClosing(true); // 🔄 start closing
        setTimeout(() => {
            setShowModal(false); // 🔄 unmount AFTER animation
            setSelectedMovie(null);
        }, 300); // ⏱ match animation time
    };

    // Prevent scroll when modal open
    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : 'auto';
    }, [showModal]);

    const handleClick = () => {
        setLoading(true);
        setError(null);
        setCurrentPage(1);
        fetchData(inputSearch, 1).then(data => {
            setFetchMovie(data);
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        fetchData(inputSearch, currentPage).then(data => {
            setFetchMovie(data);
            setLoading(false);
        });
    }, [currentPage]);


    return (
        <div>
            {error && <p className="error">{error}</p>}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleClick();
                        }
                    }}
                />
                <button onClick={handleClick}>Search</button>
            </div>
            {loading ? (
                <div className="spinner"></div>
            ) : fetchMovie && fetchMovie.length > 0 ? (
                <div>
                    <div className="movie-grid">
                        {fetchMovie.map(movie => (
                            <MovieCard key={movie.imdbID} {...movie} onClick={() => handleCardClick(movie.imdbID)} />
                        ))}
                    </div>
                    {showModal && (
                        <MovieModal
                            movie={selectedMovie}
                            onClose={handleCloseModal}
                            isClosing={isClosing}
                        />
                    )}

                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage}</span>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={fetchMovie.length === 0}
                        >
                            Next
                        </button>
                    </div>

                </div>
            ) : (
                <p className="no-results">No results found for "{inputSearch}".</p>
            )}
        </div>
    );
}


export default App;