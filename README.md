# Development

### Link to Deployed Website
https://happyquokka123.github.io/jamz-findz

### Goal and Value of the Application
This application allows the user to browse through the most recently released albums on Spotify based on its release date, whether it's a single or an album, and find out the number of tracks in each! The user can also add albums to favorites and find out the total number of tracks in their favorites at a glance.

### Usability Principles Considered
- Hierarchy
    - The most apparent usability principle I used was hierarchy. The difference in font weights and sizes in both the Album cards and the sidebar are both meant to create a hierarchy that is intuitive and readable for the user. album vs. single info is also contained in a rounded box for quick access to the particular information.
- User Control
    - The user is able to reset all selected filters via a single click, giving the user more control/freedom.
- Visibility of Status
    - By making the sorting/filtering options and the favorites icon one of checkboxes, radio buttons, or changing icons, I made sure that the status of the page was clear to the user. If these were simply buttons, the user will have a difficult time understanding the page state.

### Organization of Components
I used the below components within the App component to organize my code:
1. <b>Album</b>: this component represents a card that shows each album's data pulled from the Spotify API. 
2. <b>Filter</b>: this component is the sidebar containing the filtering and sorting options displayed.

### How Data is Passed Down Through Components
I pass down the following data through components:
1. <b>filters</b>: A dictionary of all the filters and their respective states.
    - This is passed down through the Filters component and used to update the filters' states when a user checks or unchecks a filter.
2. <b>favItems</b>: A list of favorited albums.
    - This is passed through the Album component and used to add an album to the list when favorited by user.
3. <b>totalTracks</b>: the total number of tracks in all favorited albums.
    - This is passed through both the Album and Filters components. The Album component uses it to add/subtract newly favorited or un-favorited album's track number to/from the total. The Filters component uses this data to display under the Favorites filter option.
4. <b>musicData/setMusicData</b>: the items within the original data pulled from Spotify. JSON of albums and their information.
    - This is passed through the Filters component and used to sort the data when user selects a sorting option.

### How the User Triggers State Changes
There are a number of state changes that can be triggered by the user:
1. <b>filter values</b>: When the user clicks on a radio button or checkbox under filters, the `filters` map gets updated via a call to `updateFilters()` in the Filters component. Because I only render items that match all filters in `App`, this will trigger the items displayed to be re-rendered to match the updated `filters`. Something similar happens when a user clicks on RESET FILTERS button. This triggers a call to `resetFilters()` in `Filters`, which resets all values of `filters` map.
2. <b>sorting</b>: When the user clicks on any of the sorting options, the `sortData()` function is triggered, which sorts the `musicData` prop state in the sorting order defined by each radio button.
3. <b>favorites</b>: When the user clicks on the heart icon on an album card, `updateFavs()` in the `Album` component is called, where the `favItems` prop is updated to include/exclude that album. This update triggers a useEffect callback, which updates the `isFavorite` state for that card. The heart icon changes based on the state of `isFavorite`.

### Side-note
- Because this data is live data pulled from Spotify, I can't guarantee that on the day that you look through my deployed site, there will be data that match the "today" & "yesterday" release date filters. If you're lucky, there might be many releases, but I retrieve only 50 at a time, so if by chance there aren't any matches, please grade based on my code :)) Thank you! (I've tested it on days where there were matches, and it works!)
