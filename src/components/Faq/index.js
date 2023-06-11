import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap'
import { MenuChevron } from '../../assets';
import axios from 'axios';
import './Faq.scss'

export default class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subMenu: 'Faq',
            idToggleActive: null,
            toggleActive: false,
            dataFaq: [],
            dataFaqSelected: null
        }
    }

    componentDidMount() {

        axios.get(process.env.PTB_BACKEND_ENDPOINT+`/api/faq`)
            .then(res => {
                const dataFaq = res.data;
                this.setState({ dataFaq });
            })
    }

    handleClickItem(value) {
        this.setState({ itemSelected: value })
    }

    handleToggle(event) {
        let { idToggleActive, toggleActive } = this.state
        let idToggle = event.target._id

        console.log(idToggle)

        if (!toggleActive) {
            this.setState({
                idToggleActive: idToggle,
                toggleActive: true
            })
        }
        else {
            if (toggleActive && idToggleActive == idToggle) {
                this.setState({
                    toggleActive: false,
                    idToggleActive: null
                })
            }
            else {
                this.setState({
                    idToggleActive: idToggle
                });
            }
        }
    }


    render() {
        let { idToggleActive, toggleActive } = this.state
        let { dataFaq, dataFaqSelected } = this.state
        let { isShow } = this.props
        return (
            <div className="faq">
                <div className="Faq-page">
                    {dataFaq.map((item, i) => {
                        return (
                            <Accordion className="accordion">
                                <Card className={"card" + (i == 0 ? ' top' : ' bottom' )}>
                                    <Card.Header className={"header-side" + (idToggleActive == item._id ? ' active' : '')}>
                                        <Accordion.Toggle className="title-toggle" as="div" variant="link" eventKey={item._id} id={item._id} onClick={(event) => this.handleToggle(event)}>
                                            {item.question}       
                                        </Accordion.Toggle>
                                        <img src={MenuChevron} className="chevron" />
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={item._id}>
                                        <Card.Body >
                                            <div className="description" dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card> 
                            </Accordion>
                        )
                    })}
                </div>
            </div>
        )
    }
}