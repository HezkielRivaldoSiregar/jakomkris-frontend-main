import React, { Component } from 'react'
import './gempaBumi.scss'
import { Container, Row, Col, Card, Tabs, Tab, Button, Table, Nav } from 'react-bootstrap';
import axios from 'axios';
import { Quake, Location } from '../../assets';



export default class GempaBumi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autogempas: [],
            gempaterkini: [],

        }
    }

    componentDidMount() {

        axios.get(`https://cuaca-gempa-rest-api.vercel.app/quake`)
            .then(res => {
                const autogempas = res.data;
                this.setState({ autogempas });
            })

        axios.get(`http://bmkg-geojson.herokuapp.com/gempa/?data=dirasakan`)
            .then(res => {
                const gempaterkini = res.data;
                this.setState({ gempaterkini });
            })


    }

    render() {
        return (
            <div className='gempaBumi-component'>
                <div>
                    {this.state.autogempas.data != null ?
                        <Card>
                            <Card.Header> <h5>Gempa Bumi Terbaru</h5></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Row>
                                        <Col xs={7}>

                                            <div>
                                                <img className="imageGempa" src={this.state.autogempas.data.shakemap}></img>
                                            </div>

                                        </Col>
                                        <Col xs={4}>
                                            <strong>Informasi Gempa Terkini</strong>
                                            <Table striped bordered hover>
                                                <tbody>
                                                    <tr>
                                                        <td>Tanggal</td>
                                                        <td>  <span>{this.state.autogempas.data.tanggal}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jam</td>
                                                        <td>  <span>{this.state.autogempas.data.jam}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Coordinates</td>
                                                        <td>  <span>{this.state.autogempas.data.coordinates}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Lintang</td>
                                                        <td>  <span>{this.state.autogempas.data.lintang}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bujur</td>
                                                        <td>  <span>{this.state.autogempas.data.bujur}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Magnitude</td>
                                                        <td>  <span>{this.state.autogempas.data.magnitude}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Kedalaman</td>
                                                        <td>  <span>{this.state.autogempas.data.kedalaman}</span></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <Row>
                                                <Col xs={3}><img src={Location} alt="Grow" width="50%" />Wilayah</Col>
                                                <Col xs={9}><span>{this.state.autogempas.data.wilayah}</span></Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col xs={3}><img src={Quake} alt="Grow" width="50%" /> Potensi</Col>
                                                <Col xs={9}><span>{this.state.autogempas.data.potensi} {this.state.autogempas.data.dirasakan}</span></Col>
                                            </Row>


                                            <Row style={{marginTop:24}}>
                    
                                                <strong> Daftar Gereja Terdampak Gempa Terkini</strong>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Nama Gereja</th>
                                                            <th>Alamat</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Gereja Toraja Jemaat Elim Palu</td>
                                                            <td>Jl. Pramuka, Besusu Bar., Kec. Palu Tim., Kota Palu, Sulawesi Tengah 94111</td>

                                                        </tr>
                                                        <tr>
                                                            <td>GKST Jemaat Anugerah Masomba</td>
                                                            <td>Jl. Tanjung Manimbaya IV. No. 05</td>

                                                        </tr>
                  
                                                    </tbody>
                                                </Table>
                                            </Row>
                                        </Col>
                                    </Row>


                                </Card.Text>
                            </Card.Body>
                        </Card>
                        :
                        null
                    }
                    <br></br>

                </div>

            </div >
        )
    }
}
