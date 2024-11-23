// ==========*****VERCEL*****==========
import { execSync } from 'child_process'

console.log('[DEPLOY_PREVIEW]: START')
const command = "npm run deploy:staging"
const output = execSync(command, { encoding: 'utf8' })
const outputLines = output.split('\n')
const DEPLOY_URL = outputLines[outputLines.length - 1]
console.log('[DEPLOY_PREVIEW]: END')

console.log(`Your preview is ready at: ${DEPLOY_URL}`)

// ==========*****GITHUB*****==========
console.log('[GITHUB_COMMENT]: START')

const { GITHUB_TOKEN, GITHUB_REPOSITORY, PULL_REQUEST_NUMBER } = process.env
const GH_COMMENT = `
- Deploy URL: [${DEPLOY_URL}](${DEPLOY_URL})
`
const defaultHeaders = {}
defaultHeaders['authorization'] = `token ${GITHUB_TOKEN}`
defaultHeaders['accept'] = 'application/vnd.github.v3+json, application/vnd.github.antiope-preview+json'
defaultHeaders['content-type'] = 'application/json'

fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${PULL_REQUEST_NUMBER}/comments`, {
  headers: defaultHeaders,
  method: 'POST',
  body: JSON.stringify({
    body: GH_COMMENT,
  }),
}).then((response) => {
  if (response.ok) return response.json()

  throw new Error(response.statusText)
}).catch((error) => {
  console.log('[GITHUB_COMMENT]: ERROR')

  throw new Error(error)
}).finally(() => {
  console.log('[GITHUB_COMMENT]: END')
})
