// HomePage.js

import React, { useEffect, useState } from 'react';
import { api } from '../api/api'; // Adjust import path as needed
import MovieCard from './MovieCard';
import Pagination from './Pagination'; // Import the Pagination component
import Navbar from './Navbar';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const endpoint = searching ? '/search/movie' : '/movie/popular';
                const response = await api.get(endpoint, {
                    params: { 
                        page: currentPage, 
                        query: searching ? query : undefined
                    }
                });
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [currentPage, query, searching]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page for new search
        setSearching(true); // Set searching state to true
    };

    const handleReset = () => {
        setQuery('');
        setSearching(false); // Reset search state
        setCurrentPage(1); // Reset to first page
    };

    return (
        <>
            <Navbar />
            <div className="container my-4">
                <div className="d-flex justify-content-between mb-4">
                    <form onSubmit={handleSearch} className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for movies..."
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
                {searching && (
                    <button onClick={handleReset} className="btn 
                    btn-outline-primary mb-4">
                        Reset Search
                    </button>
                )}
                <div className="row">
                    {movies.map(movie => (
                        <div key={movie.id} className="col-12 col-sm-6
                        col-md-4 col-lg-3 mb-4">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={(page) => setCurrentPage(page)} 
                />
            </div>
        </>
    );
};

export default HomePage;
