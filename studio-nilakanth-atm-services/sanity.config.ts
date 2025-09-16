import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Nilakanth ATM Services',

  projectId: 'id27d31g',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  deployment: {
    appId: 'aqowfteatmj1b1vg794t5mex',  // <— add this line
  },

  schema: {
    types: schemaTypes,
  },
})
