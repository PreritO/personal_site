export default function Home() {
  return (
    <div className="container fade-seq">
      <header className="home-heading">
        <h1 className="site-title">Prerit Oberai</h1>
        <a
          href="https://www.prototyping.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="home-heading-link"
        >
          Prototyping.io
        </a>
      </header>
      <div className="home-bio">
        <p className="site-description site-opener">
          I&apos;m building <a href="https://www.prototyping.io/" target="_blank" rel="noopener noreferrer">Prototyping.io</a> (YC P26) — an AI-driven manufacturing platform that analyzes CAD designs for manufacturability and automates production workflows, so engineers get high-quality parts faster and at lower cost.
        </p>
        <p className="site-description">
          Before this, I was a Founding Engineer at an early-stage startup building patient navigation services for the elderly, and spent a few years at Microsoft on the Excel and Office Security teams. Earlier still: a PhD start at UIUC in network and storage systems (left after a year and a half), and undergrad + masters in EECS at CU Boulder. What ties it together is curiosity — I like hard problems in whatever domain I land in.
        </p>
        <p className="site-description">
          Outside of work I&apos;m fascinated by how businesses scale, play basketball, run, and read a lot of biographies — always taking recs. If you want to talk hardware, manufacturing, security, or books, my inbox is open, or <a href="https://calendly.com/prerit-oberai/30min" target="_blank" rel="noopener noreferrer">grab time on my calendar</a>.
        </p>
      </div>
      <div className="social-links">
        <a href="mailto:preritoberai@gmail.com" className="social-link">Email</a>
        <a href="https://github.com/PreritO" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
        <a href="https://linkedin.com/in/preritoberai" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
        <a href="https://calendly.com/prerit-oberai/30min" target="_blank" rel="noopener noreferrer" className="social-link">Calendar</a>
      </div>
    </div>
  );
}
