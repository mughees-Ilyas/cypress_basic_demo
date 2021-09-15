/// <reference types="Cypress" />

describe('Search person', () => {
  before(() => {
    cy.loadList()
  })
  it("Should not search with empty field", () => {
    cy.get('[data-test="submit-button"]').click()
    cy.get('[data-test="error-message"]').contains('Required field')
  })
  it("Should return person not found", () => {
    cy.get('[data-test="search-field"]').type("José da silva")
    cy.get('[data-test="submit-button"]').click()
    cy.get('[data-test="error-message"]').contains('character not found')
    cy.get('[data-test="search-field"]').clear()
  })
  it('Should return a person', () => {
    cy.get('[data-test="search-field"]').type("Luke Skywalker")
    cy.get('[data-test="submit-button"]').click()
    cy.get('[data-test="person"]').should('be.visible')
    cy.get('[data-test="person-name"]').contains('Luke Skywalker')
  })
})
