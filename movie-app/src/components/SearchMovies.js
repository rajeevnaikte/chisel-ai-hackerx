import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'
import MoviesGrid from './MoviesGrid'

class SearchMovies extends React.Component {
    constructor() {
        super();
        this.state = { value: '' };
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    searchMovies() {
        fetch(`/api/movies/search/${this.state.value}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        const movies = result.movies.purchased.concat(result.movies.available);
                        if (movies.length === 0) {
                            this.setState({noMovies: true, movies: []});
                        }
                        else {
                            this.setState({movies, noMovies: false});
                        }
                    },
                    (error) => {
                        console.log(error);
                        this.setState({error: true});
                    }
                );
    }

    render() {
        return <div>
            <InputBase
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                placeholder="Search Movies"
                inputProps={{ 'aria-label': 'search movies' }}
                onKeyUp={(ev) => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      this.searchMovies();
                    }
                  }}
                m={2}
                style={{width: 800}}
            />
                <Button onClick={this.searchMovies.bind(this)}><SearchIcon /></Button>
            {this.state.movies? <MoviesGrid movies={this.state.movies} /> : null}
            {this.state.noMovies? <div>No movies found for the search.</div> : null}
        </div>
    }
}

export default SearchMovies
