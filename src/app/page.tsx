import Image from "next/image";
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Home() {
  return (
    <div className="container">
      <div className="site-header">
        <h1 className="site-title">Hey, I'm Prerit!</h1>
        <p className="site-description">
        I live in New York and currently work as a Founding Engineer at a very early stage startup focusing on building Patient Navigation Services for the elderly. Prior to that, I was a SWE at Microsoft on the Office Security and Excel teams for 4 years and before that, I studied EECS at CU Boulder for both my undergrad and graduate degrees. I'm excited about leveraging technology to improve people's everyday lives and enjoy building high quality software that can scale quickly.
        </p>
        <p className="site-description">
          I love to learn how things work and am fascinated by how businesses scale from zero to millions. Outside of my nerdy musings, I like playing basketball, running and reading biographies. If you have any recs, please send them my way. My vision for a successful life entails doing meaningful work that brings me joy, surrounding myself with people who care for me while developing relationships that allow me to grow.  
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
        </div>
      </div>
    </div>
  );
}
