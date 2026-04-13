import { docs, meta } from '@/.source'
import { loader } from 'fumadocs-core/source'
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server'

export const source = loader(toFumadocsSource(docs, meta), {
  baseUrl: '/docs',
})
