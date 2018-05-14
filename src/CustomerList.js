 import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSVLink, CSVDownload } from 'react-csv';

import AddCustomer from './AddCustomer';
import AddTrainingCustomer from './AddTrainingCustomer';
class CustomerList extends Component {
    state = { customers: [] };

    componentDidMount() {
        this.loadCustomers();
    }

    // Load customers from REST API
    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    customers: responseData.content,
                });
            })
    }
  
    // Delete customer
    onDelClick = (idLink) => {
        confirmAlert({
            title: '',
            message: 'Delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(idLink, { method: 'DELETE' })
                            .then(res => this.loadCustomers())
                            .catch(err => console.error(err))

                        toast.success("Deleted!", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click OK to continue')
                }
            ]
        })

    }


    // Create customer
    addCustomer(customer) {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
            })
            .then(res => this.loadCustomers())
            .catch(err => console.error(err))
    }

    // create training for customer
    addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTraining)
        })
            .then(res => console.log(newTraining))
            .catch(err => console.error(err))
    }



    // Update customer
    updateCustomer(customer, link) {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
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
                    const data = [...this.state.customers];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ customers: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.customers[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    } 



    render() {
        return (
            <div className="App-body">
                <div className="row">
                    <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
                </div>
                <div style={{ textAlign: "right" }}>
                    <CSVLink style={{ padding: 20 }} data={this.state.customers}>Download CSV</CSVLink>
                    </div>
                <ReactTable data={this.state.customers}
                    columns={[
                        {
                            columns: [
                                {
                                    accessor: "links.href",
                                    show: false
                                },
                                {
                                    Header: "First Name",
                                    accessor: "firstname",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Last Name",
                                    accessor: "lastname",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Phone",
                                    accessor: "phone",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Address",
                                    accessor: "streetaddress",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Post code",
                                    accessor: "postcode",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Email",
                                    accessor: "email",
                                    Cell: this.renderEditable
                                },
                                {
                                    id: 'button',
                                    accessor: "links[0].href",
                                    Cell: ({ value }) => (<AddTrainingCustomer  customer={value} addTraining={this.addTraining} />)
                                }, 

                                {
                                    id: 'button',
                                    sortable: false,
                                    filterable: false,
                                    width: 100,
                                    accessor: 'links[0].href',
                                    Cell: ({ value, row }) => (<button className="btn btn-default btn-link" onClick={() => { this.updateCustomer(row, value) }}>Edit</button>)
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

export default CustomerList;