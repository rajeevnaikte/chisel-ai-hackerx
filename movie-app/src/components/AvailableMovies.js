import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import VerticalTabs from './VerticalTabs'

class AvailableMovies extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        fetch("/api/movies/genre")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        genres: result.genres
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
        if (!this.state.genres) {
            return <CircularProgress />;
        }
        if (this.state.error) {
            return <div style={{color: 'red'}}>Error loading data.</div>
        }
        return <VerticalTabs genres={this.state.genres} />
    }
}

export default AvailableMovies;
