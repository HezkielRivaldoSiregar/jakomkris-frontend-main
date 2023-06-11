import React, { Component } from 'react'
import './summaryDashboard.scss'
import { Container, Row, Col, Card, Tabs, Tab, Button, Table, Nav, Alert } from 'react-bootstrap';
import { Danger, Grow, MenuWelcomePeople, Down, MenuBtnArrow, Location, Quake, Sky, SunnyCloudly, Drizzling, ModerateRain, Cloudly, ThunderRain, HeavyRain, Sunny, church, CaseCovid, Disaster } from '../../assets';
import axios from 'axios';
import Carousel from 'react-grid-carousel'
import { DataGereja, Covid19, VaksinCard, GempaBumi, Weather } from '../../components'
import { Link } from 'react-router-dom';

export default class SummaryDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subMenu: 'summarydashboard',
            autogempas: [],
            gempaterkini: [],
            ramalanCuacaJogja: [],
            sleman: [],
            bantul: [],
            kulonProgo: [],
            gunungKidul: [],
            palu: [],
            tojo: [],
            poso: [],
            toli: [],
            sigi: [],
            gempaKu: []

        }
    }

    componentDidMount() {
        let { subMenu } = this.state
        this.props.onSubMenu(subMenu)
        axios.get(`https://cuaca-gempa-rest-api.vercel.app/weather/jawa-barat/bandung`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })

        axios.get(`https://cuaca-gempa-rest-api.vercel.app/quake`)
            .then(res => {
                const autogempas = res.data;
                this.setState({ autogempas });
            })

        axios.get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia`)
            .then(res => {
                const covids = res.data;
                this.setState({ covids });
            })

        axios.get(`http://feriirawan-api.herokuapp.com/list/bmkg`)
            .then(res => {
                const gempaKu = res.data;
                this.setState({ gempaKu });
                console.log("DATA GEMPA: ", res);
            })

        axios.get(`https://vaksincovid19-api.vercel.app/api/vaksin`)
            .then(res => {
                const vaksins = res.data;
                this.setState({ vaksins });
            })

        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=ab85db1d64844ec8aac60659220404&q=yogyakarta&days=3&aqi=no&alerts=no`)
            .then(res => {
                const ramalanCuacaJogja = res.data;
                this.setState({ ramalanCuacaJogja });
            })

        axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/501187.json`)
            .then(res => {
                const sleman = res.data;
                this.setState({ sleman });
            })


        axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/501186.json`)
            .then(res => {
                const bantul = res.data;
                this.setState({ bantul });
            })

        axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/501188.json`)
            .then(res => {
                const kulonProgo = res.data;
                this.setState({ kulonProgo });
            })


        axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/501189.json`)
            .then(res => {
                const gunungKidul = res.data;
                this.setState({ gunungKidul });
            })

        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=ab85db1d64844ec8aac60659220404&q=Palu&days=1&aqi=no&alerts=no`)
            .then(res => {
                const palu = res.data;
                this.setState({ palu });
            })

        axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/501520.json`)
            .then(res => {
                const tojo = res.data;
                this.setState({ tojo });
            })

        axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/501527.json`)
            .then(res => {
                const poso = res.data;
                this.setState({ poso });
            })

        axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/501529.json`)
            .then(res => {
                const toli = res.data;
                this.setState({ toli });
            })

        axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/5002257.json`)
            .then(res => {
                const sigi = res.data;
                this.setState({ sigi });
            })
    }


    render() {
        return (
            <div className="summary-dashboard">


                <div className="container-page">
                    <div className="welcome">
                        <Tabs defaultActiveKey="Overview" className="tabs">
                            <Tab className="content target" eventKey="Overview" title="Overview">

                                <div className='information'>
                                    <Row>
                                        <Col>
                                            <Card>
                                                <Card.Header>
                                                    <h6> Total Jumlah Jemaat terdata</h6>
                                                </Card.Header>
                                                <Card.Body className="card">
                                                    <Row>

                                                        <Col xs={7}>

                                                            <h3><strong>80.334</strong></h3>
                                                        </Col >

                                                        <Col xs={5}> <img className="image-col" src={church} />  </Col>
                                                    </Row>
                                                </Card.Body>

                                            </Card>

                                        </Col>
                                        <Col>
                                            <Card>
                                            <Card.Header>
                                                    <h6>Jumlah Covid -19 pada Sekitar wilayah Gereja</h6>
                                                </Card.Header>
                                                <Card.Body className="card">
                                                    <Row>

                                                        <Col xs={7}>

                                                            <h4> <strong>281.367</strong></h4>
                                                        </Col >

                                                        <Col xs={5}> <img className="image-col" src={CaseCovid} />  </Col>
                                                    </Row>
                                                </Card.Body>
                                               
                                            </Card>
                                        </Col>
                                        <Col>

                                            <Card>
                                            <Card.Header>
                                                    <h6>  Total Gereja Terkena Dampak Gempa Terkini</h6>
                                                </Card.Header>
                                                <Card.Body className="card">
                                                    <Row>
                                                        <Col xs={7}>
                                                          <h3> <strong>2</strong> </h3> 
                                                        </Col >

                                                        <Col xs={5}> <img className="image-col" src="https://cdn-icons-png.flaticon.com/512/1684/1684355.png" />  </Col>
                                                    </Row>
                                                </Card.Body>
                                               
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                            <Card.Header>
                                                    <h6> Total Rencana Kesiapsiagaan Gereja</h6>
                                                </Card.Header>
                                                <Card.Body className="card">
                                                    <Row>

                                                        <Col xs={7}>

                                                           <h3><strong>20</strong></h3> 
                                                        </Col >

                                                        <Col xs={5}> <img className="image-col" src="https://traumainformedoregon.org/wp-content/uploads/2018/12/Agency-Readiness-Icon.png" />  </Col>
                                                    </Row>
                                                </Card.Body>
                                             
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: 24 }}>
                                        <Col>
                                            <Card>
                                            <Card.Header>
                                                    <h6> Jumlah Indikator Bencana Alam</h6>
                                                </Card.Header>
                                                <Card.Body className="card">
                                                    <Row>

                                                        <Col xs={7}>

                                                            <h3><strong>14</strong></h3>
                                                        </Col >

                                                        <Col xs={5}> <img className="image-col" src={Disaster} />  </Col>
                                                    </Row>
                                                </Card.Body>
                                             
                                            </Card>

                                        </Col>

                                        <Col>
                                            <Card>
                                            <Card.Header>
                                                    <h6> Total Gereja Siap Dalam Segi Bangunan</h6>
                                                </Card.Header>
                                                <Card.Body className="card">
                                                    <Row>
                                                        <Col xs={7}>
                                                          <h3>  <strong>112</strong> </h3>
                                                        </Col >
                                                        <Col xs={5}> <img className="image-col" src="https://cdn-icons-png.flaticon.com/512/1191/1191591.png" />  </Col>
                                                    </Row>
                                                </Card.Body>
                                               
                                            </Card>
                                        </Col>
                                        <Col >

                                            <Card>
                                            <Card.Header>
                                                    <h6>  Total Gereja Siap Dalam Segi Kesadaran</h6>
                                                </Card.Header>
                                                <Card.Body className="card">
                                                    <Row>
                                                        <Col xs={7}>
                                                           <h3> <strong>103</strong>  </h3>
                                                        </Col >

                                                        <Col xs={5}> <img className="image-col" src="https://cdn-icons-png.flaticon.com/512/1999/1999231.png" />  </Col>
                                                    </Row>
                                                </Card.Body>
                                               
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                            <Card.Header>
                                                    <h6> Total Gereja Siap Dalam Segi Team</h6>
                                                </Card.Header>
                                                <Card.Body className="card">
                                                    <Row>

                                                        <Col xs={7}>

                                                        <h3>   <strong>118</strong> </h3> 
                                                        </Col >

                                                        <Col xs={5}> <img className="image-col" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRPNoaLuPMHnWLJM-HOPXompZz6MGAB6gJpg&usqp=CAU" />  </Col>
                                                    </Row>
                                                </Card.Body>
                                              
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: 24 }}>
                                        <span> Status Kesiapan Gereja Menghadapi Bencana</span>
                                        <iframe src="https://flo.uri.sh/visualisation/10007115/embed" width="100%" height="500" marginheight="0" marginwidth="0" frameborder="0" scrolling='no'></iframe>
                                    </Row>
                                </div>
                            </Tab>
                            <Tab className="content" eventKey="Data Gereja" title="Data Gereja">

                                <DataGereja />
                            </Tab>
                            <Tab className="content" eventKey="COVID-19" title="COVID-19">
                                <Covid19 />
                                <VaksinCard />
                                <Row>
                                    <iframe src="https://databoks.katadata.co.id/datapublishembed/132787/perkembangan-covid-19-di-indonesia-total-kasus-capai-6047491-kasus-rabu-45" width="100%" height="500" marginheight="0" marginwidth="0" frameborder="0" scrolling='no'></iframe>
                                </Row>
                                <Row>
                                    <br></br>

                                    <iframe src="https://databoks.katadata.co.id/datapublishembed/131166/tes-covid-19-indonesia-15242-ribu-spesimen-per-hari-selasa-05-april-2022" width="100%" height="700" marginheight="0" marginwidth="0" frameborder="0" scrolling='no'></iframe>

                                </Row>

                            </Tab>
                            <Tab className="content" eventKey="Gempa Bumi" title="Gempa Bumi">
                                <GempaBumi />
                            </Tab>
                            <Tab className="content" eventKey="Prakiraan Cuaca" title="Prakiraan Cuaca">
                                <div>
                                    <Weather />
                                </div>
                            </Tab>

                        </Tabs>
                    </div>
                </div>
            </div >
        )
    }
}
