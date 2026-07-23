'use client'

import Image from 'next/image'
import { useState } from 'react'

// Client wrapper so the hero can hide itself on load error (a broken-image
// glyph is never acceptable; the layout collapses cleanly instead). Fixed
// 1.91:1 dimensions guard CLS on the LCP element.
export default function CoverImage({ src, alt = '' }: { src: string; alt?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={628}
      className="post-hero"
      priority
      onError={() => setFailed(true)}
    />
  )
}
