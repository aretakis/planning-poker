import React, {Component} from 'react';
import Poll from '../poll/Poll';
import {connect} from 'react-redux';
import {createPoll, getPoll} from '../redux/actions/pollActions';
import './dashboard.css';

class Dashboard extends Component {

    state = {
        description: '',
        identifier: '',
        poll: {identifier: ''},
        requestedPoll: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        nextProps.errors && this.setState({errors: nextProps.errors});
        nextProps.poll && this.setState({poll: nextProps.poll});
    }

    createNewPoll = (e) => {
        e.preventDefault();
        let poll = {description: this.state.description, identifier: this.state.identifier.toUpperCase()};
        this.props.createPoll(poll);
        this.setState({description: '', requestedPoll: poll.identifier, identifier: ''})
    };

    getRequestedPoll = (e) => {
        e.preventDefault();
        const identifier = this.state.requestedPoll;
        this.props.getPoll(identifier);
    };

    setPollDetails = (e) => {
        const {name, value} = e.target;
        if (name === 'requestedPoll' || name === 'identifier') {
            this.setState({[name]: value.toUpperCase(), vote: null});
        }
        else this.setState({[name]: value});
    };

    render() {
        const {errors, requestedPoll, poll, identifier, description} = this.state;
        return (
            <div className="inner-container">
                <h1 className="margin-bottom--xl">Planning poker</h1>
                <h3>Vote on existing poll?</h3>
                <form className="flex-container" onSubmit={(e) => this.getRequestedPoll(e)}>
                    <input type="text" className="custom-input"
                           minLength="4" maxLength="4"
                           placeholder="Type identifier here"
                           name="requestedPoll"
                           value={requestedPoll}
                           onChange={(e) => this.setPollDetails(e)}/>
                    <button type="submit" className="btn btn-primary"
                            disabled={!requestedPoll}>Search
                    </button>
                </form>
                {errors.onGetError && (
                    <p className="error-message">Could not fetch requested poll</p>)}
                {poll.identifier && (requestedPoll === poll.identifier) && (
                    <Poll poll={poll} requestedPoll={requestedPoll}/>
                )}
                <div className="margin-top--md">
                    <h3>Add a new poll</h3>
                    <form className="flex-container"
                          onSubmit={(e) => this.createNewPoll(e)}>
                        <input type="text" className="custom-input"
                               minLength="4" maxLength="4"
                               name="identifier"
                               placeholder="Type unique code (4 letters)"
                               value={identifier}
                               onChange={(e) => this.setPollDetails(e)}
                               required
                        />
                        <input type="text" className="custom-input"
                               name="description"
                               placeholder="Description"
                               onChange={(e) => this.setPollDetails(e)}
                               value={description}
                               required
                        />
                        <button type="submit" className="btn btn-primary"
                                disabled={!description || identifier.length !== 4}>
                            Create
                        </button>
                    </form>
                    {errors.onCreateError && (<p className="error-message">Could not create new poll</p>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    poll: state.poll,
    errors: state.errors
});


export default connect(mapStateToProps, {createPoll, getPoll})(Dashboard);