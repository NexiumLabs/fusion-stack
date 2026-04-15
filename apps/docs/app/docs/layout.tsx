import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { source } from '@/lib/source'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

const WEB_URL =
  process.env.NEXT_PUBLIC_WEB_URL ?? 'https://fusion-stack.vercel.app'

const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#eef2f2',
          letterSpacing: '-0.01em',
        }}
      >
        {/* cursor blink animated via .fs-nav-cursor in globals.css */}
        <span className="fs-nav-cursor">&gt;_</span>
        <span>fusion-stack</span>
      </span>
    ),
    url: WEB_URL,
  },
  links: [
    {
      text: 'Builder',
      url: `${WEB_URL}/builder`,
      active: 'none',
    },
    {
      text: 'GitHub',
      url: 'https://github.com/NexiumLabs/fusion-stack',
      active: 'none',
    },
  ],
}

export default function DocsLayoutWrapper({
  children,
}: {
  children: ReactNode
}) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  )
}
