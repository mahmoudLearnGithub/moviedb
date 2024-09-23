// MovieCard.js

import React from 'react';
import Link from 'next/link';
import { IMAGE_BASE_URL } from '../api/api.js';

const MovieCard = ({ movie }) => {
    return (
        <div className="card shadow-sm mb-4 bg-gray">
            <Link href={`/movie/${movie.id}`} passHref>
                <div className="position-relative">
                    <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="card-img-top"
                    />
                    <div className="position-absolute top-0 start-0 m-2
                    bg-danger text-white text-xs 
                    font-weight-bold py-1 px-2 rounded">
                        {new Date(movie.release_date).getFullYear()}
                    </div>
                </div>
            </Link>
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="bg-warning text-dark text-xs 
                    font-weight-bold px-2 py-1 rounded">
                        ★ {movie.vote_average}
                    </span>
                    <span className="text-secondary text-xs font-weight-bold">
                        Popularity: {movie.popularity}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
