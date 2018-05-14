import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
class AddTrainingCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            duration: '',
            activity: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    dateChanged = (date) => {
        this.setState({ date: date });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newTraining = {
            date: moment(this.state.date).format(),
            duration: this.state.duration,
            activity: this.state.activity,
            customer: this.props.customer
        }
        console.log(this.state.date);
        console.log(moment(this.state.date).format());
        this.props.addTraining(newTraining);
        this.simpleDialog.hide();
    }

    render() {
        var myDialog = {
            width: '50%'
        };
        return (
            <div>
                <SkyLight dialogStyles={myDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add training to customer">
                    <form>
                        <div>
                            <DateTimePicker name="date" hintText="Date and time" onChange={this.dateChanged}
                                DatePicker={DatePickerDialog} TimePicker={TimePickerDialog} fullWidth={true} />
                        </div>
                        <div>
                            <TextField type="number" hintText="Duration (minutes)" name="duration" onChange={this.handleChange} fullWidth={true} />
                        </div>
                        <div>
                            <TextField  hintText="Activity" name="activity" onChange={this.handleChange} fullWidth={true} />
                        </div>
                        <RaisedButton onClick={this.handleSubmit} primary={true} label="Submit" />
                    </form>
                </SkyLight>
                <FlatButton onClick={() => { this.simpleDialog.show() }} default={true} label="Add Training" />
            </div>
        );
    }
}

export default AddTrainingCustomer;