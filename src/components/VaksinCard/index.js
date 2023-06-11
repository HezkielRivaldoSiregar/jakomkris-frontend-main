import React, { Component } from 'react'
import './vaksinCard.scss'
import { Container, Row, Col, Card, Dropdown, Tabs, Tab, Button, Table, Nav } from 'react-bootstrap';
import {  Older, Vaksin, HumanResource, Officer, One, Two } from '../../assets';
import axios from 'axios';
import NumberFormat from "react-number-format";

import Carousel from 'react-grid-carousel'


export default class VaksinCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vaksinasi: [],

        }
    }
    componentDidMount() {
        let { subMenu } = this.state
        axios.get(`https://vaksincovid19-api.vercel.app/api/vaksin`)
            .then(res => {
                const vaksinasi = res.data;
                this.setState({ vaksinasi });
            })

    }

    render() {
        console.log(this.state.provinsi)

        return (
            <div className='vaksinCard-component'>
                <h5>Cakupan Vaksinasi COVID-19 di Indonesia</h5>
                {this.state.vaksinasi != null ?
                    <Row>
                        <Carousel cols={4} rows={1} >
                            <Carousel.Item className="carousel-item">
                                <Card>
                                    <Card.Body className="card-1">
                                        <Row>
                                            <Col xs={9}> <strong><NumberFormat value={this.state.vaksinasi.totalsasaran} displayType={'text'} thousandSeparator={true} /> </strong>
                                                <p>Total Sasaran Vaksin</p>
                                            </Col>
                                            <Col xs={3}>
                                                <img src={Vaksin} alt="Vaksin" width="35px" />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>

                            <Carousel.Item >

                                <Card>
                                    <Card.Body className="card-2">
                                        <Row>
                                            <Col xs={9}> <strong><NumberFormat value={this.state.vaksinasi.sasaranvaksinsdmk} displayType={'text'} thousandSeparator={true} /> </strong>
                                                <p>Total Sasaran Vaksin SDMK</p>
                                            </Col>
                                            <Col xs={3}>
                                                <img src={HumanResource} alt="HumanResource" width="35px" />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>

                            <Carousel.Item>
                                <Card>
                                    <Card.Body className="card-2">
                                        <Row>
                                            <Col xs={9}> <strong><NumberFormat value={this.state.vaksinasi.sasaranvaksinlansia} displayType={'text'} thousandSeparator={true} /> </strong>
                                                <p> Sasaran Vaksin Lansia</p>
                                            </Col>
                                            <Col xs={3}>
                                                <img src={Older} alt="Grow" width="35px" />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>

                            <Carousel.Item>
                                <Card>
                                    <Card.Body className="card-2">
                                        <Row>
                                            <Col xs={9}> <strong><NumberFormat value={this.state.vaksinasi.sasaranvaksinpetugaspublik} displayType={'text'} thousandSeparator={true} /> </strong>
                                                <p>Sasaran Vaksin Petugas</p>
                                            </Col>
                                            <Col xs={3}>
                                                <img src={Officer} alt="Officer" width="35px" />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>

                            <Carousel.Item>
                                <Card>
                                    <Card.Body className="card-2">
                                        <Row>
                                            <Col xs={9}> <strong><NumberFormat value={this.state.vaksinasi.vaksinasi1} displayType={'text'} thousandSeparator={true} /> </strong>
                                                <p>Total Sasaran Vaksinasi I</p>
                                            </Col>
                                            <Col xs={3}>
                                                <img src={One} alt="One" width="35px" />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>

                            <Carousel.Item>
                            <Card>
                                    <Card.Body className="card-2">
                                        <Row>
                                            <Col xs={9}> <strong><NumberFormat value={this.state.vaksinasi.vaksinasi2} displayType={'text'} thousandSeparator={true} /> </strong>
                                                <p>Total Sasaran Vaksinasi II</p>
                                            </Col>
                                            <Col xs={3}>
                                                <img src={Two} alt="Two" width="35px" />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>


                        </Carousel>

                    </Row>

                    :
                    null}
            </div >
        )
    }
}
