import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  // ...
  plugins: [
    visionTool({
      // Note: These are both optional
      apiVersion: 'v2021-10-21',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    }),
  ],
})