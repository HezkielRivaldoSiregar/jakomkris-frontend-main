import React, { Component } from 'react'
import './peta.scss'
import { ModalPeta } from '../../components';

export default class Peta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subMenu: 'peta'
        }
    }

    componentDidMount() {
        let { subMenu } = this.state
        this.props.onSubMenu(subMenu)
    }

    render() {
        return (
            <div className="peta-page">
                <ModalPeta/>
            </div>
        )
    }
}