import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



class MainPage extends Component {

    state = {
        pod : [],
        startDate : new Date(),
        endDate : new Date(),
        toggle: false,
        show: false,
        currentPhoto: [],
    }

    componentDidMount() {
        const apiey = 'PG7HPAShBt539mvrcYnAZ0zWukaNzVaLiLfxNPfQ'

        let start = new Date(this.state.startDate);
        let sParsed = `${start.getFullYear()}-`+(`0${start.getMonth() + 1}`).slice(-2)+`-`+(`0${start.getDate() - 5}`).slice(-2)
        let end = new Date(this.state.endDate);
        let eParsed = `${end.getFullYear()}-`+(`0${end.getMonth() + 1}`).slice(-2)+`-`+(`0${end.getDate()}`).slice(-2)

        // var today = new Date();
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // var yyyy = today.getFullYear();

        fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiey}&start_date=${sParsed}&end_date=${eParsed}`)
            .then((res) => res.json())
            .then(data => {
                this.setState({ 
                    pod: data,
                })
                this.state.pod.map((photo) => photo['toggle'] = false)
                this.setState({pod: this.state.pod.reverse()})
            })
    }

    // Render data on page
    renderPhotos() {
        return (
            <>
                {this.state.pod.map((event, index) => 
            <Row key={index}>
                <Col sm>
                    <Card key={index} className="photocard" style={{ width: '24rem', height: '26rem'}} >
                        <Card.Img variant="top" className="cardImg" src={event.hdurl} style={{  paddingBottom: '.80rem', width: '25rem', height: '20rem', overflow: 'hidden', objectFit: 'cover'}}/>
                        <Card.Body>
                            
                            <Card.Text style={{ textAlign: 'center' }}>{event.title}</Card.Text>
                            <div>
                                <Row>
                                <Col style={{ textAlign: 'left' }}>
                                    <Button variant="outline-dark" id={index} onClick={(e) => this.setState({show: true, currentPhoto: this.state.pod[index]})}>
                                        Explore
                                    </Button>
                                </Col>
                                <Col style={{ textAlign: 'right' }}>
                                    <Button variant="light" className="heart" id={index} onClick={(e) => this.toggle(e)} style={{  outline: 'none', borderStyle: 'none', backgroundColor: 'transparent' }}>
                                        {/* {this.renderLike()} */} hi
                                    </Button>
                                </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
                )}
           </>
        )
    }

    toggle = e => {
        let toggle = this.state.pod[e.target.id].toggle 
        let newPods = Object.assign({}, this.state.pod)
        if (toggle === false) {
            newPods[e.target.id].toggle = true
            this.setState({
                    pod: Object.values(newPods)
            })
        }
        if (toggle === true) {
            newPods[e.target.id].toggle = false
            this.setState({
                    pod: Object.values(newPods)
            })
        }
    }

    renderLike() {
        if (this.state.toggle === false) {
            return (
                <>
                <svg style={{  width: '1.25rem', height: '1.25rem'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16" >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
                {' '}Like 
                </>
            )
        }
        if (this.state.toggle === true) {
            return (
                <>
                <svg style={{ color: 'red', width: '1.25rem', height: '1.25rem'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                {' '}Unlike 
                </>
            )
        }
    }

    renderModal = e => {
        let date = new Date(this.state.currentPhoto.date);
        let dParsed = `${date.getFullYear()}-`+(`0${date.getMonth() + 1}`).slice(-2)+`-`+(`0${date.getDate()}`).slice(-2)
        return (
            <>
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} animation={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.currentPhoto.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ marginBottom: '0'}}>{this.state.currentPhoto.explanation}</p>
                        <br style={{ borderBottom: '1rem'}}/>
                        <h6>Photo of the day Date:</h6>
                        <p>{dParsed}</p>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    render() {
        return (
            <>
            <div style={{ paddingTop: '5rem', paddingLeft: '25rem', paddingRight: '25rem'}}>
                <div style={{ padding: '2rem', backgroundColor: '#F8F8F8'}}>
                    <h1>Spacestagram</h1>
                    {this.renderPhotos()}
                </div>
                {this.renderModal()}
            </div>
            </>
        );
    }
}

export default MainPage;