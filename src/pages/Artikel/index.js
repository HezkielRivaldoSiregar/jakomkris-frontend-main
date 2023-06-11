import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { MenuClose, MenuSearch, NotFound } from '../../assets'
import './artikel.scss'
import axios from 'axios';
export default class Artikel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subMenu: 'artikel',
            value: '',
            dataArtikel: [],
            filterSearchArtikel: [],
            valueSearchArtikel: '',
            selectedSearchArtikel: null,
            id: 1,
            isSearch: 0
        }
    }

    componentDidMount() {
        let { subMenu, dataArtikel } = this.state
        this.props.onSubMenu(subMenu)

        axios.get(process.env.PTB_BACKEND_ENDPOINT+`/api/article`)
            .then(res => {
                const dataArtikel = res.data;
                this.setState({  
                    filterSearchArtikel: dataArtikel, 
                    dataArtikel 
                });
            })
    }

    handleChangeSearch = () => {
        let { dataArtikel } = this.state

        this.setState({
            filterSearchArtikel: dataArtikel
        });
    };

    filterListSearch = (e) => {
        let { dataArtikel } = this.state

        let updatedList = dataArtikel.filter(item => {
            return (
                item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
            );
        });
        this.setState({
            filterSearchArtikel: updatedList,
            valueSearchArtikel: e.target.value,
            isSearch: 1
        });
    };

    handleClickArtikel(item) {
        this.setState({
            valueSearchArtikel: item.title,
            selectedSearchArtikel: item.title,
            id: item._id
        })
    }

    handleRemoveSearch = () => {
        let { dataArtikel} = this.state

        this.setState({
            valueSearchArtikel: '',
            filterSearchArtikel: dataArtikel,
            selectedSearchArtikel: null
        });
    };

    render() {
        let { selectedSearchArtikel, dataArtikel, isSearch } = this.state
        const { filterSearchArtikel, valueSearchArtikel, id } = this.state;

        console.log("id: ", id)
        console.log("isSearch : ", isSearch)
        console.log("FilterSearchArtikel: ", filterSearchArtikel.length)


        return (

            <div className="home-page content-page">
                <Container bsPrefix="container-page">
                    <Row>
                        <Col className="left-side-article" xs={4}>
                            <div className="search-group">
                                <div className="form-search">
                                    <Form.Group className="input-search">
                                        <Form.Control
                                            className="form-input inputSearch"
                                            type="text"
                                            name="Article"
                                            placeholder="Cari Artikel"
                                            value={valueSearchArtikel}
                                            onClick={this.handleChangeSearch}
                                            onChange={this.filterListSearch}
                                        />
                                        {valueSearchArtikel != '' ?
                                            <span className="btn-remove" onClick={this.handleRemoveSearch}>
                                                <img src={MenuClose} alt="searchArtikel" />
                                            </span>
                                            :
                                            <span className="btn-search">
                                                <img src={MenuSearch} alt="searchArtikel" />
                                            </span>
                                        }
                                    </Form.Group>
                                </div>
                                <div className="article-left custom-y-scrollbar-xs">
                                    {filterSearchArtikel.length > 0 && isSearch == 0?
                                        <div>
                                            {filterSearchArtikel.map((item, i) => {
                                                return (
                                                    <div className="article" onClick={() => this.handleClickArtikel(item)}>
                                                        <Col className="colomn" sm={4}>
                                                            <img className="image" src={item.image} alt="DefaultState" />
                                                        </Col>
                                                        <Col className="content" sm={5}>
                                                        <a className="title-article">{item.title.slice(0,42)}...</a> <br></br>
                                                            <span className="date">{item.date}</span>

                                                        </Col>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :filterSearchArtikel.length > 0 && isSearch == 1?
                                        <div>
                                            {filterSearchArtikel.map((item, i) => {
                                                return (
                                                    <div className="article" onClick={() => this.handleClickArtikel(item)}>
                                                        <Col className="colomn" sm={4}>
                                                            <img className="image" src={item.image} alt="DefaultState" />
                                                        </Col>
                                                        <Col className="content" sm={5}>
                                                            <a className="title-article">{item.title.slice(0,42)}...</a> <br></br>
                                                            <span className="date">{item.date}</span>

                                                        </Col>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :filterSearchArtikel.length == 0 && isSearch == 1?
                                        <div className='article'>
                                            <img src={NotFound} width="100%" height="500px"/> 
                                        </div>
                                    :
                                    null
                                    }
                                    
                                </div>
                            </div>
                        </Col>


                        {selectedSearchArtikel != null ?
                            <Col className="right-side-article custom-y-scrollbar-xs" xs={7}>
                                {dataArtikel.map((item, i) => {
                                    if (id == item._id) {
                                        return (
                                            <div className="articles ">
                                                <img className="image-big" src={item.image} alt="gambarArtikel" />
                                                <div className="date-time">
                                                    <p className="date-article">{item.date}</p>
                                                    <br/>
                                                </div>
                                                <h5 className="big-title">{item.title}</h5>
                                                <div className="content-article" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                                {/* <p className="content-article">
                                                    {item.content}
                                                </p> */}
                                            </div>
                                        )
                                    }
                                })}
                            </Col>
                            :
                            null
                        }

                    </Row>
                </Container>
            </div>
        )
    }
}