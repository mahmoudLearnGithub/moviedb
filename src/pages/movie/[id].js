import React, { useEffect, useState } from 'react';
import { api, IMAGE_BASE_URL } from '@/app/api/api'; // Ensure this is pointing to the right file
import { useRouter } from 'next/router';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/app/components/Navbar';

const MovieDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;  // Extract the movie ID from the URL
    const [movie, setMovie] = useState(null); // State to hold movie details
    const [cast, setCast] = useState([]);     // State to hold movie cast

    // useEffect(() => {
    //     if (!id) return; // If no ID, return

    //     console.log('Fetching movie details for ID:', id);

    //     // Fetch movie details
    //     api.get(`/movie/${id}`)
    //         .then((response) => {
    //             console.log('Movie response data:', response.data);  // Debug the movie data
    //             setMovie(response.data); // Set the movie data in state
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching movie details:', error);  // Handle errors
    //         });

    //     // Fetch movie cast
    //     api.get(`/movie/${id}/credits`)
    //         .then((response) => {
    //             console.log('Cast response data:', response.data); // Debug the cast data
    //             setCast(response.data.cast);  // Set the cast data in state
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching movie cast:', error);  // Handle errors
    //         });
    // }, [id]);  // This effect will run when the `id` changes
    useEffect(() => {
        if (!id) return; // If no ID, return
        
        console.log('Movie ID:', id); // Log the ID here
    
        // Fetch movie details
        api.get(`/movie/${id}`)
            .then((response) => {
                console.log('Movie response data:', response.data);
                setMovie(response.data);
            })
            .catch((error) => {
                console.error('Error fetching movie details:', error);
            });
    
        // Fetch movie cast
        api.get(`/movie/${id}/credits`)
            .then((response) => {
                console.log('Cast response data:', response.data);
                setCast(response.data.cast);
            })
            .catch((error) => {
                console.error('Error fetching movie cast:', error);
            });
    }, [id]);
    useEffect(() => {
        console.log('Current ID:', id); // Log every time useEffect runs
        if (!id) return;
    
        // Fetching logic...
    }, [id]);
    useEffect(() => {
        console.log('Router Query:', router.query); // Log the entire router query
    }, [router.query]);
    useEffect(() => {
        console.log('Current ID:', id); // Log ID on each render
        console.log('Router Query:', router.query); // Log the entire query object
    
        if (!id) return; // If no ID, return
    
        // Fetch movie details
        api.get(`/movie/${id}`)
            .then((response) => {
                console.log('Movie response data:', response.data);
                setMovie(response.data);
            })
            .catch((error) => {
                console.error('Error fetching movie details:', error);
            });
    
        // Fetch movie cast
        api.get(`/movie/${id}/credits`)
            .then((response) => {
                console.log('Cast response data:', response.data);
                setCast(response.data.cast);
            })
            .catch((error) => {
                console.error('Error fetching movie cast:', error);
            });
    }, [id]);
                
    if (!movie) return <div className="text-center text-white mt-10">Loading...</div>; // Show loading state

    return (
        <>
            <Navbar/>
            <div className="container my-4 text-white">
                <Link href="/" passHref>
                    <p className="text-primary mb-4">&larr; Back to List</p>
                </Link>

                <div className="row mb-4 border-bottom border-light pb-4">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <img 
                            src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                            alt={movie.title} 
                            className="img-fluid rounded shadow-lg"
                            onError={(e) => e.target.src = 'https://media.geeksforgeeks.org/wp-content/uploads/20240805102426/pta.jpg'}
                        />
                    </div>
                    <div className="col-md-8">
                        <h1 className="display-4 mb-2">{movie.title}</h1>
                        <div className="mb-4">
                            <span className="badge bg-warning text-dark mr-2">Rating: {movie.vote_average}</span>
                            <span className="mr-2">{movie.runtime} min</span>
                            <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
                        </div>
                        <p className="mb-2 text-dark"><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
                        <h2 className="h4 text-dark mb-2">Overview</h2>
                        <p className='text-dark'>{movie.overview}</p>
                    </div>
                </div>

                <h2 className="h4 mb-4 border-bottom border-light pb-2">Cast</h2>
                <div className="row">
                    {cast.map(member => (
                        <div key={member.cast_id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex flex-column align-items-center">
                            <div className="position-relative">
                                <img 
                                    src={member.profile_path ? `${IMAGE_BASE_URL}${member.profile_path}` : 'https://media.geeksforgeeks.org/wp-content/uploads/20240805102426/pta.jpg'} 
                                    alt={member.name} 
                                    className="img-fluid rounded-circle"
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    onError={(e) => e.target.src = 'https://media.geeksforgeeks.org/wp-content/uploads/20240805102426/pta.jpg'}
                                />
                            </div>
                            <p className="font-weight-bold text-center mt-2">{member.name}</p>
                            <p className="text-muted text-center">{member.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MovieDetailPage;
