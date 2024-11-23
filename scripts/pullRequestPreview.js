import { execSync } from 'child_process'

console.log('[DEPLOY_PREVIEW]: START')
const command = "npm run deploy:staging"
const output = execSync(command, { encoding: 'utf8' })
const outputLines = output.split('\n')
const deployUrl = outputLines[outputLines.length - 1]
console.log('[DEPLOY_PREVIEW]: END')

console.log(`Your preview is ready at: ${deployUrl}`)
