import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    MenuArticle, MenuArticleFilled, menuDashboard, menuDashboardFilled, menuForum, menuForumFilled, MenuHome, MenuHomeFilled, menuMarker, menuMarkerFilled, MenuMessage, MenuMessageFilled,
} from '../../../assets'
import './sidebar.scss'
import { isMobile } from "react-device-detect";

export class Sidebar extends Component {


    render() {

        let { isSidebarExpand, subMenu } = this.props

        return (
            <div className={isMobile ? "sidebar mobile" + (isSidebarExpand ? ' expanded' : ' unexpanded') : "sidebar" + (isSidebarExpand ? ' expanded' : ' unexpanded')}>
                <div className="content">
                    {isMobile ?
                        <div className="account-name">
                            <span className="initials">
                                <p className="font-bold font-16">UO</p>
                            </span>
                            <p className="name font-bold font-14">UVUVUEUE OSAS</p>
                        </div>
                        :
                        null
                    }
                    <Link to={`${process.env.PUBLIC_URL}/home`} className={"btn-menu " + (subMenu == 'home' ? 'active' : '')}>
                        <img src={subMenu == 'home' ? MenuHomeFilled : MenuHome} alt="menu-home" />
                        <p>{isSidebarExpand ? 'Home' : null}</p>
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/peta`} className={"btn-menu " + (subMenu == 'peta' ? 'active' : '')}>
                        <img src={subMenu == 'peta' ? menuMarkerFilled : menuMarker} alt="menu-peta" width="19px" />
                        <p>{isSidebarExpand ? 'Peta' : null}</p>
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/artikel`} className={"btn-menu " + (subMenu == 'artikel' ? 'active' : '')}>
                        <img src={subMenu == 'artikel' ? MenuArticleFilled : MenuArticle} alt="menu-artikel" />
                        <p>{isSidebarExpand ? 'Artikel' : null}</p>
                    </Link>

                    <Link to={`${process.env.PUBLIC_URL}/summarydashboard`} className={"btn-menu " + (subMenu == 'summarydashboard' ? 'active' : '')}>
                        <img src={subMenu == 'summarydashboard' ? menuDashboardFilled : menuDashboard} alt="menu-artikel" width="18px"/>
                        <p>{isSidebarExpand ? 'Dashboard' : null}</p>
                    </Link>

                    <Link to={`${process.env.PUBLIC_URL}/forum`} className={"btn-menu " + (subMenu == 'forum' ? 'active' : '')}>
                        <img src={subMenu == 'forum' ? menuForumFilled : menuForum} alt="menu-forum" width="20px"/>
                        <p>{isSidebarExpand ? 'forum' : null}</p>
                    </Link>

                   
                </div>


            </div>
        )
    }
}

export default Sidebar
