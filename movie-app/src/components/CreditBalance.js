import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

class CreditBalance extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        fetch('/api/credit/balance')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        balance: result.balance
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
        if (!this.state.balance) {
            return <CircularProgress />;
        }
        if (this.state.error) {
            return <div style={{ color: 'red' }}>Error loading data.</div>
        }
        return <Box p={2}>{`Balance: ${this.state.balance}`}</Box>
    }
}

export default CreditBalance;
