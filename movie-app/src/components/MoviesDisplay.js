import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import MoviesGrid from './MoviesGrid';

class MoviesDisplay extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        let getMoviesUrl;
        if (this.props.genre) {
            getMoviesUrl = `/api/movies/genre/${this.props.genre}`;
        }
        else {
            getMoviesUrl = '/api/movies/my';
        }
        fetch(getMoviesUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        movies: result.movies.sort((a, b) => a.title.localeCompare(b.title))
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

    }

    render() {
        if (!this.state.movies) {
            return <CircularProgress />
        }
        if (this.state.error) {
            return <div style={{ color: 'red' }}>Error loading data.</div>
        }
        return <MoviesGrid movies={this.state.movies} />
    }
}

export default MoviesDisplay;
