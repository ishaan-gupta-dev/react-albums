import { useContext, useEffect, useState } from "react";
import { AlbumsContext } from "../providers";
import { getAllAlbums } from "../api";

// this hook is used to store and edit the global state of albums
export const useAlbums = () => {
    return useContext(AlbumsContext);
}

export const useProvideAlbums = () => {
    // console.log("inside use provide albums");
    const [albums, setAlbums] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // console.log("inside use effect");
        const fetchAllAlbums = async () => {
            const response = await getAllAlbums();
            // console.log('response', response);
            if (response.success) {
                setAlbums(response.data);
            }
            setLoading(false);
        }
        fetchAllAlbums();
    }, []);


    const addAlbumToState = (album) => {
        const newAlbums = [album, ...albums];
        setAlbums(newAlbums);
    };

    return {
        data: albums,
        loading,
        addAlbumToState,
    }
};