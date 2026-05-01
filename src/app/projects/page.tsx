import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Prerit Oberai',
}

const projects = [
  {
    title: 'Hello Sunshine',
    description: 'AI phone calls that deliver daily check-ins to older adults.',
    href: 'https://www.hellocall.org/',
  },
  {
    title: 'AI Sports Commentator',
    description: 'Personalized live sports commentary that adapts to the listener. Built at the Cartesia hackathon.',
    href: 'https://github.com/PreritO/cartesia_hackathon',
  },
  {
    title: 'pycronometer',
    description: 'Python client for the Chronometer API, for personal nutrition tracking.',
    href: 'https://github.com/PreritO/pycronometer',
  },
]

export default function ProjectsPage() {
  return (
    <div className="container">
      <h1 className="posts-header">Projects</h1>
      <p className="projects-intro">A selection of recent things I&apos;ve built.</p>
      <div className="projects-list">
        {projects.map((project) => (
          <a
            key={project.href}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item"
          >
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
