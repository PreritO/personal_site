import Image from "next/image";
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Home() {
  return (
    <div className="container">
      <div className="site-header">
        <h1 className="site-title">Hey, I'm Prerit!</h1>
        <p className="site-description">
        I currently work at Microsoft on the Office Security Team as a SWE. Before that, I was on the Excel team for 3 years and prior to that, I studied EECS at CU Boulder for both my undergrad and masters. My current interests lie at the intersection of consumer tech and security.
        </p>
        <p className="site-description">
          I also love to learn how things work generally (currently reading about High-Frequency Trading) and am fascinated by how businesses scale to have millions of users. Outside of my nerdy musings, I like playing basketball, running and generally reading biographies. If you have any recs, please send them my way. My vision for a successful life entails doing meaningful work that brings you joy, surrounding yourself with people who care for you while developing relationships that allow you to grow and positivily having an impact on the world that will leave it better for future generations.
        </p>
        <div className="social-links">
          <a
            href="https://github.com/preritoberai"
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
        </div>
      </div>
    </div>
  );
}
