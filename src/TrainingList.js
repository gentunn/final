import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink, CSVDownload } from 'react-csv';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import CustomerList from './CustomerList';

class TrainingList extends Component {

    state = { trainings: [] };

    componentDidMount() {
        this.loadTrainings();
    
    }

    // Load trainings from REST API
    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.content[0].rel !== null) {

                    this.setState({ trainings: responseData.content });
                    this.loadTrainingsCust();
                }
            });
    }
    //load customer for for each training
    loadTrainingsCust = () => {
        for (let training of this.state.trainings) {
            fetch(training.links[2].href)
                .then(res => res.json())
                .then(resData => {
                    training.customer = resData.firstname + ' ' + resData.lastname;
           });
        }
    }

    // Delete training
    onDelClick = (idLink) => {
        confirmAlert({
            title: '',
            message: 'Delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(idLink, { method: 'DELETE' })
                            .then(res => this.loadTrainings())
                            .catch(err => console.error(err))

                        toast.success("Delete successful", {
                            position: toast.POSITION.BOTTOM_LEFT
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ],
        })
    }


    // Create training
    addTraining(training) {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(training)
            })
            .then(res => this.loadTrainings())
            .catch(err => console.error(err))
    }

    // Update training
    updateTraining(training, link) {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(training)
            })
            .then(
            toast.success("Changes saved", {
                position: toast.POSITION.BOTTOM_LEFT
            })
            )
            .catch(err => console.error(err))
    }


    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.trainings];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ trainings: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.trainings[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }



    render() {
        return (
            <div className="App-body">
                <div className="row">
                    <CSVLink style={{ padding: 20 }} data={this.state.trainings}>Download CSV</CSVLink>
                </div>
                <ReactTable data={this.state.trainings}
                    columns={[
                        {
                            columns: [
                                {
                                    accessor: "links.href",
                                    show: false
                                },
                                {
                                    Header: "Date",
                                    accessor: "date",
                                    Cell: ({ value }) => (moment(value).format("MMMM Do YYYY, h:mm a"))
                                },
                                {
                                    Header: "Customer",
                                    accessor: "customer",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Duration",
                                    accessor: "duration",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Activity",
                                    accessor: "activity",
                                    Cell: this.renderEditable
                                },
                            
                                {
                                    id: 'button',
                                    sortable: false,
                                    filterable: false,
                                    width: 100,
                                    accessor: 'links[0].href',
                                    Cell: ({ value, row }) => (<button className="btn btn-default btn-link" onClick={() => { this.updateTraining(row, value) }}>Edit</button>)
                                },
                                {
                                    id: 'button',
                                    sortable: false,
                                    filterable: false,
                                    width: 100,
                                    accessor: 'links[0].href',
                                    Cell: ({ value }) => (<button className="btn btn-default btn-link" onClick={() => { this.onDelClick(value) }}>Delete</button>)
                                }
                            ]
                        }
                    ]}
                    filterable
                    className="-highlight" >
                </ReactTable>
                <ToastContainer autoClose={2000} />
            </div>
        );
    }
}

export default TrainingList;