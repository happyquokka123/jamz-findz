import React, { useState, useEffect } from "react";
import './Album.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Button } from "@mui/material";

export default function Album(props) {
    const image = props.item.images[0].url;
    const name = props.item.name;
    const release_date = props.item.release_date;
    const type = props.item.album_type;
    const artists = props.item.artists;
    const fav_items = props.favItems;
    const num_tracks = props.item.total_tracks;
    const [isFavorite, setFavorite] = useState(false);

    const updateFavs = () => {
        let isFavorite = fav_items.includes(props.item);

        if (!isFavorite) {
            props.setTotalTracks(props.totalTracks + num_tracks);

            let updatedFavs = [...fav_items, props.item];
            props.setFavItems(updatedFavs);
        } else {
            props.setTotalTracks(props.totalTracks - num_tracks);

            let updatedFavs = fav_items.filter((item) => {
                return item !== props.item;
            })
            props.setFavItems(updatedFavs);
        }
    }

    // when fav_items changes, update the isFavorite state so that icon is updated
    useEffect(() => {
        if (fav_items.includes(props.item)) {
            setFavorite(true);
        } else {
            setFavorite(false);
        }
    }, [fav_items])

    return (
        <Box className="album">
            <img className="album-img" src={image} alt="album-cover"></img>
            <div className="album-info">
                <Box className="top-container">
                    <div className="category">
                        <h4>{type}</h4>
                    </div>
                    <Box className="name-date-artist">
                        <h2 className="album-name">{name}</h2>
                        <p className="release-date">{release_date}</p>
                        <Box className="artists-container">
                            {artists.map((artist) => (
                                <p className='artist'>{artist.name}</p>
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box className="bottom-container">
                    <p className="track">{num_tracks} tracks</p>
                    <Button className="add-to-fav fade" onClick={() => updateFavs()}>{isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</Button>
                </Box>
            </div>
        </Box>
    )
}