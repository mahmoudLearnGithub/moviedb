// src/api/api.js
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_KEY_MOVIE_API; // Access the environment variable
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US'
    }
});

export { api, IMAGE_BASE_URL };
