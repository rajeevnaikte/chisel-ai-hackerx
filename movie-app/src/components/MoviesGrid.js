import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: 10,
        width: 150,
        display: 'flex'
    },
    image: {
        width: 128,
        height: 20,
        backgroundColor: '#f1f1f1'
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    watched: {
        color: 'green'
    }
}));

export default function MoviesGrid(props) {
    const classes = useStyles();

    return (
        <Box p={1} direction="column"
        display="flex"
        flexWrap="wrap"
        bgcolor="background.paper"
        css={{ maxWidth: 700, height: 200 }}>
                {props.movies.map(movie => (
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom noWrap>
                                            {`Rating: ${movie.rating}`}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom className={classes.watched}>
                                            {movie.watched?'Watched':'Not Watched'}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" noWrap>{`Cost: ${movie.cost}`}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
        </Box>
    );
}
