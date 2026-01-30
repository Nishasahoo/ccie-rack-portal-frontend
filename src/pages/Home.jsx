import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/home.css";




export default function Home() {
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState(0);

// const tracks = [
//   { name: "EI",            version: "v1.1", icon: "🌐", to: "/scheduler-gate/cisco/ei" },
//   { name: "Security",      version: "v6.1", icon: "🔒", to: "/scheduler-gate/cisco/security" },
//   { name: "Collaboration", version: "v3.1", icon: "📞", to: "/scheduler-gate/cisco/collaboration" },
//   { name: "Wireless",      version: "v3.0", icon: "📡", to: "/scheduler-gate/cisco/wireless" },
//   { name: "Data Center",   version: "v3.1", icon: "💾", to: "/scheduler-gate/cisco/datacenter" },
//   { name: "Service Provider", version: "v5.1", icon: "🔗", to: "/scheduler-gate/cisco/sp" },
//   { name: "Fortinet NSE 8", version: "v8", icon: "🟥", to: "/scheduler-gate/fortinet/fcx" },
// ];



const tracks = [
  { name: "EI", version: "v1.1", icon: "🌐", to: "/ei-scheduler" },
  { name: "Security", version: "v6.1", icon: "🔒", to: "/security-scheduler" },
  { name: "Wireless", version: "v3.0", icon: "📡", to: "/wireless-scheduler" },
  { name: "Data Center", version: "v3.1", icon: "💾", to: "/datacenter-scheduler" },
  { name: "Fortinet NSE 8", version: "v8", icon: "🟥", to: "/fcx-scheduler" },
];



  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="heroGradient">
          <div className="orb orb1"></div>
          <div className="orb orb2"></div>
          <div className="orb orb3"></div>
        </div>
        
        <div className="heroContainer">
          <div className="heroContent">
            <div className="heroTag">
              <span className="tagDot"></span>
              <span>World's First CCIE Rack Release</span>
            </div>
            
            <h1 className="heroTitle">
              Master Your <span className="titleGradient">CCIE</span>
              <br />
              Certification With<br />
              Real Lab Equipment
            </h1>
            
            <p className="heroDescription">
              Experience hands-on practice with authentic Cisco hardware. 
              Our enterprise-grade lab rentals provide 24/7 access to the 
              exact equipment you'll face in your CCIE exam.
            </p>
            
            {/* <div className="heroFeatures">
              <div className="featurePill">
                <span className="pillIcon">✓</span>
                Zero Downtime Guarantee
              </div>
              <div className="featurePill">
                <span className="pillIcon">✓</span>
                Latest Equipment v3.1
              </div>
              <div className="featurePill">
                <span className="pillIcon">✓</span>
                100+ Active Racks
              </div>
            </div> */}
            
            <div className="heroActions">
              <button className="btnPrimary" onClick={() => window.location.href='/contact'}>
                Start Your Journey
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="btnSecondary" onClick={() => window.location.href='/about'}>
                Learn More
              </button>
            </div>
          </div>
          
          <div className="heroVisual">
            <div className="visualCard">
              <div className="cardGlow"></div>
              <img src="/assets/hero-person.png" alt="CCIE Expert" className="heroImg" />
              <div className="floatingBadge badge1">
                <div className="badgeIcon">📊</div>
                <div className="badgeContent">
                  <div className="badgeLabel">Success Rate</div>
                  <div className="badgeValue">98%</div>
                </div>
              </div>
              <div className="floatingBadge badge2">
                <div className="badgeIcon">⚡</div>
                <div className="badgeContent">
                  <div className="badgeLabel">Response Time</div>
                  <div className="badgeValue">&lt;2min</div>
                </div>
              </div>
              <div className="callCard">
                <div className="callIcon">📞</div>
                <div className="callContent">
                  <div className="callLabel">24/7 Support</div>
                  <div className="callNumber">+91-7777 078003</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="heroWave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* TRACKS SECTION */}
      <section className="tracksSection">
        <div className="container">
          <div className="sectionHeader">
            <span className="sectionTag">Available Tracks</span>
            <h2 className="sectionTitle">Choose Your CCIE Path</h2>
            <p className="sectionDesc">All tracks available with latest exam versions</p>
          </div>
          
    {/* <div className="tracksGrid">
         {tracks.map((track, idx) => {
          const Card = (
        <>
        <div className="trackIcon">{track.icon}</div>
        <h3 className="trackName">{track.name}</h3>
        <p className="trackVersion">{track.version}</p>
        <div className="trackStatus">
          <span className="statusDot"></span>
          {track.disabled ? "Coming Soon" : "Available Now"}
        </div>
      </>
      );

     if (track.to && !track.disabled) {
      return (
        <Link key={idx} to={track.to} className="trackCard trackCardLink">
          {Card}
        </Link>
      );
    }

    return (
      <div key={idx} className="trackCard trackCardDisabled">
        {Card}
      </div>
    );
  })}
</div> */}
<div className="tracksGrid">
  {tracks.map((track, idx) => (
    <div key={idx} className="trackCard">
      <div className="trackIcon">{track.icon}</div>
      <h3 className="trackName">{track.name}</h3>
      <p className="trackVersion">{track.version}</p>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* STATS BAR */}
      <section className="statsBar">
        <div className="container">
          <div className="statsGrid">
            <div className="statItem">
              <div className="statNumber">2000+</div>
              <div className="statLabel">Students Certified</div>
            </div>
            <div className="statDivider"></div>
            <div className="statItem">
              <div className="statNumber">100+</div>
              <div className="statLabel">Active Lab Racks</div>
            </div>
            <div className="statDivider"></div>
            <div className="statItem">
              <div className="statNumber">24/7</div>
              <div className="statLabel">Support Available</div>
            </div>
            <div className="statDivider"></div>
            <div className="statItem">
              <div className="statNumber">98%</div>
              <div className="statLabel">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="aboutSection">
        <div className="container">
          <div className="aboutGrid">
            <div className="aboutImage">
              <div className="imageWrapper">
                <div className="imageBg"></div>
              
            <img src="/assets/about-image.jpg" alt="About" />
                <div className="imageOverlay">
                  <div className="overlayCard">
                    <div className="overlayIcon">🏆</div>
                    <div className="overlayText">Industry Leading</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="aboutContent">
              <span className="sectionTag">Who We Are</span>
              <h2 className="sectionTitle">Your Trusted Partner for CCIE Success</h2>
              <p className="aboutText">
                At CCIE Rack Rentals, we're revolutionizing how candidates prepare for their CCIE certification. 
                With state-of-the-art equipment and unparalleled support, we provide the most realistic lab 
                experience available.
              </p>
              
              <div className="aboutPoints">
                <div className="aboutPoint">
                  <div className="pointIcon">✓</div>
                  <div className="pointContent">
                    <h4>Real Cisco Hardware</h4>
                    <p>Practice on actual equipment used in enterprise networks</p>
                  </div>
                </div>
                <div className="aboutPoint">
                  <div className="pointIcon">✓</div>
                  <div className="pointContent">
                    <h4>Flexible Scheduling</h4>
                    <p>Book racks anytime, from anywhere, 24/7 availability</p>
                  </div>
                </div>
                <div className="aboutPoint">
                  <div className="pointIcon">✓</div>
                  <div className="pointContent">
                    <h4>Expert Support</h4>
                    <p>Get help from certified CCIE professionals</p>
                  </div>
                </div>
              </div>
              
              <button className="btnOutline" onClick={() => window.location.href='/about'}>
                Discover More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT SHOWCASE */}
      <section className="equipmentSection">
        <div className="container">
          <div className="equipmentGrid">
            <div className="equipmentContent">
              <span className="sectionTag light">Our Infrastructure</span>
              <h2 className="sectionTitle light">Enterprise-Grade Lab Equipment</h2>
              <p className="equipmentDesc">
                Our data center houses the latest Cisco hardware, maintained to the highest standards. 
                Every rack is configured to mirror real-world CCIE exam scenarios.
              </p>
              
              <div className="equipmentFeatures">
                <div className="equipFeature">
                  <div className="equipIcon">🔧</div>
                  <div className="equipText">
                    <h4>Latest Hardware</h4>
                    <p>Routers, switches, and security appliances</p>
                  </div>
                </div>
                <div className="equipFeature">
                  <div className="equipIcon">🌡️</div>
                  <div className="equipText">
                    <h4>Climate Controlled</h4>
                    <p>Optimal conditions for equipment reliability</p>
                  </div>
                </div>
                <div className="equipFeature">
                  <div className="equipIcon">🔋</div>
                  <div className="equipText">
                    <h4>Redundant Power</h4>
                    <p>Dual power supply with UPS backup</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="equipmentVisual">
              <div className="equipmentCard">
                <img src="/assets/equipment.png" alt="Equipment" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="processSection">
        <div className="container">
          <div className="sectionHeader">
            <span className="sectionTag">Simple Process</span>
            <h2 className="sectionTitle">Get Started in 3 Easy Steps</h2>
          </div>
          
          <div className="processSteps">
            <div className="processLine"></div>
            <div className="stepItem">
              <div className="stepNumber">1</div>
              <div className="stepContent">
                <div className="stepIcon">🎯</div>
                <h3>Select Your Track</h3>
                <p>Choose from R&S, Security, Collaboration, Wireless, Data Center, or Service Provider</p>
              </div>
            </div>
            <div className="stepItem">
              <div className="stepNumber">2</div>
              <div className="stepContent">
                <div className="stepIcon">📅</div>
                <h3>Book Your Slots</h3>
                <p>Pick your preferred time slots based on your schedule and exam date</p>
              </div>
            </div>
            <div className="stepItem">
              <div className="stepNumber">3</div>
              <div className="stepContent">
                <div className="stepIcon">🚀</div>
                <h3>Start Practicing</h3>
                <p>Access your rack immediately and begin your hands-on lab practice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="benefitsSection">
        <div className="container">
          <div className="benefitsGrid">
            <div className="benefitCard">
              <div className="benefitIconWrapper">
                <div className="benefitIcon">🌍</div>
              </div>
              <h3>Global Access</h3>
              <p>Connect from anywhere in the world with our secure remote access technology</p>
            </div>
            <div className="benefitCard">
              <div className="benefitIconWrapper">
                <div className="benefitIcon">⚡</div>
              </div>
              <h3>Instant Provisioning</h3>
              <p>Your lab environment is ready within minutes of booking</p>
            </div>
            <div className="benefitCard">
              <div className="benefitIconWrapper">
                <div className="benefitIcon">🔒</div>
              </div>
              <h3>Secure Infrastructure</h3>
              <p>Bank-level security with isolated environments for each user</p>
            </div>
            <div className="benefitCard">
              <div className="benefitIconWrapper">
                <div className="benefitIcon">💰</div>
              </div>
              <h3>Flexible Pricing</h3>
              <p>Pay only for what you use with our transparent pricing model</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonialsSection">
        <div className="container">
          <div className="sectionHeader">
            <span className="sectionTag">Success Stories</span>
            <h2 className="sectionTitle">What Our Students Say</h2>
          </div>
          
          <div className="testimonialsGrid">
            <div className="testimonialCard">
              <div className="testimonialStars">★★★★★</div>
              <p className="testimonialText">
                "The lab equipment quality is outstanding. I passed my CCIE R&S exam on the first 
                attempt thanks to the realistic practice environment. Highly recommended!"
              </p>
              <div className="testimonialAuthor">
                <div className="authorAvatar">
                  <img src="/assets/avatar1.png" alt="John" />
                </div>
                <div className="authorInfo">
                  <h4>John Anderson</h4>
                  <p>CCIE R&S #54321</p>
                </div>
              </div>
            </div>
            
            <div className="testimonialCard featured">
              <div className="featuredBadge">Top Review</div>
              <div className="testimonialStars">★★★★★</div>
              <p className="testimonialText">
                "Exceptional service and support. The 24/7 availability meant I could practice 
                according to my schedule. The equipment is always up-to-date and reliable."
              </p>
              <div className="testimonialAuthor">
                <div className="authorAvatar">
                  <img src="/assets/avatar2.png" alt="Sarah" />
                </div>
                <div className="authorInfo">
                  <h4>Sarah Chen</h4>
                  <p>CCIE Security #65432</p>
                </div>
              </div>
            </div>
            
            <div className="testimonialCard">
              <div className="testimonialStars">★★★★★</div>
              <p className="testimonialText">
                "Best investment for my CCIE preparation. The real hardware experience made all 
                the difference. Customer support is incredibly responsive and helpful."
              </p>
              <div className="testimonialAuthor">
                <div className="authorAvatar">
                  <img src="/assets/avatar3.png" alt="Michael" />
                </div>
                <div className="authorInfo">
                  <h4>Michael Park</h4>
                  <p>CCIE Collaboration #76543</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="ctaSection">
        <div className="container">
          <div className="ctaCard">
            <div className="ctaContent">
              <h2>Ready to Ace Your CCIE Exam?</h2>
              <p>Join thousands of successful candidates who trusted us with their preparation</p>
              <button className="btnPrimary large" onClick={() => window.location.href='/contact'}>
                Book Your First Session
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="ctaVisual">
              <div className="ctaCircle circle1"></div>
              <div className="ctaCircle circle2"></div>
              <div className="ctaCircle circle3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
    
    </div>
  );
}