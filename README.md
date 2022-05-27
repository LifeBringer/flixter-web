# 🍿 Flixster

**Flixter** is a movie listing website showing the latest movies currently playing in theaters. The web app is built with vanilla HTML, CSS and JavaScript and utilizes [the Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction).

Estimated time spent: **5** hours spent in total

Deployed Application: [Flixster Deployed Site](https://flixster-web.netlify.app/)

### Application Features

#### CORE FEATURES

- [x] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [x] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [x] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [x] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [x] Website accounts for basic HTML/CSS accessibility features
- [x] Website should be responsive

#### STRETCH FEATURES

- [x] Deploy website using GitHub Pages. 
- [x] Allow user to view more details about a movie within a popup.
- [x] Improve the user experience through CSS & animation.
- [x] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [x] Implement anything else that you can get done to improve the app functionality!

### Walkthrough Video

https://user-images.githubusercontent.com/1930836/170697659-2ab87532-208f-4b8a-8309-3627429a0cec.mp4

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, asynchronous calls and the variants were essential for the success of this project. The pacing from html, css, and finally javascript was helpful in building up understanding of how to piece items together. The strech goals such as 'hover' should have been fleshed out better.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
With more time, I would like to implement an applicable dark mode framework.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

It went well.

### Open-source libraries used

- [tmdb API](https://developers.themoviedb.org/3/getting-started/introduction)
- [youtube iframe api](https://developers.google.com/youtube/iframe_api_reference)

### Shout out

Codepath Staff, Codepath is a great place to learn and grow.



