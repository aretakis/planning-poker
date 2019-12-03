import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getPoll} from '../redux/actions/pollActions';
import './poll.css';

class Poll extends Component {

    state = {
        applicableVotes: [0, 1 / 2, 1, 2, 3, 5, 8, 13],
        name: '',
        vote: null,
        poll: {identifier: '', votes: [], name: ''},
        errors: {onCreateError: false, onGetError: false}
    };

    componentDidMount() {
        this.timer = setInterval(()=> this.props.getPoll(this.props.requestedPoll), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.poll) {
            this.setState({poll: nextProps.poll})
        }
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    setPollDetails = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    registerVote = () => {
        const newVote = {name: this.state.name, voteValue: this.state.vote, identifier: this.props.requestedPoll};
        if (newVote.voteValue !== null && newVote.name !== '' && newVote.identifier !== null) {
            axios.post('api/poll/vote', newVote);
            //update state with happy case
            this.updateStateVotes(newVote)
        }
    };

    updateStateVotes(newVote) {
        let updatedVotes;
        //If user has voted already, update the existing vote
        if(this.state.poll.votes.find(vote => vote.name === newVote.name)) {
            updatedVotes = this.state.poll.votes.map(vote =>
                vote.name === newVote.name ? {...vote, ...{voteValue: newVote.voteValue}} : vote);
        }//else add the vote to the state.poll.votes list
        else updatedVotes = [...this.state.poll.votes, newVote];
        this.setState({poll: {...this.state.poll, votes: updatedVotes}});
    }

    isVoteByUser(vote) {
        return vote.name === this.state.name
    }

    render() {
        const {poll, applicableVotes, vote, name} = this.state;
        return (
            poll.identifier && (
                <div className="margin-bottom--xl">
                    <h3>Poll "{poll.identifier}"</h3>
                    <h4>Description: {poll.description}</h4>
                    <input type="text" className="custom-input" name="name"
                           value={name}
                           onChange={(e) => this.setPollDetails(e)}
                           placeholder="Type your name"/>
                    <p>Select your estimate below</p>
                    <div className="vote-cards">
                        {applicableVotes.map(voteValue =>
                            <button key={voteValue} className="vote-card" value={voteValue} name="vote"
                                    onClick={(e) => this.setPollDetails(e)}>{voteValue}</button>
                        )}
                    </div>
                    <button
                        className="btn btn-primary"
                        disabled={!vote || name === ''}
                        onClick={() => this.registerVote()}>
                        Vote
                    </button>
                    <h4 className="margin-right--md margin-top--md">Recent votes: </h4>
                    {poll.votes && poll.votes.map(vote =>
                        <span key={vote.name} className={`${name && this.isVoteByUser(vote) ? 'user-vote' : 'vote'}`}>{vote.voteValue + ' '}</span>)}
                </div>
            )
        );
    }
}

const mapStateToProps = state => ({
    poll: state.poll,
    errors: state.errors
});

export default connect(mapStateToProps, {getPoll})(Poll);