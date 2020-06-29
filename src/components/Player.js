import React , { Component } from 'react';

class Player extends Component {
    constructor() {
        super()
        this.state = {
            errors: {},
            audioIndex: 0,
            currentTime: 0,
            duration: 0,
            isPlay: false
        }
	}
    render(){
        return (         
            <div className="header-section">
                <div className="menu-right">
                    <div className="profile_details">
                        <div className="col-md-4 player">
                            <div id="jp_container_2" className="jp-audio agileits_audio" role="application" aria-label="media player" style={{background: '#45B39D'}}>
                                <div className="jp-type-playlist agileinfo_playlist" style={{background: '#45B39D'}}>
                                    <div className="audio-form">
                                        <div className="jp-controls w3_agileits_controls">
                                            <button className="jp-previous" type="button" tabIndex={0}>previous</button>
                                            <button className="jp-play" type="button" tabIndex={0}>play</button>
                                            <button className="jp-next" type="button" tabIndex={0}>next</button>
                                        </div>
                                        <div className="jp-progress agileits_w3layouts_progress">
                                            <div className="jp-seek-bar">
                                                <div className="jp-play-bar" />
                                            </div>
                                        </div>
                                        <div className="jp-volume-controls agile_volume">
                                            <button className="jp-mute" type="button" tabIndex={0}>mute</button>
                                            <button className="jp-volume-max" type="button" tabIndex={0}>max volume</button>
                                            <div className="jp-volume-bar">
                                                <div className="jp-volume-bar-value" />
                                            </div>
                                        </div>
                                        <div className="jp-time-holder w3_agile_holder">
                                            <div className="jp-current-time" role="timer" aria-label="time">12.2</div>
                                            <div className="jp-duration" role="timer" aria-label="duration">30</div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
                <div className="clearfix" />
            </div>
        );
    }
}


export default Player;