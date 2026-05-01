import Image from "next/image";
import { Github, Linkedin, Mail, Calendar } from 'lucide-react'

export default function Home() {
  return (
    <div className="container">
      <div className="site-header">
        <h1 className="site-title">Hey, I&apos;m Prerit!</h1>
        <p className="site-description">
          I&apos;m building <a href="https://www.prototyping.io/" target="_blank" rel="noopener noreferrer" className="underline">Prototyping.io</a> (YC P26), an AI-driven manufacturing platform for mechanical parts. We analyze CAD designs for manufacturability and automate production workflows so engineers can get high-quality parts faster and at lower cost.
        </p>
        <p className="site-description">
          Before this, I was a Founding Engineer at an early-stage startup building Patient Navigation Services for the elderly, and before that spent a few years at Microsoft on the Excel and Office Security teams. Earlier, I started a PhD at UIUC focused on network and storage systems (left after a year and a half) and did my undergrad and masters in EECS at CU Boulder. What ties it together is curiosity: I like working on hard problems across whatever domain I land in.
        </p>
        <p className="site-description">
          Outside of work, I&apos;m fascinated by how businesses scale to millions of users, play basketball, run, and read a lot of biographies — always taking recs. If you want to chat about hardware, manufacturing, security, or book recommendations, my inbox is open and feel free to <a href="https://calendly.com/prerit-oberai/30min" target="_blank" rel="noopener noreferrer" className="underline">schedule some time on my calendar</a>.
        </p>
        <div className="social-links">
          <a
            href="https://github.com/PreritO"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Github className="social-icon" />
          </a>
          <a
            href="https://linkedin.com/in/preritoberai"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Linkedin className="social-icon" />
          </a>
          <a
            href="mailto:preritoberai@gmail.com"
            className="social-link"
          >
            <Mail className="social-icon" />
          </a>
          <a
            href="https://calendly.com/prerit-oberai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Calendar className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
