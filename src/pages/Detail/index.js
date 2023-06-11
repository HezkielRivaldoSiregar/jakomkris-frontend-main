import React, { useEffect, useState } from "react";
import './detail.scss'
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Image, Button, Tab, Tabs } from "react-bootstrap";
import { PersonIcon, MarkerIcon, Check, Decline } from '../../assets'
import { VerticalBar } from '../../components';
import Carousel from 'react-grid-carousel'

export default function Detail() {


    const [churches, setChurches] = useState({});

    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");



    useEffect(() => {
        const fetch = async () => {
            try {
                const getChurches = axios.get(process.env.PTB_BACKEND_ENDPOINT+`/api/churches/${id}`);
                const responses = await axios.all([getChurches]);
                setChurches(responses[0].data);

            } catch (err) {
                console.error(err);
            }
        };
        fetch();
    }, []);

    return (
        <div className="detail-page">
            <Container className="container-page">
                <Row>
                    <Col sm={8}>
                        <Card className="cardBencanaLeft">
                            <p className="title">
                                {churches.properties != null ?
                                    <p> {churches.properties.name}</p>
                                    :
                                    null
                                }
                            </p>
                            <Row>
                                <Col sm={3} className="box">Nama Gereja</Col>
                                <Col sm={9} className="box">
                                    {churches.properties != null ?
                                        <p>: {churches.properties.name}</p>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3} className="box">Provinsi</Col>
                                <Col sm={9} className="box">
                                    {churches.properties != null ?
                                        <p>: {churches.properties.province}</p>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3} className="box">Jumlah Jemaat</Col>
                                <Col sm={9} className="box">
                                    {churches.properties != null ?
                                        <p>: {churches.properties.congregation} Jemaat</p>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={3} className="box">Update Terbaru</Col>
                                <Col sm={9} className="box">
                                    {churches.properties != null ?
                                        <p>: {churches.properties.lastUpdate}</p>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col sm={4}>
                        {churches.properties != null ?
                            <img className="imageChruch" src={churches.properties.churchImage}></img>
                            :
                            null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <Card className="cardBencanaLeft">
                            <p className="title"> risiko Bencana </p>
                            {churches.properties != null ?
                                <div>
                                    <Carousel cols={2} rows={2} gap={12} loop className="Carousel">

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[0].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[0].name}</p>
                                                </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[1].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[1].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[2].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[2].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[3].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[3].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[4].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[4].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[5].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[5].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[6].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[6].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[7].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[7].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[8].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[8].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[9].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[9].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[10].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[10].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[11].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[11].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[12].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[12].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Card
                                                style={{ background: churches.properties.disasterRisks[13].alertLevel.color, color: 'white' }}
                                                className="mb-2 dark disasterCard"
                                            >
                                                <Card.Header> <center><p>{churches.properties.disasterRisks[13].name}</p> </center></Card.Header>

                                            </Card>
                                        </Carousel.Item>

                                    </Carousel>
                                </div>
                                :
                                null
                            }

                        </Card>
                    </Col>
                    <Col sm={4}>
                        <Card className="cardBencanaRight">
                            <p className="title">Indikator Bencana</p>
                            {churches.properties != null ?
                                <div>

                                    <Row>
                                        <Col sm={2} className="box red"></Col>
                                        <Col sm={8} className="box">risiko Sangat Tinggi</Col>
                                    </Row>

                                    <Row>
                                        <Col sm={2} className="box orange"></Col>
                                        <Col sm={8} className="box">risiko Tinggi</Col>
                                    </Row>

                                    <Row>
                                        <Col sm={2} className="box yellow"></Col>
                                        <Col sm={8} className="box">risiko Sedang</Col>
                                    </Row>


                                    <Row>
                                        <Col sm={2} className="box green"></Col>
                                        <Col sm={8} className="box">risiko Rendah</Col>
                                    </Row>
                                </div>
                                :
                                null
                            }

                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>Kesiapan Gereja Menghadapi Bencana</h5>

                        {churches.properties != null ?
                            <div>
                                {churches.properties.disasterOccurs == "Sedikit siap" ?
                                    <Card className="cardBencanaLeft" style={{ background: "orange", color: 'white' }}>
                                        {churches.properties.disasterOccurs}
                                    </Card>
                                    :
                                    null
                                }
                                {churches.properties.disasterOccurs == "Siap" ?
                                    <Card className="cardBencanaLeft" style={{ background: "green", color: 'white' }}>
                                        {churches.properties.disasterOccurs}
                                    </Card>
                                    :
                                    null
                                }
                                {churches.properties.disasterOccurs == "Tidak siap" ?
                                    <Card className="cardBencanaLeft" style={{ background: "red", color: 'white' }}>
                                        {churches.properties.disasterOccurs}
                                    </Card>
                                    :
                                    null
                                }

                                {churches.properties.disasterOccurs == "Sangat siap" ?
                                    <Card className="cardBencanaLeft" style={{ background: "green", color: 'white' }}>
                                        {churches.properties.disasterOccurs}
                                    </Card>
                                    :
                                    null
                                }

                            </div>
                            :
                            null
                        }

                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>Kebutuhan Khusus Gereja</h5>
                        <Card className="cardBencanaLeft">
                            <Row >
                                <Col sm={3} className="box col">Kursus Yang Diperlukan</Col>
                                <Col sm={9} className="box col">
                                    {churches.properties != null ?
                                        <p>: {churches.properties.trainingNeeds}</p>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>
                            <Row className="Row">
                                <Col sm={3} className="box col">Yang diperlukan untuk peningkatan kapasitas gereja</Col>
                                <Col sm={9} className="box col">
                                    {churches.properties != null ?
                                        <p>: {churches.properties.increaseCapacity}</p>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>

                            <Row className="Row">
                                <Col sm={3} className="box col">Pihak yang berkompeten</Col>
                                <Col sm={9} className="box col">
                                    {churches.properties != null ?
                                        <p>: {churches.properties.competent}</p>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>

                            <Row className="Row">
                                <Col sm={3} className="box col">Perangkat/peralatan kesiapsiagaan bencana</Col>
                                <Col sm={9} className="box col">
                                    {churches.properties != null ?
                                        <p>: {churches.properties.preparednessTools}</p>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>


                        </Card>
                    </Col>
                </Row>


                <Row className="cardBencanaLeft">
                    <Tabs defaultActiveKey="Kesadaran Gereja" className="tabs">
                        <Tab className="content target" eventKey="Kesadaran Gereja" title="Kesadaran Gereja">

                            <Row className="Row cardBencanaLeft">
                                <Row >
                                    {churches.properties != null ?
                                        <div>
                                            <Row>
                                                <Col sm={3} className="box col">Rencana kesiapsiagaan :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.awareness.preparedness == "Punya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Rencana tanggap darurat :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.awareness.emergencyResPlan == "Punya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col sm={3} className="box col">Petugas evakuasi :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.awareness.evacuationOfficer == "Punya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Komisi tanggap darurat bencana :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.awareness.emergencyCommission == "Punya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>


                                            <Row>
                                                <Col sm={3} className="box col">Mengikuti simulasi evakuasi :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.awareness.evacuationSimulation == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Kegiatan menghadapi bencana :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.awareness.facingDisasterProg == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col sm={3} className="box col">Kemampuan penanganan :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.awareness.handlingSkill == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Regulasi/SOP respon bencana :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.awareness.disasterResponseSOP == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>

                                        </div>
                                        :
                                        null
                                    }


                                </Row>

                            </Row>

                        </Tab>
                        <Tab className="content target" eventKey="Bangunan Gereja" title="Bangunan Gereja">
                            <Row className="Row cardBencanaLeft">
                                <Row >
                                    {churches.properties != null ?
                                        <div>
                                            <Row>
                                                <Col sm={3} className="box col">Sistem peringatan dini :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.buildingPreparedness.warningSystem == "Punya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Bangunan gereja permanen :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.buildingPreparedness.permanentBuilding == "Punya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col sm={3} className="box col">Pintu dan jendela terbuka ke luar :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.buildingPreparedness.doorWindow == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Gereja sesuai building code :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.buildingPreparedness.buildingCode == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>


                                            <Row>
                                                <Col sm={3} className="box col">Dokumen pembangunan gedung :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.buildingPreparedness.constructionDoc == "Punya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Bangunan tahan gempa  :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.buildingPreparedness.earthquakeResistant == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col sm={3} className="box col">SarPras berpotensi membahayakan jemaat :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.buildingPreparedness.faciltyEndanger == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Jalur/rute evakuasi :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.buildingPreparedness.evacuationPath == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>

                                        </div>
                                        :
                                        null
                                    }


                                </Row>

                            </Row>
                        </Tab>
                        <Tab className="content target" eventKey="Team Bencana Gereja" title="Team Bencana Gereja">
                            <Row className="Row cardBencanaLeft">
                                <Row >
                                    {churches.properties != null ?
                                        <div>
                                            <Row>
                                                <Col sm={3} className="box col">Gereja memiliki alokasi anggaran khusus :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.teamPreparedness.specialBudget == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Sosialisasi penanganan darurat bencana :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.teamPreparedness.emergencyResponse == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col sm={3} className="box col">Pengembangan Ekonomi :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.teamPreparedness.economicDev == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                                <Col sm={3} className="box col">Edukasi yang dilakukan Gereja :</Col>
                                                <Col sm={3} className="col">
                                                    {churches.properties.teamPreparedness.churchEducation == "Ya" ?
                                                        <img className="imageCheck" src={Check}></img>
                                                        :
                                                        <img className="imageCheck" src={Decline}></img>

                                                    }
                                                </Col>

                                            </Row>

                                        </div>
                                        :
                                        null
                                    }


                                </Row>

                            </Row>

                        </Tab>
                    </Tabs>

                </Row>

                <Card className="cardBencanaLeft">
                    <p><strong>Keterangan</strong></p>
                    <Row>
                        <Row >
                            <Col sm={1}>
                                <img style={{ width: '100%' }} className="imageCheck" src={Check}></img>
                            </Col>
                            <Col>
                                : Punya/Ya
                            </Col>

                        </Row>

                        <Row >
                            <Col sm={1}>
                                <img style={{ width: '90%' }} className="imageCheck" src={Decline}></img>
                            </Col>
                            <Col>
                            : Tidak Punya/Tidak
                            </Col>
                        </Row>
                    </Row>

                </Card>
            </Container>

        </div >
    )

}
