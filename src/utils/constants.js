// this file contains all the api urls 
const API_ROOT = "https://jsonplaceholder.typicode.com/albums";

export const API_URLS = {
    getAllAlbums: () => `${API_ROOT}`,
    updateAlbum: (albumId) => `${API_ROOT}/${albumId}`,
    deleteAlbum: (albumId) => `${API_ROOT}/${albumId},`,
    addAlbum: () => `${API_ROOT}`,
};