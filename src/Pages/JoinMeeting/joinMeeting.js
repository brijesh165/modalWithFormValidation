import React, { Component } from 'react';

import { Button } from 'reactstrap';
import CustomModal from '../../Components/Modal/modal';

class JoinMeeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalValue: false
        }
        
        this.onJoinMeetingButtonClick = this.onJoinMeetingButtonClick.bind(this);
        this.receiveModalValueFromChild = this.receiveModalValueFromChild.bind(this);
    }

    onJoinMeetingButtonClick() {
        console.log("Join Button Meeting");
        this.setState({
            modalValue: !this.state.modalValue
        })
    }

    receiveModalValueFromChild(data) {
        this.setState({
            modalValue: data
        })
    }

    render() {
        return (
            <div>
                <Button color="primary"
                        onClick={this.onJoinMeetingButtonClick}>Join Meeting</Button>

                <CustomModal isOpen={this.state.modalValue} sendModalValueToParent={this.receiveModalValueFromChild}/>
            </div>
        )
    }
}

export default JoinMeeting;