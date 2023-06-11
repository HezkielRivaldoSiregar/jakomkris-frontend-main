import React, { Component } from 'react'
import './forum.scss'
import Disqus from "disqus-react";
export default class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subMenu: 'forum'
        }
    }

    componentDidMount() {
        let { subMenu } = this.state
        this.props.onSubMenu(subMenu)
    }

    render() {
        const disqusShortname = "gereja-tangguh-bencana"; 
        const disqusConfig = {
            url: "http://localhost:3000/", 
            identifier: "gereja-tangguh-bencana", 
            title: "Forum Diskusi", 
            language: "id"
        };
        return (
            <div className="forum-page content-page">
                <div className="container-page">
                    <p className="title ">Forum Diskusi Gereja Tangguh Bencana</p>


                    <Disqus.DiscussionEmbed
                        shortname={disqusShortname}
                        config={disqusConfig}
                    />
                </div>
            </div>
        )
    }
}