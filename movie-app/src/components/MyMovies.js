import React from 'react';
import MoviesDisplay from './MoviesDisplay';

class MyMovies extends React.Component {
    render() {
        return <MoviesDisplay userMoviesOnly={true} />
    }
}

export default MyMovies;
