import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';

class AppMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            menuItems: [
                {
                    title: 'List all available movies',
                    img: '',
                    path: '/available-movies'
                },
                {
                    title: 'Show my movies',
                    img: '',
                    path: '/my-movies'
                },
                {
                    title: 'Purchase a movie',
                    img: '',
                    path: '/purchase-movie'
                },
                {
                    title: 'Show credit balance',
                    img: '',
                    path: '/credit-balance'
                },
                {
                    title: 'Search movies',
                    img: '',
                    path: '/search-movies'
                },
            ]
        };
    }

    render() {
        if (document.location.pathname === '/') {
            return <Box
                direction="column"
                alignItems="center"
                justifyContent="center"
                display="flex"
                flexWrap="wrap"
                p={0}
                m={1}
                bgcolor="background.paper"
                css={{ maxWidth: 600, height: 200 }}
            >
                {this.state.menuItems.map(tile => (
                    <a href={tile.path} style={{ textDecoration: 'none' }}>
                        <Box m={5} p={1}
                            display="flex"
                            alignItems="center"
                            justifyContent='center'
                            bgcolor="grey.300" css={{ width: 200, height: 100 }}>
                            {tile.title}
                        </Box>
                    </a>
                ))}
            </Box>;
        }
        else {
            return <Box display="flex" p={1} bgcolor="background.paper">
                <Box m={1} p={1} order={0}
                    bgcolor="grey.300">
                    <a href='/'>
                        <SvgIcon>
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </SvgIcon>
                    </a>
                </Box>
                {this.state.menuItems.map((tile, idx) => (
                    <Box m={1} p={1} order={idx + 1}
                        bgcolor="grey.300">
                        <a href={tile.path} style={{ textDecoration: 'none' }}>{tile.title}</a>
                    </Box>
                ))}
            </Box>;
        }
    }
}

export default withStyles()(AppMenu);