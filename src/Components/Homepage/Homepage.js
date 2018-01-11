import React from 'react';
import './Homepage.css';

const Homepage = () => {

  return (
    <div className="homepage-component">
      <div className="bg-holder">
			  <h1>WHERE STUDENTS <span className="no-wrap">ADV<img className='homepage-logo' alt="homepage-logo" src={require('./homepage-assets/logo.svg')} />CATE</span> STUDENTS</h1>
        <button className="header-button-top">
          <a href="https://tr-personal-proj.e1.loginrocket.com/">start SNAP NINJA now</a>
        </button>

        <div className="homepage-container">
          <div className="info-box">
            <img className='homepage-icon' alt="homepage-icon" src={require('./homepage-assets/handshake.svg')} />
            <h4>Encourage student-to-student mentorship</h4>
            <p>Receiving a little bit of recognition is powerful.  In Snap Ninja, students reward other students by giving each other snaps for helping them out.  Students receive weekly performance charts, providing a constant reminder of the importance of mentoring others.</p>
            <img className='homepage-graphic' alt="homepage-graphic" src={require('./homepage-assets/award-ss.svg')} />
          </div>

          <div className="info-box">
            <img className='homepage-icon' alt="homepage-icon" src={require('./homepage-assets/ribbon.svg')} />
            <h4>Reward collaboration</h4>
            <p>Rather than just walking away after working with others, Snap Ninja provides students an easy way to give helpful feedback.  Collaboration is both encouraged and rewarded, as it should be.</p>
            <img className='homepage-graphic' alt="homepage-graphic" src={require('./homepage-assets/welcome-ss.svg')} />
          </div>

          <div className="info-box">
            <img className='homepage-icon' alt="homepage-icon" src={require('./homepage-assets/mega.svg')} />
            <h4>Make shout-outs digital</h4>
            <p>Shoutouts are done the 2018 way, using easy-to-understand technology.  Thank yous are easily passed and long-term data is automatically tracked, giving students a personal record of the most important kind of achievement: Helping others succeed.</p>
            <img className='homepage-graphic' alt="homepage-graphic" src={require('./homepage-assets/notes-ss.svg')} />
          </div>

          <div className="info-box">
            <img className='homepage-icon' alt="homepage-icon" src={require('./homepage-assets/people.svg')} />
            <h4>Build intra-cohort relationships</h4>
            <p>Relationship-building is paramount.  Students are rewarded for getting to know others, without being punished for a slow day or week.  Group stats are tracked so students know they’re in it together.</p>
            <img className='homepage-graphic' alt="homepage-graphic" src={require('./homepage-assets/group-ss.svg')} />
          </div>
        </div>

        <button>
          <a href="https://tr-personal-proj.e1.loginrocket.com/">start SNAP NINJA now</a>
        </button>
      </div>
    </div>
  ); 
};

export default Homepage;