import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

    // Render data on page
    renderPhotos() {
        return (
            <>
            <Row>
                {this.state.pod.map((event) => 
                <Col sm key={event.date}>
                    <Card className="photocard" id={event.id} style={{ width: '25rem', height: '35rem'}} >
                        <div style={{ textAlign: 'right' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style={{ paddingTop: '.80rem', paddingRight: '.80rem' }}>
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </div>
                        <Card.Img variant="top" id={event.id} className="cardImg" src={event.hdurl} style={{ borderRadius: '.50rem', padding: '.40rem', width: '24rem', height: '20rem', overflow: 'hidden', objectFit: 'cover'}}/>
                        <Card.Title id={event.date}>{event.title}</Card.Title>
                        <Card.Body></Card.Body>
                    </Card>
                </Col>
                )}
            </Row>
           </>
        )
    }

    render() {
        return (
            <>
                <div style={{ padding: '5rem' }}>
                        {this.renderPhotos()}
                </div>
            </>
        );
    }
}

export default MainPage;