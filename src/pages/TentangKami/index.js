import React, { Component } from 'react'
import './tentangKami.scss'
import { Row, Col, Container, Image } from 'react-bootstrap';
import { Desendo, Ebentera, Hezkiel, Jesslyn, LogoGKJ, LogoJakomkris, LogoUKDW, Nafarel, Stevani } from '../../assets'

export default class TentangKami extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subMenu: 'tentang kami'
        }
    }

    componentDidMount() {
        let { subMenu } = this.state
        this.props.onSubMenu(subMenu)
    }

    render() {
        return (
            <div className="tentang-kami content-page">
                <div className="container-page">
                    <Container>
                        <Row className="title">
                            <Col>Tentang Kami</Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>
                                    &emsp; JAKOMKRIS PBI (Jaringan Komunitas Kristen untuk penanggulangan Bencana di Indonesia) didirikan pada 29 September 2017 sebagai saran bagi gereja,
                                    lembaga pelayanan, dan Komunitas Kristen untuk turut berperan dalam pengurangan risiko bencana. Kegiatan pelatihan, penguatan jejaring, serta
                                    gerakan respon terhadap bencana yang terjadi di Indonesia dilakukan secara khusus bagi gereja-gereja yang berdiri di wilayah rawan bencana seperti
                                    banjir, tanah longsor, gempa bumi, gunung meletus, tsunami, hingga kebakaran hutan dan lahan melalui pendekatan Church and Community Transformation
                                    Resilience Approach.
                                </p>
                            </Col>
                            <Col xs={6} md={4}>
                                <Image className = "logo" src={LogoJakomkris} rounded />
                            </Col>
                        </Row>
                    </Container>
                    <Container >
                        <Row className="title">
                            <Col className = "subTitle">VISI</Col>
                            <Col className = "subTitle">MISI</Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>&emsp; Terwujudnya kerja sama dan sinergi diantara Komunitas Kristiani melalui gereja dan lembaga kmanusiaan berbasis iman Kristiani untuk membangun masyarakat tangguh dan tanggap bencana.</p>
                            </Col>
                            <Col>
                                <ul>
                                    <li>Memobilisasi sumber daya, kapasitas gereja, dan lembaga untuk kegiatan penanggulangan/pengurangan risiko bencana.</li>
                                    <li>Memfasilitasi penyebarluasan informasi tentang pengurangan risiko bencana hinga warga jemaat.</li>
                                    <li>Melakukan advokasi kepada pemerintah dan para pihak dalam perihal pengurangan risiko bencana.</li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                    <Container >
                        <Row className="title">
                            <Col>
                                <Image className = "images" src={LogoUKDW} width="250px" height="150px" rounded />
                            </Col>
                            <Col>
                                <Image className = "images" src={LogoJakomkris} width="180px" height="110px" rounded />
                            </Col>
                            <Col>
                                <Image className = "images" src={LogoGKJ} width="150px" height="150px" rounded />
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="container-team">
                    <h2>MEET OUR TEAM</h2>
                    <Container >
                        <Row className="title">
                            <Col>
                            <div className="card">
                                <Image className = "team-image" src={Hezkiel} width="347.87px" rounded />
                                <div className="container">
                                    <h2>Hezkiel Siregar</h2>
                                    <p className="subTitle">Frontend</p>
                                </div>
                            </div>
                            </Col>
                            <Col>
                            <div className="card">
                                <Image className = "team-image" src={Ebentera} width="347.87px" rounded />
                                <div className="container">
                                    <h2>Ebentera Santosa</h2>
                                    <p className="subTitle">Frontend</p>
                                </div>
                            </div>
                            </Col>
                            <Col>
                            <div className="card">
                                <Image className = "team-image" src={Desendo} width="347.87px"  rounded />
                                <div className="container">
                                    <h2>Desendo Imanuel</h2>
                                    <p className='subTitle'>Backend</p>
                                </div>
                            </div>
                            </Col>
                        </Row>
                        <Row className="title">
                            <Col>
                            <div class="card">
                                <Image className = "team-image" src={Nafarel} width="347.87px" height="434.83px" rounded />
                                <div class="container">
                                    <h2>Nafarel Triyoga </h2>
                                    <p class="subTitle">Backend</p>
                                </div>
                            </div>
                            </Col>
                            <Col>
                            <div class="card">
                                <Image className = "team-image" src={Jesslyn} width="347.87px" height="150px" rounded />
                                <div class="container">
                                    <h2>Jesslyn Septhia</h2>
                                    <p class="subTitle">-</p>
                                </div>
                            </div>
                            </Col>
                            <Col>
                            <div class="card">
                                <Image className = "team-image" src={Stevani} width="347.87px" height="150px" rounded />
                                <div class="container">
                                    <h2>Stevani Dwi Utomo</h2>
                                    <p class="subTitle">-</p>
                                </div>
                            </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
