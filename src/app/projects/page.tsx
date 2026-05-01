import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Prerit Oberai',
}

const projects = [
  {
    title: 'Hello Sunshine',
    description: 'AI phone calls that deliver daily check-ins to older adults.',
    href: 'https://www.hellocall.org/',
    linkLabel: 'hellocall.org',
  },
  {
    title: 'AI Sports Commentator',
    description: 'Personalized live sports commentary that adapts to the listener. Built at the Cartesia hackathon.',
    href: 'https://github.com/PreritO/cartesia_hackathon',
    linkLabel: 'github',
  },
  {
    title: 'pycronometer',
    description: 'Python client for the Chronometer API, for personal nutrition tracking.',
    href: 'https://github.com/PreritO/pycronometer',
    linkLabel: 'github',
  },
]

export default function ProjectsPage() {
  return (
    <div className="container">
      <h1 className="projects-header">Projects</h1>
      <p className="projects-intro">A selection of recent things I&apos;ve built.</p>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.href} className="project-row">
            <div className="project-head">
              <h2 className="project-title">{project.title}</h2>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                {project.linkLabel}
              </a>
            </div>
            <p className="project-description">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
