import React, { Component } from 'react'
import './CardDashboardGereja.scss'
import { Container, Row, Col, Card, Dropdown, Tabs, Tab, Button, Alert, ProgressBar } from 'react-bootstrap';
import { Older, Vaksin, HumanResource, Officer, One, Two, Young } from '../../assets';
import axios from 'axios';
import NumberFormat from "react-number-format";
import Carousel from 'react-grid-carousel'
import Select from 'react-select';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class CardDashboardGereja extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectOptions: [],

        }
    }


    async getOptions() {
        const res = await axios.get(process.env.PTB_BACKEND_ENDPOINT+'/api/dashboard')
        const data = res.data

        const options = data.map(d => ({
            "label": d.location.provinsi,
            "totalCongregation": d.dashboardData.totalCongregation,
            "buildingPreparedness": d.dashboardData.buildingPreparedness,
            "teamPreparedness": d.dashboardData.teamPreparedness,
            "awareness": d.dashboardData.awareness,
            "preparednessPlanning": d.dashboardData.preparednessPlanning,
            "emergencyResPlan": d.dashboardData.emergencyResPlan,
            "warningSystem": d.dashboardData.warningSystem,
            "permanentChurchBuilding": d.dashboardData.permanentChurchBuilding,
            "doorWindowOut": d.dashboardData.doorWindowOut,
            "accordanceBuildingCode": d.dashboardData.accordanceBuildingCode,
            "constructionDoc": d.dashboardData.constructionDoc,
            "earthquakeResistant": d.dashboardData.earthquakeResistant,
            "buildingEarthquakeImpact": d.dashboardData.buildingEarthquakeImpact,
            "facilityEarthquakeImpact": d.dashboardData.facilityEarthquakeImpact,
            "faciltyEndanger": d.dashboardData.faciltyEndanger,
            "evacuationPath": d.dashboardData.evacuationPath,
            "evacuationPathVulnerable": d.dashboardData.evacuationPathVulnerable,
            "evacuationOfficer": d.dashboardData.evacuationOfficer,
            "emergencyCommission": d.dashboardData.emergencyCommission,
            "evacuationSimulation": d.dashboardData.evacuationSimulation,
            "disasterPreparednessPlan": d.dashboardData.disasterPreparednessPlan,
            "handlingAbility": d.dashboardData.handlingAbility,
            "disasterResponseRegulations": d.dashboardData.disasterResponseRegulations,
            "disasterBudgetAllocation": d.dashboardData.disasterBudgetAllocation,
            "churchRaisesFunds": d.dashboardData.churchRaisesFunds,
            "socializationOfDisasterEmergencyManagement": d.dashboardData.socializationOfDisasterEmergencyManagement,
            "disasterCommitteeInteractionGuide": d.dashboardData.disasterCommitteeInteractionGuide,
            "disasterTrainingSpeaker": d.dashboardData.disasterTrainingSpeaker,
        }))

        this.setState({
            selectOptions: options,
        })

    }
    componentDidMount() {
        this.getOptions()
    }


    handleChange(e) {
        this.setState({
            label: e.label,
            totalCongregation: e.totalCongregation,
            buildingPreparedness: e.buildingPreparedness,
            teamPreparedness: e.teamPreparedness,
            awareness: e.awareness,
            preparednessPlanning: e.preparednessPlanning,
            emergencyResPlan: e.emergencyResPlan,
            warningSystem: e.warningSystem,
            permanentChurchBuilding: e.permanentChurchBuilding,
            doorWindowOut: e.doorWindowOut,
            accordanceBuildingCode: e.accordanceBuildingCode,
            constructionDoc: e.constructionDoc,
            earthquakeResistant: e.earthquakeResistant,
            buildingEarthquakeImpact: e.buildingEarthquakeImpact,
            facilityEarthquakeImpact: e.facilityEarthquakeImpact,
            faciltyEndanger: e.faciltyEndanger,
            evacuationPath: e.evacuationPath,
            evacuationPathVulnerable: e.evacuationPathVulnerable,
            evacuationOfficer: e.evacuationOfficer,
            emergencyCommission: e.emergencyCommission,
            evacuationSimulation: e.evacuationSimulation,
            disasterPreparednessPlan: e.disasterPreparednessPlan,
            handlingAbility: e.handlingAbility,
            disasterResponseRegulations: e.disasterResponseRegulations,
            disasterBudgetAllocation: e.disasterBudgetAllocation,
            churchRaisesFunds: e.churchRaisesFunds,
            socializationOfDisasterEmergencyManagement: e.socializationOfDisasterEmergencyManagement,
            disasterCommitteeInteractionGuide: e.disasterCommitteeInteractionGuide,
            disasterTrainingSpeaker: e.disasterTrainingSpeaker,
        })
    }



    render() {
        console.log("data", this.state.selectOptions)
        let percetage;

        if (this.state.label == "Daerah Istimewa Yogyakarta") {
            percetage = "70"
        } else if (this.state.label == "Sulawesi Tengah") {
            percetage = "65"
        }


        return (
            <div className='dataGerejaCard-component'>
                <Select
                    className="dropdown"
                    options={this.state.selectOptions}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Pilih data Gereja terlebih dahulu"
                />
                <br></br>
                {this.state.label != null ?
                    <div>
                        <h5>Data Gereja Di Setiap Provinsi</h5>
                        <p>Provinsi Yang Anda Pilih Saat Ini Adalah <strong>{this.state.label}</strong> </p>
                        <p>Jumlah Total Jemaat : <b><NumberFormat value={this.state.totalCongregation} displayType={'text'} thousandSeparator={true} /></b> </p>


                        <br></br>

                        <div>
                            <Card className="cardBencanaRight">
                                <div>
                                    <p><strong>Indikator Kategori Warna Gereja</strong></p>
                                    <div class="box red"></div>
                                    <span> Kriteria Kurang &lt; 50% </span>
                                    <div class="box orange"></div>
                                    <span> Kriteria Cukup 50-69% </span>
                                    <div class="box blue"></div>
                                    <span> Kriteria Baik 70-84% </span>
                                    <div class="box green"></div>
                                    <span> Kriteria Sangat Baik &gt; 85%</span>
                                </div>
                            </Card>
                        </div>
                        <br></br>
                        <Row>
                            <Col xs={4}>
                                <Card>
                                    <Card.Body className="card-2">
                                        <Row>

                                            <div style={{ width: "40%", margin: "auto" }}>
                                                <CircularProgressbarWithChildren
                                                    value={this.state.awareness}
                                                    strokeWidth={5}
                                                    styles={{
                                                        // Customize the root svg element
                                                        root: {},
                                                        // Customize the path, i.e. the "completed progress"
                                                        path: {
                                                            // Path color
                                                            stroke: `${this.state.awareness < 50 ?

                                                                `rgba(255, 0, 0, ${this.state.awareness / 100})`
                                                                : this.state.awareness > 50 && this.state.awareness < 69 ?

                                                                    `rgba(255, 153, 0, ${this.state.awareness / 100})`
                                                                    : this.state.awareness > 70 && this.state.awareness < 84 ?

                                                                        `rgba(51, 102, 255, ${this.state.awareness / 100})`
                                                                        :
                                                                        null
                                                                }`,
                                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                            strokeLinecap: 'butt',
                                                            // Customize transition animation
                                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                                            // Rotate the path
                                                            transformOrigin: 'center center',
                                                        },
                                                        // Customize the circle behind the path, i.e. the "total progress"
                                                        trail: {
                                                            // Trail color
                                                            stroke: '#d6d6d6',
                                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                            strokeLinecap: 'butt',
                                                            // Rotate the trail
                                                            transform: 'rotate(0.25turn)',
                                                            transformOrigin: 'center center',
                                                        },
                                                        // Customize the text
                                                        text: {
                                                            // Text color
                                                            fill: '#f88',
                                                            // Text size
                                                            fontSize: '16px',
                                                        },
                                                        // Customize background - only used when the `background` prop is true
                                                        background: {
                                                            fill: '#3e98c7',
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        style={{ width: 30, marginTop: -5 }}
                                                        src={"https://cdn-icons-png.flaticon.com/512/1999/1999231.png"}
                                                        alt="Kesadaran"
                                                    />
                                                    <div style={{ fontSize: 16 }}>
                                                        <strong>{`${this.state.awareness}%`}</strong>
                                                    </div>

                                                </CircularProgressbarWithChildren>

                                            </div>
                                            <span style={{ margin: "auto" }}>Kesadaran terhadap bencana</span>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Rencana kesiapsiagaan
                                        <ProgressBar
                                            style={{ width: "100%" }}
                                            now={this.state.preparednessPlanning}
                                            label={`${this.state.preparednessPlanning}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.preparednessPlanning / percetage < 0.5 ?
                                                "danger"
                                                : this.state.preparednessPlanning / percetage > 0.5 && this.state.preparednessPlanning / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.preparednessPlanning / percetage > 0.70 && this.state.preparednessPlanning / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }

                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Rencana tanggap darurat
                                        <ProgressBar

                                            style={{ width: "100%" }
                                            }
                                            now={this.state.emergencyResPlan}
                                            label={`${this.state.emergencyResPlan}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.emergencyResPlan / percetage < 0.5 ?
                                                "danger"
                                                : this.state.emergencyResPlan / percetage > 0.5 && this.state.emergencyResPlan / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.emergencyResPlan / percetage > 0.70 && this.state.emergencyResPlan / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }

                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Petugas evakuasi
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.evacuationOfficer}
                                            label={`${this.state.evacuationOfficer}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.evacuationOfficer / percetage < 0.5 ?
                                                "danger"
                                                : this.state.evacuationOfficer / percetage > 0.5 && this.state.evacuationOfficer / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.evacuationOfficer / percetage > 0.70 && this.state.evacuationOfficer / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Komisi tanggap darurat bencana
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.emergencyCommission}
                                            label={`${this.state.emergencyCommission}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.emergencyCommission / percetage < 0.5 ?
                                                "danger"
                                                : this.state.emergencyCommission / percetage > 0.5 && this.state.emergencyCommission / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.emergencyCommission / percetage > 0.70 && this.state.emergencyCommission / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Pernah mengikuti simulasi evakuasi
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.evacuationSimulation}
                                            label={`${this.state.evacuationSimulation}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.evacuationSimulation / percetage < 0.5 ?
                                                "danger"
                                                : this.state.evacuationSimulation / percetage > 0.5 && this.state.evacuationSimulation / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.evacuationSimulation / percetage > 0.70 && this.state.evacuationSimulation / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Program atau rencana kegiatan menghadapi bencana
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.disasterPreparednessPlan}
                                            label={`${this.state.disasterPreparednessPlan}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.disasterPreparednessPlan / percetage < 0.5 ?
                                                "danger"
                                                : this.state.disasterPreparednessPlan / percetage > 0.5 && this.state.disasterPreparednessPlan / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.disasterPreparednessPlan / percetage > 0.70 && this.state.disasterPreparednessPlan / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Kemampuan menangani bencana
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.handlingAbility}
                                            label={`${this.state.handlingAbility}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.handlingAbility / percetage < 0.5 ?
                                                "danger"
                                                : this.state.handlingAbility / percetage > 0.5 && this.state.handlingAbility / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.handlingAbility / percetage > 0.70 && this.state.handlingAbility / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Response Tanggap Bencana

                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.disasterResponseRegulations}
                                            label={`${this.state.disasterResponseRegulations}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.disasterResponseRegulations / percetage < 0.5 ?
                                                "danger"
                                                : this.state.disasterResponseRegulations / percetage > 0.5 && this.state.disasterResponseRegulations / percetage < 0.69 ?
                                                    "warning"
                                                    : this.state.disasterResponseRegulations / percetage > 0.70 && this.state.disasterResponseRegulations / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>


                            </Col>

                            <Col xs={4}>
                                <Card>
                                    <Card.Body className="card-2">
                                        <Row>
                                            <div style={{ width: "40%", margin: "auto" }}>
                                                <CircularProgressbarWithChildren
                                                    value={this.state.buildingPreparedness}
                                                    strokeWidth={5}
                                                    styles={{
                                                        // Customize the root svg element
                                                        root: {},
                                                        // Customize the path, i.e. the "completed progress"
                                                        path: {
                                                            // Path color
                                                            stroke: `${this.state.buildingPreparedness < 50 ?

                                                                `rgba(255, 0, 0, ${this.state.awareness / 100})`
                                                                : this.state.buildingPreparedness > 50 && this.state.buildingPreparedness < 69 ?

                                                                    `rgba(255, 153, 0, ${this.state.awareness / 100})`
                                                                    : this.state.buildingPreparedness > 70 && this.state.buildingPreparedness < 84 ?

                                                                        `rgba(51, 102, 255, ${this.state.buildingPreparedness / 100})`
                                                                        :
                                                                        null
                                                                }`,
                                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                            strokeLinecap: 'butt',
                                                            // Customize transition animation
                                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                                            // Rotate the path
                                                            transformOrigin: 'center center',
                                                        },
                                                        // Customize the circle behind the path, i.e. the "total progress"
                                                        trail: {
                                                            // Trail color
                                                            stroke: '#d6d6d6',
                                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                            strokeLinecap: 'butt',
                                                            // Rotate the trail
                                                            transform: 'rotate(0.25turn)',
                                                            transformOrigin: 'center center',
                                                        },
                                                        // Customize the text
                                                        text: {
                                                            // Text color
                                                            fill: '#f88',
                                                            // Text size
                                                            fontSize: '16px',
                                                        },
                                                        // Customize background - only used when the `background` prop is true
                                                        background: {
                                                            fill: '#3e98c7',
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        style={{ width: 30, marginTop: -5 }}
                                                        src={"https://cdn-icons-png.flaticon.com/512/1191/1191591.png"}
                                                        alt="Bangunan"
                                                    />
                                                    <div style={{ fontSize: 16 }}>
                                                        <strong>{`${this.state.buildingPreparedness}%`}</strong>
                                                    </div>

                                                </CircularProgressbarWithChildren>

                                            </div>
                                            <span style={{ margin: "auto" }}>Kesiapan Bangunan Gereja</span>
                                        </Row>
                                    </Card.Body>

                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Sistem peringatan dini


                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.warningSystem}
                                            label={`${this.state.warningSystem}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.warningSystem / percetage < 0.5 ?
                                                "danger"
                                                : this.state.warningSystem / percetage > 0.5 && this.state.warningSystem / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.warningSystem / percetage > 0.70 && this.state.warningSystem / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }

                                        />
                                    </Card.Body>
                                </Card>

                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Bangunan gereja permanen


                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.permanentChurchBuilding}
                                            label={`${this.state.permanentChurchBuilding}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.permanentChurchBuilding / percetage < 0.5 ?
                                                "danger"
                                                : this.state.permanentChurchBuilding / percetage > 0.5 && this.state.permanentChurchBuilding / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.permanentChurchBuilding / percetage > 0.70 && this.state.permanentChurchBuilding / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />


                                    </Card.Body>
                                </Card>

                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Pintu dan jendela terbuka ke luar
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.doorWindowOut}
                                            label={`${this.state.doorWindowOut}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.doorWindowOut / percetage < 0.5 ?
                                                "danger"
                                                : this.state.doorWindowOut / percetage > 0.5 && this.state.doorWindowOut / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.doorWindowOut / percetage > 0.70 && this.state.doorWindowOut / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Gereja sesuai building code
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.accordanceBuildingCode}
                                            label={`${this.state.accordanceBuildingCode}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.accordanceBuildingCode / percetage < 0.5 ?
                                                "danger"
                                                : this.state.accordanceBuildingCode / percetage > 0.5 && this.state.accordanceBuildingCode / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.accordanceBuildingCode / percetage > 0.70 && this.state.accordanceBuildingCode / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Gereja Memiliki Dokumen pembangunan gedung
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.constructionDoc}
                                            label={`${this.state.constructionDoc}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.constructionDoc / percetage < 0.5 ?
                                                "danger"
                                                : this.state.constructionDoc / percetage > 0.5 && this.state.constructionDoc / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.constructionDoc / percetage > 0.70 && this.state.constructionDoc / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Bangunan tahan gempa
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.earthquakeResistant}
                                            label={`${this.state.earthquakeResistant}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.earthquakeResistant / percetage < 0.5 ?
                                                "danger"
                                                : this.state.earthquakeResistant / percetage > 0.5 && this.state.earthquakeResistant / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.earthquakeResistant / percetage > 0.70 && this.state.earthquakeResistant / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Dampak gempa pada bangunan
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.buildingEarthquakeImpact}
                                            label={`${this.state.buildingEarthquakeImpact}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.buildingEarthquakeImpact / percetage < 0.5 ?
                                                "danger"
                                                : this.state.buildingEarthquakeImpact / percetage > 0.5 && this.state.buildingEarthquakeImpact / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.buildingEarthquakeImpact / percetage > 0.70 && this.state.buildingEarthquakeImpact / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>



                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Memiliki Jalur/rute evakuasi



                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.evacuationPath}
                                            label={`${this.state.evacuationPath}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.evacuationPath / percetage < 0.5 ?
                                                "danger"
                                                : this.state.evacuationPath / percetage > 0.5 && this.state.evacuationPath / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.evacuationPath / percetage > 0.70 && this.state.evacuationPath / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>



                            </Col>
                            <Col xs={4}>
                                <Card>
                                    <Card.Body className="card-2">
                                        <Row>
                                            <div style={{ width: "40%", margin: "auto" }}>
                                                <CircularProgressbarWithChildren
                                                    value={this.state.teamPreparedness}
                                                    strokeWidth={5}
                                                    styles={{
                                                        // Customize the root svg element
                                                        root: {},
                                                        // Customize the path, i.e. the "completed progress"
                                                        path: {
                                                            // Path color
                                                            stroke: `${this.state.teamPreparedness < 50 ?

                                                                `rgba(255, 0, 0, ${this.state.teamPreparedness / 100})`
                                                                : this.state.teamPreparedness > 50 && this.state.teamPreparedness < 69 ?

                                                                    `rgba(255, 153, 0, ${this.state.teamPreparedness / 100})`
                                                                    : this.state.teamPreparedness > 70 && this.state.teamPreparedness < 84 ?

                                                                        `rgba(51, 102, 255, ${this.state.teamPreparedness / 100})`
                                                                        :
                                                                        null
                                                                }`,
                                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                            strokeLinecap: 'butt',
                                                            // Customize transition animation
                                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                                            // Rotate the path
                                                            transformOrigin: 'center center',
                                                        },
                                                        // Customize the circle behind the path, i.e. the "total progress"
                                                        trail: {
                                                            // Trail color
                                                            stroke: '#d6d6d6',
                                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                            strokeLinecap: 'butt',
                                                            // Rotate the trail
                                                            transform: 'rotate(0.25turn)',
                                                            transformOrigin: 'center center',
                                                        },
                                                        // Customize the text
                                                        text: {
                                                            // Text color
                                                            fill: '#f88',
                                                            // Text size
                                                            fontSize: '16px',
                                                        },
                                                        // Customize background - only used when the `background` prop is true
                                                        background: {
                                                            fill: '#3e98c7',
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        style={{ width: 30, marginTop: -5 }}
                                                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRPNoaLuPMHnWLJM-HOPXompZz6MGAB6gJpg&usqp=CAU"}
                                                        alt="Team"
                                                    />
                                                    <div style={{ fontSize: 16 }}>
                                                        <strong>{`${this.state.teamPreparedness}%`}</strong>
                                                    </div>

                                                </CircularProgressbarWithChildren>

                                            </div>
                                            <span style={{ margin: "auto" }}>Kesiapan Team Bencana Gereja</span>
                                        </Row>
                                    </Card.Body>

                                </Card>


                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Gereja memiliki alokasi anggaran khusus untuk respon bencana
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.disasterBudgetAllocation}
                                            label={`${this.state.disasterBudgetAllocation}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.disasterBudgetAllocation / percetage < 0.5 ?
                                                "danger"
                                                : this.state.disasterBudgetAllocation / percetage > 0.5 && this.state.disasterBudgetAllocation / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.disasterBudgetAllocation / percetage > 0.70 && this.state.disasterBudgetAllocation / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>

                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Gereja mengumpulkan dana melalui Penggalangan Dana
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.churchRaisesFunds}
                                            label={`${this.state.churchRaisesFunds}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.churchRaisesFunds / percetage < 0.5 ?
                                                "danger"
                                                : this.state.churchRaisesFunds / percetage > 0.5 && this.state.churchRaisesFunds / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.churchRaisesFunds / percetage > 0.70 && this.state.churchRaisesFunds / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>

                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Gereja melakukan sosialisasi penanganan darurat bencana
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.socializationOfDisasterEmergencyManagement}
                                            label={`${this.state.socializationOfDisasterEmergencyManagement}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.socializationOfDisasterEmergencyManagement / percetage < 0.5 ?
                                                "danger"
                                                : this.state.socializationOfDisasterEmergencyManagement / percetage > 0.5 && this.state.socializationOfDisasterEmergencyManagement / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.socializationOfDisasterEmergencyManagement / percetage > 0.70 && this.state.socializationOfDisasterEmergencyManagement / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>

                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Gereja memiliki panduan berinteraksi dengan para pihak
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.disasterCommitteeInteractionGuide}
                                            label={`${this.state.disasterCommitteeInteractionGuide}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.disasterCommitteeInteractionGuide / percetage < 0.5 ?
                                                "danger"
                                                : this.state.disasterCommitteeInteractionGuide / percetage > 0.5 && this.state.disasterCommitteeInteractionGuide / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.disasterCommitteeInteractionGuide / percetage > 0.70 && this.state.disasterCommitteeInteractionGuide / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>

                                <Card style={{ marginBottom: "5px" }}>
                                    <Card.Body>
                                        Mengundang narasumber memberikan pelatihan
                                        <ProgressBar style={{ width: "100%" }}
                                            now={this.state.disasterTrainingSpeaker}
                                            label={`${this.state.disasterTrainingSpeaker}/${percetage} Gereja`}
                                            max={percetage}
                                            variant={`${this.state.disasterTrainingSpeaker / percetage < 0.5 ?
                                                "danger"
                                                : this.state.disasterTrainingSpeaker / percetage > 0.5 && this.state.disasterTrainingSpeaker / percetage < 0.69 ?

                                                    "warning"
                                                    : this.state.disasterTrainingSpeaker / percetage > 0.70 && this.state.disasterTrainingSpeaker / percetage < 0.84 ?

                                                        "primary"
                                                        :
                                                        null
                                                }`
                                            }
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>


                        {this.state.label == "Daerah Istimewa Yogyakarta" ?
                            <Row>

                                <strong>3 jenis Ancaman Bencana Alam yang paling sering Provinsi Daerah Istimewa Yogyakarta</strong>
                                <iframe src="https://flo.uri.sh/visualisation/9395114/embed" width="100%" height="500" marginheight="0" marginwidth="0" frameborder="0" scrolling='no'></iframe>


                            </Row>
                            :
                            null
                        }

                        {this.state.label == "Sulawesi Tengah" ?
                            <Row>
                                <strong>3 jenis Ancaman Bencana Alam yang paling sering Provinsi Sulawesi Tengah</strong>
                                <iframe src="https://flo.uri.sh/visualisation/9394589/embed" width="100%" height="500" marginheight="0" marginwidth="0" frameborder="0" scrolling='no'></iframe>
                            </Row>
                            :
                            null
                        }
                    </div>
                    :
                    <Alert variant='info'>
                        <h4>Anda Belum Memilih Data Provinsi</h4>
                        <span>Sepertinya anda belum memilih data Gereja untuk setiap Provinsi!</span>
                    </Alert>
                }
            </div >
        )
    }
}
