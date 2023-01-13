import { API_URLS } from "../utils/constants";

// all api calls are redirected from here which are customized according to the guide
const customFetch = async (url, { body, ...customConfig }) => {


    const headers = {
        'content-type': 'application/json; charset=UTF-8',
    };

    const config = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (data) {
            return {
                data: data,
                success: true,
            };
        }

        throw new Error(data.message);
    } catch (error) {
        console.error('error');
        return {
            message: error.message,
            success: false,
        };
    }

};

export const getAllAlbums = () => {
    return customFetch(API_URLS.getAllAlbums(), {
        method: 'GET',
    });
};


export const updateAlbum = (albumId, updatedId, updatedUserId, updatedTitle) => {
    return customFetch(API_URLS.updateAlbum(albumId), {
        method: 'PUT',
        body: { id: updatedId, userId: updatedUserId, title: updatedTitle }
    });
};

export const deleteAlbum = (albumId) => {
    return customFetch(API_URLS.deleteAlbum(albumId), {
        method: 'DELETE',
    });
};

export const addAlbum = (albumId, albumUserId, albumTitle) => {
    return customFetch(API_URLS.addAlbum(), {
        method: 'POST',
        body: { id: albumId, userId: albumUserId, title: albumTitle }
    });
};
