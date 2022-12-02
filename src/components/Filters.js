import React from "react";
import './Filters.css';
import logo_color from "../assets/jamz-logo-color.svg";
import {
    Box,
    Button,
    Drawer,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup
} from "@mui/material";

const drawerWidth = 350;

export default function Filters(props) {
    let musicData = props.musicData;
    const setData = props.setData;
    
    const sortData = (property) => {
        // copy data over
        let updatedData = [...musicData];

        if (property === "total_tracks") {
            // sort in descending order
            updatedData.sort((itemA, itemB) => {
            return itemB[property] - itemA[property];
            });
        } else if (property === "name") {
            // sort alphabetically
            updatedData.sort((itemA, itemB) => {
            if (itemA[property] < itemB[property]) {
                return -1;
            }
            if (itemA[property] > itemB[property]) {
                return 1;
            }
            return 0;
            })
        } else if (property === "release_date") {
            // sort newest -> oldest
            updatedData.sort((itemA, itemB) => {
            if (itemA[property] < itemB[property]) {
                return 1;
            }
            if (itemA[property] > itemB[property]) {
                return -1;
            }
            return 0;
            })
        }
        // update the data
        setData(updatedData);
    };

    const updateFilters = (filter, value) => {
        // copy filters over
        const updatedFilters = {...props.filters};

        if (filter === "date") {
            updatedFilters[filter][value] = !(props.filters[filter][value]);
        }
        else {
            updatedFilters[filter] = value;
        }
        
        props.setFilters(updatedFilters);
    }

    const resetFilters = () => {
        const updatedFilters = {...props.filters};

        updatedFilters["favorites"] = false;
        updatedFilters["type"] = "All";
        updatedFilters["date"]["today"] = false;
        updatedFilters["date"]["yesterday"] = false;

        props.setFilters(updatedFilters);
    }

    return (
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                padding: 4,
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: 'white',
                color: 'rgb(74, 104, 134)'
            },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box className="logo-container side-logo-container">
                <img src={logo_color} className="logo" alt="logo"/>
            </Box>

            <FormControl>
                <Box className="filters">
                    <Box className="filter-header">
                        <h3>Filter By</h3>
                        <Button className="reset-filters" onClick={() => resetFilters()}>Reset Filters</Button>
                    </Box>

                    <hr/>

                    <FormLabel component="legend">Type</FormLabel>
                    <RadioGroup defaultValue={"All"}>
                        <FormControlLabel
                            control={<Radio color="default" onClick={() => updateFilters("type", "All")}/>}
                            label="All" value="All" checked={props.filters["type"] === "All"}
                        />
                        <FormControlLabel
                            control={<Radio color="default" onClick={() => updateFilters("type", "single")}/>}
                            label="Singles" value="Singles" checked={props.filters["type"] === "single"}
                        />
                        <FormControlLabel
                            control={<Radio color="default" onClick={() => updateFilters("type", "album")}/>}
                            label="Albums" value="Albums" checked={props.filters["type"] === "album"}
                        />
                    </RadioGroup>

                    <FormLabel className="label-header" component="legend">Release Date</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox 
                                color="default" 
                                onClick={() => updateFilters("date", "today")}/>}
                            label="Today" value="Today"
                            checked={props.filters["date"]["today"]}
                        />
                        <FormControlLabel
                            control={<Checkbox 
                                color="default" 
                                onClick={() => updateFilters("date", "yesterday")}/>}
                            label="Yesterday" value="Yesterday"
                            checked={props.filters["date"]["yesterday"]}
                        />
                    </FormGroup>

                    <FormLabel className="label-header" component="legend">Other</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox 
                                color="default" 
                                onClick={() => {
                                    updateFilters("favorites", !(props.filters["favorites"]));
                                }}/>}
                            label="Favorites" value="Favorites"
                            checked={props.filters["favorites"]}
                        />
                        <h4 className="track-counter">Total Tracks in Favorites: {props.totalTracks}</h4>
                    </FormGroup>
                </Box>

                <Box className="sorting">
                    <h3>Sort By</h3>
                    <hr/>
                    <FormGroup>
                        <RadioGroup>
                            <FormControlLabel
                                control={<Radio color="default" eventKey="single" onClick={() => sortData("total_tracks")}/>}
                                label="# Tracks" value="# Tracks"
                            />
                            <FormControlLabel
                                control={<Radio color="default" eventKey="single" onClick={() => sortData("release_date")}/>}
                                label="Release Date" value="Release Date"
                            />
                            <FormControlLabel
                                control={<Radio color="default" eventKey="album" onClick={() => sortData("name")}/>}
                                label="Alphabetical" value="Alphabetical"
                            />
                        </RadioGroup>
                    </FormGroup>
                </Box>

            </FormControl>
        </Drawer>
    )
}