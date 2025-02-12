// This is mostly for Cypress Accessibility and UI Coverage scans
describe('Visit all pages', () => {
  it('sitemap.xml', () => {
    cy.request('https://learn.cypress.io/sitemap-0.xml').then((response) => {
      const xmlString = response.body
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml')
      const URLs = Array.from(xmlDoc.querySelectorAll('loc')).map((loc) => {
        return loc.textContent
      })
      Cypress._.each(URLs, (URL) => {
        cy.visit(URL)
        cy.contains('All rights reserved').scrollIntoView()
      })
    })
  })
})