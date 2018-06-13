import React, { Component } from 'react';
import YouTube from 'react-youtube';
import {Link} from 'react-router-dom';
import './Homepage.css';


class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.mute();

    }

    onEnd(event) {
        event.target.playVideo();
    }

    render() {

        let styles = {
            color: '#fbfbfb',
            fontSize: '65px',
            fontWeight: '500',
            fontFamily: 'Circular, sans-serif',
            textShadow: '0px 1px 4px black',
            letterSpacing: '3px',
            display: 'flex',
            marginLeft: '180px',
            marginTop: '10px', 
            paddingTop: '150px'
        }

        let styles2 = {
            marginLeft: '290px',
            color: '#fff',
            fontSize: '65px',
            fontWeight: '500',
            fontFamily: 'Circular, sans-serif',
            textShadow: '0px 1px 4px black',
            letterSpacing: '3px',
            display: 'flex',
            marginTop: '10px'
        }

        let styles3 = {
            marginLeft: '450px',
            color: '#fff',
            fontSize: '65px',
            fontWeight: '500',
            fontFamily: 'Circular, sans-serif',
            textShadow: '1px 1px 4px black',
            letterSpacing: '3px',
            display: 'flex',
            marginTop: '10px'
        }

        let styles4 = {
            textShadow: '0px 1px 2px black', 
            color: '#fff'
        }

        const videoOptions = {
            width: '1380',
            height: '1170',
            playerVars: {
                autoplay: 1,
                iv_load_policy: 3,
                modestbranding: 1,
                controls: 0,
                disablekb: 1,
                rel: 0,
                showinfo: 0,
                start: 40,
                end: 160,
                loop: 1,
                vmode: 'opaque'
            }
        };

        return (
            <div>
                <div>
                    <div className='home-text'>
                        <span style={styles}>Skåpet</span>
                        <span style={styles} style={styles2}>Mountain</span>
                        <span style={styles} style={styles3}>Lodges</span>
                    </div>
                    <div>
                   <Link to='/Display'> <button className='login' style={styles4}>About</button> </Link>
                   <a href={process.env.REACT_APP_LOGIN}> <button className='login' style={styles4}>Login</button> </a>
                   {/* <Link to='/UserDashboard'> <button className='login' style={styles4}>Login</button> </Link> */}
                </div>
                </div>
                <div className='video-background'>
                    <div className='video-foreground'>
                        <YouTube
                            videoId='UqwJp6uGR1o'
                            opts={videoOptions}
                            onReady={this._onReady}
                            onEnd={this._onEnd}
                        />
                    </div>

                </div>
            </div>

        );
    }

}

export default Homepage;