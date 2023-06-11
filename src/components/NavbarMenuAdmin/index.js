import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Faq,FaqFilled,MenuArticle, MenuArticleFilled, MenuChurch, MenuChurchFilled, MenuHome, MenuHomeFilled} from '../../assets'
import './navbarMenuAdmin.scss'
import { isMobile } from "react-device-detect";

export class NavbarMenuAdmin extends Component {
    constructor(props) {
		super(props);
		this.state = {
            isSidebarExpand: true
        }
	}

    handleExpandSidebar = (value) => {
        this.setState({
            isSidebarExpand: value
        })

        this.props.onExpandSidebar(value);
    }
    render() {
        let { isSidebarExpand } = this.state
        let { subMenu } = this.props

        return (
            <div className={isMobile ? "navbarMenuAdmin" + (isSidebarExpand ? ' expanded' : ' unexpanded') : "sidebar" + (isSidebarExpand ? ' expanded' : ' unexpanded')}>
                <div className="content">

                    <Link to={`${process.env.PUBLIC_URL}/admin`} className={"btn-menu " + (subMenu == 'admin' ? 'active' : '')}>
                        <img src={subMenu == 'admin' ? MenuHomeFilled : MenuHome} alt="menu-admin" />
                        <p>{isSidebarExpand ? 'Admin' : null}</p>
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/dataGereja`} className={"btn-menu " + (subMenu == 'dataGereja' ? 'active' : '')}>
                        <img src={subMenu == 'dataGereja' ? MenuChurchFilled : MenuChurch} alt="menu-dataGereja" width="19px"/>
                        <p>{isSidebarExpand ? 'Data Gereja' : null}</p>
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/dataArtikel`} className={"btn-menu " + (subMenu == 'dataArtikel' ? 'active' : '')}>
                        <img src={subMenu == 'dataArtikel' ? MenuArticleFilled : MenuArticle} alt="menu-dataArtikel" />
                        <p>{isSidebarExpand ? 'Data Artikel' : null}</p>
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/dataFaq`} className={"btn-menu " + (subMenu == 'dataFaq' ? 'active' : '')}>
                        <img src={subMenu == 'dataFaq' ? FaqFilled : Faq} alt="menu-dataFaq" width="19px" />
                        <p>{isSidebarExpand ? 'data FAQ' : null}</p>
                    </Link>
             
                </div>


            </div>
        )
    }
}

export default NavbarMenuAdmin
