import './commands'
import './defaults'

/* global Cypress, cy, before */

before(function () {
  cy
    .visit(Cypress.env('BROWSER_URL') || 'http://localhost:8080')
    .title()
    .should('include', 'ONgDB Browser')
})

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    Cypress.runner.stop()
  }
})
