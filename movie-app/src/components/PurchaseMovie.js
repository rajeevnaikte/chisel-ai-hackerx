import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { timeout } from 'q';

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                        {part.text}
                    </span>
                ))}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value) {
    return new Promise((resolve, reject) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength > 2) {
            fetch(`/api/movies/search/${inputValue}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result.movies);
                    },
                    (error) => {
                        resolve({ purchased: [], available: [] });
                    }
                );
        }
    });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

const useStyles = makeStyles(theme => ({
    root: {
        height: 250,
        flexGrow: 1,
        maxWidth: 750
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
}));

export default function PurchaseMovie() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        single: '',
        popper: '',
        movies: []
    });

    const [stateSuggestions, setSuggestions] = React.useState([]);

    const handleSuggestionsFetchRequested = ({ value }) => {
        getSuggestions(value).then(res => {
            setSuggestions(res.purchased.concat(res.available).map(item => {
                return { label: item.title };
            }));
            setState({ ...state, single: value, movies: res });
        });
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = name => (event, { newValue }) => {
        setState({
            ...state,
            [name]: newValue,
        });
    };

    const onPurchase = () => {
        if (state.single.length < 3) {
            setState({
                ...state,
                open: true,
                message: 'Please input minimum three characters'
            });
        }
        else if (state.movies.purchased.map(item => item.title).includes(state.single)) {
            setState({
                ...state,
                open: true,
                message: 'You have already purchased this movie'
            });
        }
        else if (!state.movies.available.map(item => item.title).includes(state.single)) {
            setState({
                ...state,
                open: true,
                message: 'No movie found for the query'
            });
        }
        else {
                fetch('/api/movie/purchase', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        movieName: state.single
                    })
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        setState({
                            ...state,
                            open: true,
                            message: (result.noBalance ? 'Not enough credit remaining to purchase this movie' : 
                                (result.success ? 'Purchased.' : 'Failed to purchase.'))
                        });
                    },
                    (error) => {
                        setState({
                            ...state,
                            open: true,
                            message: 'Failed to purchase.'
                        });
                    }
                );
        }
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false
        });
    };

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
    };

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    id: 'react-autosuggest-simple',
                    label: 'Movie',
                    placeholder: 'Enter a movie name',
                    value: state.single,
                    onChange: handleChange('single'),
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
            <Box css={{ margin: 10 }} width={500}>
                <Button color="primary" onClick={onPurchase} disabled={state.purchaseDisabled}>
                    Purchase
                </Button>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.open}>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            {state.message}
                            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                                x
                            </IconButton>
                        </Typography>
                    </DialogContent>
                </Dialog>
            </Box>
        </div>
    );
}
