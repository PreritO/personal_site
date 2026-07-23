import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container">
      <h1 className="posts-header">Not found</h1>
      <p className="projects-intro">
        This page doesn&apos;t exist — it may have moved or never been written.{' '}
        <Link href="/">Head home</Link> or browse the <Link href="/writing">writing</Link>.
      </p>
    </div>
  )
}
