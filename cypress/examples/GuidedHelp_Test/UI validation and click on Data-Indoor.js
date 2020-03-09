/* Project: Guided Help
 * Author:_Vikrant Sarkaniya
 * Email: viks@nuuday.dk
  */

describe('GuidedHelp- UI validation and click on Data-Indoor', function () {
    it('Verify GuidedHelp Home Page', function() {
       
        const homepage = "https://kundeservice.staging.internal.yousee.dk/"
            
        cy.visit(homepage)

        cy.get('[href="/driftsinformation"] > .teaser__header')
            .should('be.visible')
            .dblclick()
        cy.url({ timeout: 10000 }).should('include', '/driftsinformation')

        cy.get('.lightbox__header-text').should('be.visible')

        cy.get('.lightbox__alert-link', { timeout: 10000 })
            .should('be.visible')
            .click()

        cy.get('h1', { timeout: 10000 }).should('be.visible')


        cy.get('[class="button button--secondary button--with-arrow"]', { timeout: 10000 })
            .not('[disabled]')
            .should('have.attr', 'href').and('include', 'https://daekning.tdc.dk/tdcnetmap_ext_tile2')
		
    })
   
    it('Verify the MAP for Indoor', () => {
        var Map_URL = "https://daekning.tdc.dk/tdcnetmap_ext_tile2/"
        cy.visit(Map_URL)
        cy.wait(3000)
        

        cy.get('.search-input', { timeout: 10000 })
            .type('Bavnebjergvej 1, 8600 R', { force: true })
        cy.wait(3000)
        cy.get('[value="Bavnebjergvej 1, 8680 Ry"]', { timeout: 10000 })
            .should('be.visible')
            .click()

                   
        cy.wait(2000)
      
        cy.get(':nth-child(2) > .groupHeader', { timeout: 10000 })
            .should('include.text', 'Data - Indend\u00F8rs')
			.click()
        

        cy.wait(3000)
        

        	
        cy.get('#map', { timeout: 10000 })
            .should('include.text','4G: Indend\u00F8rs 10 - 20 Mbit/s')
            .should('have.css', 'background-color')
			.and('eq', 'rgb(244, 239, 231)')

    })
}) 