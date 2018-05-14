import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
            events: []
        }
        this.loadTrainings = this.loadTrainings.bind(this);
        this.mapEvents = this.mapEvents.bind(this);
    }
    componentDidMount() {
        this.loadTrainings();
    }
    mapEvents = () => {
        let newEvents = [], i = 0;
        for (let training of this.state.trainings) {
            let item = {}
            item.id = i;
            i++;
            item.title = training.activity;
            item.allDay = false;
            item.start = new Date(moment(training.date).format());
            item.end = new Date(moment(training.date).add(training.duration, 'minutes').format());
            newEvents.push(item);
        }
        this.setState({ events: newEvents });
        console.log(this.state.events);
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    trainings: responseData.content,
                });
                this.mapEvents();
            })
    }
    render() {
        BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
        return (
            <div style={{ height: 600 }}>
                <BigCalendar
                    selectable
                    events={this.state.events}
                    defaultView="month"
                    timeslots={8}
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    onSelectEvent={event => alert(
                        `Activity: ${event.title}` +
                        `\nStart: ${moment(event.start).format('MMMM Do YYYY, h:mm a')} ` +
                        `\nEnd: ${moment(event.end).format('MMMM Do YYYY, h:mm a')}`
                    )}

                />
            </div>
        );
    }
}

export default Calendar;