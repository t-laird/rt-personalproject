import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {

  return (
    <div className="homepage-component">
      <div className="bg-holder">
			  <h1>WHERE STUDENTS <span className="no-wrap">ADV<img className='homepage-logo' alt="homepage-logo" src={require('./homepage-assets/logo.svg')} />CATE</span> STUDENTS</h1>
        <button className="header-button-top">
          <Link to='/snap-ninja/user'>start SNAP NINJA now</Link>
        </button>

        <div className="homepage-title-bar">
          <h2>You want your students to look out for each other.  <span className="title-bar-span">We can help.</span></h2>
        </div>

        <div className="banners-container">
          <div className="home-banner">
            <div className="banner-top">
              <h4>Encourage</h4>
              <h4>Mentorship</h4>
              <img className='homepage-icon' alt="homepage-icon" src={require('./homepage-assets/handshake.svg')} />
            </div>
            <div className="banner-bottom">
              <p>SNAP NINJA is a web-based classroom tool that makes recognition between students easy and fun</p>
              <p>Students reward each other for being helpful and otherwise awesome, and then receive instant performance updates, providing a constant reminder of the importance of mentoring others</p>
              <img className='banner-bottom-graphic' alt="banner-bottom-graphic" src={require('./homepage-assets/banner-bottom.svg')} />
            </div>
          </div>

          <div className="home-banner">
            <div className="banner-top">
              <h4>Develop</h4>
              <h4>Collaboration</h4>
              <img className='homepage-icon' alt="homepage-icon" src={require('./homepage-assets/ribbon.svg')} />
            </div>
            <div className="banner-bottom">
              <p>Rather than just walking away after working with others, SNAP NINJA provides students an easy way to say thanks and give feedback.  Collaboration is both encouraged and rewarded, as it should be.</p>
              <img className='banner-bottom-graphic' alt="banner-bottom-graphic" src={require('./homepage-assets/banner-bottom.svg')} />
            </div>
          </div>

          <div className="home-banner">
            <div className="banner-top">
              <h4>Recognize</h4>
              <h4>Awesomeness</h4>
              <img className='homepage-icon' alt="homepage-icon" src={require('./homepage-assets/mega.svg')} />
            </div>
            <div className="banner-bottom">
              <p>Shoutouts are done the 2018 way, using easy-to-understand technology.  Thank yous are easily passed and long-term data is automatically tracked, giving students a personal record of the most important kind of achievement: Helping others succeed.</p>
              <img className='banner-bottom-graphic' alt="banner-bottom-graphic" src={require('./homepage-assets/banner-bottom.svg')} />
            </div>
          </div>

          <div className="home-banner">
            <div className="banner-top">
              <h4>Build</h4>
              <h4>Relationships</h4>
              <img className='homepage-icon' alt="homepage-icon" src={require('./homepage-assets/people.svg')} />
            </div>
            <div className="banner-bottom">
              <p>Relationship-building is paramount.  Students are rewarded for getting to know others, without being punished for a slow day or week.  Group stats are tracked so students know they’re in it together.</p>
              <img className='banner-bottom-graphic' alt="banner-bottom-graphic" src={require('./homepage-assets/banner-bottom.svg')} />
            </div>
          </div>
        </div>

        <div className="home-bottom-container">

          <div className="bottom-section-1">
            <img className='bottom-section-1-graphic' alt="group-graphic" src={require('./homepage-assets/group-ss.svg')} />
            <div className="section-1-text">
              <h4>Build a Cohesive Classroom</h4>
              <p>Since SNAP NINJA is for teams and groups, you’ll find an entire group page dedicated to showing off group accomplishments.  Your group page includes weekly, and long-term group data, along with leaderboards and an easy-to-understand graph.</p>
              <p>Students will see how their individual success is tied to the success of everyone.</p>
            </div>
          </div>

          <div className="bottom-section-2">
            <div className="section-2-text">
              <h4>Make Shout-outs Digital</h4>
              <p>Each user will own their own page.  As teammates award them snaps, they’ll find encouraging comments and a visual record of what they have done for others.</p>
            </div>
            <img className='bottom-section-2-graphic' alt="phone-graphic" src={require('./homepage-assets/phone-ss.png')} />
          </div>

          <div className="bottom-section-3">
            <img className='slack-graphic' alt="slack-graphic" src={require('./homepage-assets/slack.svg')} />
            <div className="section-3-text">
              <h4>Use Tools You Already Know</h4>
              <p>Use your existing Github credentials for a pain free signup and login.</p>
              <p>After your initial sign in, snaps can be sent or received in-app or via Slack using slash commands.</p>
            </div>
            <img className='github-graphic' alt="github-graphic" src={require('./homepage-assets/github.svg')} />
          </div>

        </div>

        <button>
          <Link to='/snap-ninja/user'>start SNAP NINJA now</Link>
        </button>
        
      </div>
    </div>
  ); 
};

export default Homepage;