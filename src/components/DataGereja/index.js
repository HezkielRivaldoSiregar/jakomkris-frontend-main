import React, { Component } from 'react'
import './dataGereja.scss'
import { Container, Row, Col, Card, Tabs, Tab, Button, Table, Nav } from 'react-bootstrap';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Link } from "react-router-dom";
import { Drizzling } from '../../assets'
import { matchSorter } from 'match-sorter'
import { CardDashboardGereja } from '../../components'
import { useSticky } from 'react-table-sticky';
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
const Properties = {
    sortable: true,
    filterable: true,
    resizable: true,
    show: true
  };
export default class Datagereja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true

        }
    }

    async getUsersData() {
        const res = await axios.get(process.env.PTB_BACKEND_ENDPOINT+'/api/churches')
        console.log(res.data)
        this.setState({ loading: false, users: res.data })
    }
    componentDidMount() {
        this.getUsersData()
    }

    render() {
        const columns = [
            {
                Header: "Informasi Gereja",
                fixed: "left",
                
                columns: [
                    {
                        Header: 'Nama Gereja',
                        accessor: d => d.properties.name,
                        id: "properties.name",
                        filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, { keys: ["properties.name"] }),
                        filterAll: true,
                        ...Properties,
                        width: 100,
                    },
                    {
                        Header: 'Alamat',
                        accessor: d => d.properties.address,
                        id: "properties.address",
                        ...Properties,
                        filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, { keys: ["properties.address"] }),
                        filterAll: true,
                        width: 100
                    }
                ]
            }, {
                Header: "Jenis Ancaman Bencana",
                columns: [
                    {
                        Header: "gempa",
                        id: "gempa",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[0].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    },
                    {
                        Header: "Banjir",
                        id: "banjir",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[1].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    },
                    {
                        Header: "Kekeringan",
                        id: "Kekeringan",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[2].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    },
                    {
                        Header: "Tsunami",
                        id: "Tsunami",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[3].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    }
                    ,
                    {
                        Header: "Cuaca Ekstrim",
                        id: "Cuaca Ekstrim",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[4].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    }
                    ,
                    {
                        Header: "Gelombang Ekstrim dan Abrasi",
                        id: "Gelombang Ekstrim dan Abrasi",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[5].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    }
                    ,
                    {
                        Header: "Kebakaran Hutan dan Lahan",
                        id: "Kebakaran Hutan dan Lahan",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[6].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    },
                    {
                        Header: "Letusan Gunung Berapi",
                        id: "Letusan Gunung Berapi",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[7].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    }
                    ,
                    {
                        Header: "Tanah Longsor",
                        id: "Tanah Longsor",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[8].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    }
                    ,
                    {
                        Header: "Multi Bahaya",
                        id: "Multi Bahaya",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[9].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    },
                    {
                        Header: "Terorisme",
                        id: "Terorisme",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[10].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    },
                    {
                        Header: "Likuefaksi",
                        id: "Likuefaksi",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[11].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    }
                    ,
                    {
                        Header: "Terorisme",
                        id: "Terorisme",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[11].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    }
                    ,
                    {
                        Header: "Konflik",
                        id: "Konflik",
                        accessor: d =>
                            <span>
                                <span className="bencana" style={{ background: d.properties.disasterRisks[12].alertLevel.color, margin: 5, padding: 5 }}></span>
                            </span>,
                    }
                ]
            },
            {
                Header: "Informasi Gereja",
                fixed: "right",

                columns: [
                    {
                        Header: 'Kesiapan',
                        fixed: 'right',
                        id: '_id',
                        Filter: e => (
                            <div> </div>
                        ),
                        accessor: e => <Button style={{ width: "100%", height: "80%", backgroundColor: "honeydew" }}>
                            {/* <img src={Drizzling} alt="Grow" width="35px" /> */}
                            <a href={`/detail?id=${e._id}`} style={{ textDecoration: "none" }}>Selengkapnya</a>
                        </Button>,
                        width: 150,
                    }
                ]
            }

        ]
        return (
            <div className='dataGereja-component'>
                <CardDashboardGereja />
                <br></br>


                <ReactTableFixedColumns
                    data={this.state.users}
                    columns={columns}
                    defaultPageSize={10}
                    style={{ height: '100%' }}
                    className="-striped"
                />
                <div>
                    <Card className="cardBencanaRight">
                        <div>
                            <p><strong>Indikator Kategori Warna Gereja</strong></p>
                            <div class="box red"></div>
                            <span> Risiko Sangat Tinggi </span>
                            <div class="box orange"></div>
                            <span> Risiko Tinggi </span>
                            <div class="box yellow"></div>
                            <span> Risiko Sedang </span>
                            <div class="box green"></div>
                            <span> Risiko Rendah </span>
                        </div>
                    </Card>
                </div>

            </div >
        )
    }
}