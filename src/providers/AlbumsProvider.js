import { createContext } from "react";
import { useProvideAlbums } from "../hooks";
const initialState = { // initial state of the Albums context
    albums: [],
    loading: true,
    addAlbumToState: () => { },
}

export const AlbumsContext = createContext(initialState);

export const AlbumsProvider = ({ children }) => {
    const albums = useProvideAlbums();
    return (
        <AlbumsContext.Provider value={albums}>
            {children}
        </AlbumsContext.Provider>
    );
}