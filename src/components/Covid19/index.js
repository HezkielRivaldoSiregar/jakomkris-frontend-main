import React, { Component } from 'react'
import './covid19.scss'
import { Container, Row, Col, Card, Dropdown, Tabs, Tab, Button, Table, Nav, Alert, DropdownButton } from 'react-bootstrap';
import { CaseCovid, Grow, PositifCovid, Down, Die, Baby, Young, Worker, MiddleAge, Older, OldAge } from '../../assets';
import axios from 'axios';
import NumberFormat from "react-number-format";
import Select from 'react-select';
import Carousel from 'react-grid-carousel'
import ReactModal from 'react-modal';


export default class Covid19 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectOptions: [],
            dirawat: "",
            provinsi: null,
            yogyakarta: [],
            showModal: false,
            showModal2: false,
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.handleOpenModal2 = this.handleOpenModal2.bind(this);
        this.handleCloseModal2 = this.handleCloseModal2.bind(this);
    }
    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleOpenModal2() {
        this.setState({ showModal2: true });
    }

    handleCloseModal2() {
        this.setState({ showModal2: false });
    }

    async getOptions() {
        const res = await axios.get('https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more')
        const data = res.data

        const options = data.map(d => ({
            "dirawat": d.dirawat,
            "label": d.provinsi,
            "update": d.last_date,
            "kasus": d.kasus,
            "positif": d.penambahan.positif,
            "sembuh": d.sembuh,
            "tambahSembuh": d.penambahan.sembuh,
            "meninggal": d.meninggal,
            "tambahMeninggal": d.penambahan.meninggal,
            "baby": d.kelompok_umur["0-5"],
            "young": d.kelompok_umur["6-18"],
            "worker": d.kelompok_umur["19-30"],
            "middleAge": d.kelompok_umur["31-45"],
            "older": d.kelompok_umur["46-59"],
            "oldAge": d.kelompok_umur["≥ 60"],
        }))

        this.setState({
            selectOptions: options,
        })

    }


    componentDidMount() {
        this.getOptions()
        axios.get(process.env.PTB_BACKEND_ENDPOINT+`/api/churches`)
            .then(res => {
                const yogyakarta = res.data;
                this.setState({ yogyakarta });
            })

    }

    handleChange(e) {
        this.setState({
            dirawat: e.dirawat,
            provinsi: e.label,
            last_date: e.update,
            kasus: e.kasus,
            positif: e.positif,
            sembuh: e.sembuh,
            tambahSembuh: e.tambahSembuh,
            meninggal: e.meninggal,
            tambahMeninggal: e.tambahMeninggal,
            totalsasaran: e.totalsasaran,
            baby: e.baby,
            young: e.young,
            worker: e.worker,
            middleAge: e.middleAge,
            older: e.older,
            oldAge: e.oldAge
        })
    }

    render() {
        console.log(this.state.provinsi)

        return (
            <div className='covid19-component'>



                <Select
                    className="dropdown"
                    options={this.state.selectOptions}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Pilih data Covid-19 terlebih dahulu"
                />

                {this.state.provinsi != null ?
                    <div>
                        <div className='header-covid'>
                            <div>
                                <h5> Jumlah Terpapar Covid-19 di Setiap Provinsi</h5>
                                <p>Provinsi Yang Anda Pilih Saat Ini Adalah <strong>{this.state.provinsi}</strong>
                                    <br></br> Last update : {this.state.last_date}
                                    <p>Jumlah Kasus : <NumberFormat value={this.state.kasus} displayType={'text'} thousandSeparator={true} /></p>
                                </p>
                            </div>
                            <div >
                                {this.state.provinsi == "DAERAH ISTIMEWA YOGYAKARTA" ?
                                    <div>
                                        <div >
                                            <Button variant="success" onClick={this.handleOpenModal}>Daftar Gereja Terdampak Pada Area Ini</Button>

                                            <ReactModal
                                                isOpen={this.state.showModal}

                                                className="mymodal custom-y-scrollbar-xs"
                                            >
                                                <div>
                                                    {this.state.yogyakarta.map(yogya =>
                                                        <div className='daftar-covid custom-y-scrollbar-xs'>
                                                            {yogya.properties.province == "Daerah Istimewa Yogyakarta" ?
                                                                <div >
                                                                    <span >{yogya.properties.name}</span>
                                                                </div>
                                                                : null
                                                            }


                                                        </div>
                                                    )
                                                    }
                                                </div>
                                                <br></br>
                                                
                                                <Button className='closing' onClick={this.handleCloseModal}>Close Modal</Button>

                                            </ReactModal>

                                        </div>

                                    </div>
                                    :
                                    this.state.provinsi == "SULAWESI TENGAH" ?
                                        <div>
                                            <div >
                                                <Button variant="success" onClick={this.handleOpenModal2}>Daftar Gereja Terdampak Pada Area Ini</Button>

                                                <ReactModal
                                                    isOpen={this.state.showModal2}

                                                    className="mymodal custom-y-scrollbar-xs"
                                                >
                                                    <div>
                                                        {this.state.yogyakarta.map(yogya =>
                                                            <div className='daftar-covid custom-y-scrollbar-xs'>
                                                                {yogya.properties.province == "Sulawesi Tengah" ?
                                                                    <div >
                                                                        <span >{yogya.properties.name}</span>
                                                                    </div>
                                                                    : null
                                                                }


                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                    <br></br>
                                                    <Button className='closing' onClick={this.handleCloseModal2}>Close Modal</Button>

                                                </ReactModal>

                                            </div>

                                        </div>
                                        :
                                        <Alert variant='info'>

                                            <span>Tidak Ada Data Gereja Pada Provinsi {this.state.provinsi}</span>
                                        </Alert>
                                }




                            </div>
                        </div>
                        <br></br>



                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body className="card">
                                        <Row>

                                            <Col xs={7}>
                                                <h6>Jumlah dirawat</h6>
                                                <strong><NumberFormat value={this.state.dirawat} displayType={'text'} thousandSeparator={true} /></strong>
                                            </Col >

                                            <Col xs={5}> <img className="image-col" src={CaseCovid} />  </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer>
                                        {this.state.positif > 0 ? <div> <img src={Grow} alt="Grow" width="35px" /> Mengalami Kenaikan : <strong>{this.state.positif}</strong> Jiwa</div> :
                                            <div> <img src={Down} alt="Grow" width="35px" /> Mengalami Penurunan: <strong>{this.state.positif}</strong> Jiwa</div>
                                        }
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body className="card">
                                        <Row>

                                            <Col xs={7}>
                                                <h6>Jumlah Pasien Sembuh</h6>
                                                <strong><NumberFormat value={this.state.sembuh} displayType={'text'} thousandSeparator={true} /></strong>
                                            </Col >

                                            <Col xs={5}> <img className="image-col" src={PositifCovid} />  </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer>
                                        {this.state.tambahSembuh > 0 ? <div> <img src={Grow} alt="Grow" width="35px" /> Mengalami Kenaikan : <strong>{this.state.tambahSembuh}</strong> Jiwa</div> :
                                            <div> <img src={Down} alt="Grow" width="35px" /> Mengalami Penurunan: <strong>{this.state.tambahSembuh}</strong> Jiwa</div>
                                        }
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body className="card">
                                        <Row>

                                            <Col xs={8}>
                                                <h6>Jumlah Pasien meninggal</h6>
                                                <strong><NumberFormat value={this.state.meninggal} displayType={'text'} thousandSeparator={true} /></strong>
                                            </Col >

                                            <Col xs={4}> <img className="image-col" src={Die} />  </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer>
                                        {this.state.tambahMeninggal > 0 ? <div> <img src={Grow} alt="Grow" width="35px" /> Mengalami Kenaikan : <strong>{this.state.tambahMeninggal}</strong> Jiwa</div> :
                                            <div> <img src={Down} alt="Grow" width="35px" /> Mengalami Penurunan: <strong>{this.state.tambahMeninggal}</strong> Jiwa</div>
                                        }
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                        <br></br>
                        <h5> Jumlah Terpapar Covid-19 Berdasarkan Usia</h5>
                        <Row>
                            <Carousel cols={4} rows={1} >
                                <Carousel.Item className="carousel-item">
                                    <Card>
                                        <Card.Body className="card-1">
                                            <Row>
                                                <Col xs={9}> <strong><NumberFormat value={this.state.baby} displayType={'text'} thousandSeparator={true} /> </strong>
                                                    Kasus Terkonfirmasi</Col>
                                                <Col xs={3}>
                                                    <img src={Baby} alt="Grow" width="35px" />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>Kelompok Umur 0-5 Tahun</Card.Footer>
                                    </Card>
                                </Carousel.Item>

                                <Carousel.Item >

                                    <Card>
                                        <Card.Body className="card-2">
                                            <Row>
                                                <Col xs={9}> <strong><NumberFormat value={this.state.young} displayType={'text'} thousandSeparator={true} /> </strong>
                                                    Kasus Terkonfirmasi</Col>
                                                <Col xs={3}>
                                                    <img src={Young} alt="young" width="35px" />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>Kelompok Umur 6-18 Tahun</Card.Footer>
                                    </Card>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <Card>
                                        <Card.Body className="card-3">
                                            <Row>
                                                <Col xs={9}> <strong><NumberFormat value={this.state.worker} displayType={'text'} thousandSeparator={true} /> </strong>
                                                    Kasus Terkonfirmasi</Col>
                                                <Col xs={3}>
                                                    <img src={Worker} alt="Worker" width="35px" />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>Kelompok Umur 19-30 Tahun</Card.Footer>
                                    </Card>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <Card>
                                        <Card.Body className="card-4">
                                            <Row>
                                                <Col xs={9}> <strong><NumberFormat value={this.state.middleAge} displayType={'text'} thousandSeparator={true} /> </strong>
                                                    Kasus Terkonfirmasi</Col>
                                                <Col xs={3}>
                                                    <img src={MiddleAge} alt="Middle Age" width="35px" />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>Kelompok Umur 31-45 Tahun</Card.Footer>
                                    </Card>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <Card>
                                        <Card.Body className="card-4">
                                            <Row>
                                                <Col xs={9}> <strong><NumberFormat value={this.state.older} displayType={'text'} thousandSeparator={true} /> </strong>
                                                    Kasus Terkonfirmasi</Col>
                                                <Col xs={3}>
                                                    <img src={Older} alt="Older" width="35px" />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>Kelompok Umur 46-59 Tahun</Card.Footer>
                                    </Card>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <Card>
                                        <Card.Body className="card-4">
                                            <Row>
                                                <Col xs={9}> <strong><NumberFormat value={this.state.oldAge} displayType={'text'} thousandSeparator={true} /> </strong>
                                                    Kasus Terkonfirmasi</Col>
                                                <Col xs={3}>
                                                    <img src={OldAge} alt="Old Age" width="35px" />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>Kelompok Umur Lebih dari 60 Tahun</Card.Footer>
                                    </Card>
                                </Carousel.Item>


                            </Carousel>

                        </Row>
                    </div>
                    :
                    <Alert variant='info'>
                        <h4>Anda Belum Memilih Data Provinsi</h4>
                        <span>Sepertinya anda belum memilih data Covid-19 untuk setiap Provinsi!</span>
                    </Alert>
                }

            </div >
        )
    }
}
