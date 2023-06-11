import React, { Component } from 'react'
import './weather.scss'
import WeatherCity from "./WeatherCity";
import WeatherForm from "./WeatherForm";
import { Card } from 'react-bootstrap';
import { Dropdown, Button, Table, Col, Row } from 'react-bootstrap';
import ReactModal from 'react-modal';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BadgeCity from './BadgeCity';
import HumidityCity from './HumidityCity';
import WindCity from './WindCity';
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { data } from 'jquery';
import axios from 'axios';
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import ReactTable from "react-table";
import { matchSorter } from 'match-sorter'
import { CaseCovid, church } from '../../assets';

const ReactTableFixedColumns = withFixedColumns(ReactTable);
const Properties = {
  sortable: true,
  filterable: true,
  resizable: true,
  show: true
};
export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: true,
      showModal: false,
      showModal2: false,
      data: [],
      dataWeather: [],
      Sleman: []

    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.handleOpenModal2 = this.handleOpenModal2.bind(this);
    this.handleCloseModal2 = this.handleCloseModal2.bind(this);

    this.handleOpenModal3 = this.handleOpenModal3.bind(this);
    this.handleCloseModal3 = this.handleCloseModal3.bind(this);


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

  handleOpenModal3() {
    this.setState({ showModal3: true });
  }

  handleCloseModal3() {
    this.setState({ showModal3: false });
  }

  async getUsersData() {
    const res = await axios.get(process.env.PTB_BACKEND_ENDPOINT+'/api/weather')
    console.log(res.data)
    this.setState({ loading: false, users: res.data })
  }

  componentDidMount() {
    this.getUsersData()

    axios.get(process.env.PTB_BACKEND_ENDPOINT+`/api/weather`)
      .then(res => {
        const dataWeather = res.data;
        this.setState({ dataWeather });
      })


    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ab85db1d64844ec8aac60659220404 &q=Sleman&days=1&aqi=no&alerts=no`)
      .then(res => {
        const Sleman = res.data;
        this.setState({ Sleman });
      })
  }

  render() {

    return (
      <div>
        <div className="card m-5">
          <div className="card-body">
            <div className='information'>
            <WeatherForm city="Semarang" />
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <h6> Total Potensi Angin Topan</h6>
                    </Card.Header>
                    <Card.Body className="card">
                      <Row>

                        <Col xs={7}>
                          <Button variant="success" onClick={this.handleOpenModal}><strong>22 Gereja</strong></Button>
                        </Col >

                        <Col xs={5}> <img className="image-col" src="https://static.wixstatic.com/media/2cd43b_03b9f104709d419c89492a3af02c9209~mv2.png/v1/fill/w_256,h_256,q_90/2cd43b_03b9f104709d419c89492a3af02c9209~mv2.png" />  </Col>
                      </Row>
                    </Card.Body>


                    <ReactModal
                      isOpen={this.state.showModal}
                      style={{ marginTop: 24 }}
                      className="mymodal custom-y-scrollbar-xs"
                    >
                      <div>
                        {this.state.dataWeather.map(data =>

                          <div className='daftar-covid custom-y-scrollbar-xs'>
                            {data.disasterPotential == "Angin Topan" ?
                              <div >
                                <span >{data.name}</span>
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


                  </Card>

                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <h6>Total Potensi Kekeringan</h6>
                    </Card.Header>
                    <Card.Body className="card">
                      <Row>

                        <Col xs={7}>
                          <Button variant="success" onClick={this.handleOpenModal2}><strong>15 Gereja</strong></Button>
                        </Col >

                        <Col xs={5}> <img className="image-col" src="https://cdn-icons-png.flaticon.com/512/1684/1684416.png" />  </Col>
                      </Row>
                      <ReactModal
                      isOpen={this.state.showModal2}
                      style={{ marginTop: 24 }}
                      className="mymodal custom-y-scrollbar-xs"
                    >
                      <div>
                        {this.state.dataWeather.map(data =>

                          <div className='daftar-covid custom-y-scrollbar-xs'>
                            {data.disasterPotential == "Kekeringan" ?
                              <div >
                                <span >{data.name}</span>
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

                    </Card.Body>

                  </Card>
                </Col>
                <Col>

                  <Card>
                    <Card.Header>
                      <h6>  Total Potensi Banjir</h6>
                    </Card.Header>
                    <Card.Body className="card">
                      <Row>
                        <Col xs={7}>

                          <Button variant="success" onClick={this.handleOpenModal3}><strong>12 Gereja</strong></Button>
                        </Col >

                        <Col xs={5}> <img className="image-col" src="https://cdn.pixabay.com/photo/2020/10/15/19/20/flood-5657777_1280.png" />  </Col>
                      </Row>
                    </Card.Body>
                    <ReactModal
                      isOpen={this.state.showModal3}
                      style={{ marginTop: 24 }}
                      className="mymodal custom-y-scrollbar-xs"
                    >
                      <div>
                        {this.state.dataWeather.map(data =>

                          <div className='daftar-covid custom-y-scrollbar-xs'>
                            {data.disasterPotential == "Banjir" ?
                              <div >
                                <span >{data.name}</span>
                              </div>
                              : null
                            }


                          </div>
                        )
                        }
                      </div>
                      <br></br>
                      <Button className='closing' onClick={this.handleCloseModal3}>Close Modal</Button>

                    </ReactModal>
                  </Card>
                </Col>

              </Row>

                        

            </div>
            <hr></hr>
            <ReactTableFixedColumns
              data={this.state.users}
              columns={[
                {
                  Header: "Informasi Gereja",
                  fixed: "left",

                  columns: [
                    {
                      Header: 'Nama Gereja',
                      accessor: d => d.name,
                      id: "name",
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["name"] }),
                      filterAll: true,
                      ...Properties,
                      width: 300,
                    }
                  ]
                },
                {
                  Header: "Informasi Potensi Berdasarkan Cuaca Alam",
                  fixed: "left",
                  columns: [
                    {
                      Header: 'Cuaca',
                      accessor: d => <span >
                          {d.weather} &#8451;
                       </span>,
                      id: "weather",
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["weather"] }),
                      filterAll: true,
                      ...Properties,
                      width: 200,
                    }, {
                      Header: 'Suhu Udara',
                      accessor: d => {
                        if (d.badge === 'PANAS') {
                          return (
                          <Button variant='danger'>PANAS</Button>
                          )
                        } else if (d.badge === 'HANGAT') {
                          return (
                            <Button variant='warning'>HANGAT</Button>
                          )
                        } else if (d.badge === 'DINGIN') {
                          return (
                            <Button variant='info'>DINGIN</Button>
                          )
                        } else if (d.badge === 'Sleman') {
                          return (
                            <HumidityCity city="tokyo" />
                          )
                        } else if (d.badge === 'KotaPalu') {
                          return (
                            <HumidityCity city="palu" />
                          )
                        } else if (d.badge === 'Yogyakarta') {
                          return (
                            <HumidityCity city="Yogyakarta" />
                          )
                        } else if (d.badge === 'Wates ') {
                          return (
                            <HumidityCity city="Wates" />
                          )
                        } else if (d.badge === 'Sigi') {
                          return (
                            <HumidityCity city="Sigi" />
                          )
                        }


                      },
                      id: "badge",
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["badge"] }),
                      filterAll: true,
                      ...Properties,
                      width: 200,
                    }, {
                      Header: 'Kelembapan Udara',
                      accessor: d => <span> {d.humidity}%</span>,
                      id: "humidity",
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["humidity"] }),
                      filterAll: true,
                      ...Properties,
                      width: 100,
                    }, {
                      Header: 'Kecepatan Angin',
                      accessor:d => <span> {d.wind}km/H</span>,
                      id: "wind",
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["humidity"] }),
                      filterAll: true,
                      ...Properties,
                      width: 100,
                    }, {
                      Header: 'Potensi Bencana',
                      accessor: d => d.disasterPotential
                      ,
                      id: "disasterPotential",
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["disasterPotential"] }),
                      filterAll: true,
                      ...Properties,
                      width: 100,
                    }
                  ]
                },

              ]}
              defaultPageSize={10}
              style={{ height: '100%' }}
              className="-striped"
            />
          </div>
        </div>
      </div>
    )
  }
}