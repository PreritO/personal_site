import Image from "next/image";
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Home() {
  return (
    <div className="container">
      <div className="site-header">
        <h1 className="site-title">Hey, I'm Prerit!</h1>
        <p className="site-description">
        I live in New York and I currently work at Microsoft on the Office Security Team as a SWE. Before that, I was on the Excel team for 3 years (in Seattle) and prior to that, I studied EECS at CU Boulder for both my undergrad and masters. I'm excited about the potential of technology to improve people's lives and enjoy building high quality software that can scale quickly.
        </p>
        <p className="site-description">
          I love to learn how things work generally and am fascinated by how businesses scale to millions. Outside of my nerdy musings, I like playing basketball, running and generally reading biographies. If you have any recs, please send them my way. My vision for a successful life entails doing meaningful work that brings me joy, surrounding myself with people who care for me while developing relationships that allow me to grow.  
        </p>
         <p className="site-description">
          I'm interested in connecting with people who also enjoy: <br />
          - Software development and engineering best practices <br />
          - Entrepreneurship<br />
          - Fitness & Sports<br />
          - Reading and sharing book recommendations <br />
          - Tools for Thoughts and creating a 2nd Brain <br />
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
