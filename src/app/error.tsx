'use client'

// Fires when a content fetch throws on an uncached request (e.g. Notion is
// down). Distinct from the 404: an outage must never masquerade as "gone".
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container">
      <h1 className="posts-header">Something went wrong</h1>
      <p className="page-intro">
        Couldn&apos;t load this page right now — likely a hiccup fetching content.
        It&apos;s not you.{' '}
        <button onClick={reset} className="error-retry">Try again</button>
      </p>
    </div>
  )
}
