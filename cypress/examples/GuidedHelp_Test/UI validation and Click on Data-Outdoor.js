/* Project: Guided Help
 * Author:_Vikrant Sarkaniya
 * Email: viks@nuuday.dk
  */

describe('GuidedHelp- UI validation and click on Data-Outdoor', function () {
    it('Verify GuidedHelp Home Page', function() {

        const homepage = "https://kundeservice.staging.internal.yousee.dk/"

        cy.visit(homepage)

        cy.get('[href="/driftsinformation"] > .teaser__header', { timeout: 10000 })
            .should('be.visible')
            .dblclick()
        cy.url({ timeout: 10000 }).should('include', '/driftsinformation')

        cy.get('.lightbox__header-text', { timeout: 10000 }).should('be.visible')

        cy.get('.lightbox__alert-link', { timeout: 10000 })
            .should('be.visible')
            .click()

        cy.url({ timeout: 10000 }).should('include', '/mobil/drift-og-daekning/daekningskort')

        cy.get('h1', { timeout: 10000 }).should('be.visible')


        cy.get('[class="button button--secondary button--with-arrow"]', { timeout: 10000 })
            .not('[disabled]')
            .should('have.attr', 'href').and('include', 'https://daekning.tdc.dk/tdcnetmap_ext_tile2')

    })

    it('Verify the MAP for Outdoor', () => {
        var Map_URL = "https://daekning.tdc.dk/tdcnetmap_ext_tile2/"
        cy.visit(Map_URL)
        cy.wait(3000)
        

        cy.get('[class= "groupHeader open"]', { timeout: 10000 })
            .should('be.visible')
            .contains('Data - Udend\u00F8rs')

        cy.get('.search-input', { timeout: 10000 })
            .type('Bavnebjergvej 1, 8600 R', { force: true })

        cy.get('[value="Bavnebjergvej 1, 8680 Ry"]', { timeout: 10000 })
            .should('be.visible')
            .click()


        cy.wait(3000)

        cy.contains('4G: Udend\u00F8rs 10 - 20 Mbit/s', { timeout: 10000 })
             .should('be.visible')

        

        cy.get('#map')
            .should('include.text', '4G: Udend\u00F8rs 10 - 20 Mbit/s', { timeout: 10000 })
            .should('have.css', 'background-color')
            .and('eq', 'rgb(244, 239, 231)')

    })
}) 