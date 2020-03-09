/* Project: Guided Help
 * Author:_Vikrant Sarkaniya
 * Email: viks@nuuday.dk
  */

describe('GuidedHelp- Find Shop', function () {
    it('Verify SearchForum', function () {
        const Url = "https://kundeservice.staging.internal.yousee.dk/butik"

        //Visit the Kundeservice Page
        cy.visit(Url)
        cy.wait(5000)
        // click Find Shop Button
        cy.get('.shop__contact-link', { timeout: 10000 })
            .should('be.visible')
            .and('include.text', 'Find Shop')
            .click()
        
        

        cy.get('.lightbox__header-text')
            .should('be.visible')

        cy.get('.lightbox__usage-msg')
            .should('be.visible')

        cy.get('[name="search-query"]').focus().type("2670 Greve{end}", { delay: 200 })

       // cy.get('#findShopSearch', { timeout: 10000 }).focus().type('{enter}')
       // //Enter Postcode as Search Text for butik should('be.visible') .trigger('keypress', { which: 13, force: true })

       // cy.get('#findShopSearch', { timeout: 10000 }).focus().type("2670 Greve{end}", { delay: 200 })
                  
       //// cy.get('[name="search"]').type('{enter}', { force: true })      

        cy.get('div[class="tt-suggestion tt-selectable"]').should('be.be.visible')

        cy.get('strong[class="tt-highlight"]')
            .should('have.text', '2670 Greve')
            .trigger('mouseover')
            .trigger('Keypress', 'center')
          
        
     
       

    })

})