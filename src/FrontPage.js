import React, { Component } from 'react';
class FrontPage extends Component {
    render() {
        return (

            <div className="container">
                <div style={{ clear: "both", display: "block", height: "10px" }}></div>
                <div style={{ textAlign: "left" }}>
                <h1>Home Page</h1>
                <div>
                    <h2>Task 1</h2>
                    <p>List customer and trainings. List pages contain following features:</p>
                    <ul>
                        <li>Sorting</li>
                        <li>Searching</li>
                        <li>A CSV version is available for download</li>
                   </ul>
                </div>
                <div>
                    <h2>Task 2</h2>
                    <p> CRUD functions </p>
                        <ul>
                        <li>Add new customer</li>
                        <li>Delete customer</li>
                        <li>Add training to customer</li>
                        <li>Delete training</li>
                        <li>Edit customer info & training info (not date)</li>
                        </ul>
                </div>
                <div>
                    <h2>Task 3</h2>
                    <p> Calendar page where user can see trainings (monthly, weekly, daily)</p>
                    <p> Firebase authentication</p>

                </div>
                </div>
            </div>
        );

    }
}
export default FrontPage;
