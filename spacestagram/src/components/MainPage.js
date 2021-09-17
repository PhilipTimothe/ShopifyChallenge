import React, { Component } from 'react';

class MainPage extends Component {

    state = {
        pod : [],
        startDate : '08-07-2021',
        endDate : '08-12-2021',
    }

    componentDidMount() {
        let start = new Date(this.state.startDate);
        let sParsed = `${start.getFullYear()}-`+(`0${start.getMonth() + 1}`).slice(-2)+`-`+(`0${start.getDate()}`).slice(-2)
        let end = new Date(this.state.endDate);
        let eParsed = `${end.getFullYear()}-`+(`0${end.getMonth() + 1}`).slice(-2)+`-`+(`0${end.getDate()}`).slice(-2)

        // var today = new Date();
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // var yyyy = today.getFullYear();

        fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${sParsed}&end_date=${eParsed}`)
            .then((res) => res.json())
            .then(data => {
                this.setState({ 
                    pod: data,
                })
            })
    }

    render() {
        return (
            <div>
                hi
            </div>
        );
    }
}

export default MainPage;