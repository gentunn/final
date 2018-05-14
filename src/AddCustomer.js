import React from 'react';
import SkyLight from 'react-skylight';
import RaisedButton from 'material-ui/RaisedButton';
class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstname: '', lastname: '', phone: '', streetaddress: '', postcode: '', email: '' };
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save customer, load customer close skylight
    handleSubmit = (event) => {
        event.preventDefault();
        var newCustomer = { firstname: this.state.firstname, lastname: this.state.lastname, phone: this.state.phone, streetaddress: this.state.streetaddress, postcode: this.state.postcode, email: this.state.email };
        this.props.addCustomer(newCustomer);
        this.props.loadCustomers();
        this.refs.simpleDialog.hide();
    }

    render() {
        // Add customer page doesn't fit to default size modal
        const addCustomerDialog = {
            width: '70%',
            height: '500px',
            marginTop: '-300px',
            marginLeft: '-35%',
        };

        return (
            <div>
                <SkyLight dialogStyles={addCustomerDialog} hideOnOverlayClicked ref="simpleDialog">
                    <div className="card" style={{ "width": "95%" }}>
                        <div className="card-body">
                            <h5 className="card-title">New customer</h5>
                            <form>
                                <div className="form-group">
                                    <input type="text" placeholder="Firstname" className="form-control" name="firstname" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Lastname" className="form-control" name="lastname" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="number" placeholder="Phone" className="form-control" name="phone" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Street Address" className="form-control" name="streetaddress" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="number" placeholder="Postcode" className="form-control" name="postcode" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Email" className="form-control" name="email" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <RaisedButton primary={true} onClick={this.handleSubmit} label="Save"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </SkyLight>
                <div className="container">
                   
                    <RaisedButton onClick={() => this.refs.simpleDialog.show()} primary={true} label="New customer" />
                 
                </div>
            </div>
        );
    }
}

export default AddCustomer;
