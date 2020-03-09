/* Project: Guided Help
 * Author:_Vikrant Sarkaniya
 * Email: viks@nuuday.dk
  */

describe('GUided Help - Mobile Double Menu', function () {
    it('Verify Login Page', function () {
        const Url = "https://kundeservice.staging.internal.yousee.dk/mobil"
       

        //Visit the Kundeservice Page
        cy.visit(Url)
        //Verify the URL of the page has mobile extension
        cy.url({ timeout: 10000 }).should('include', '/mobil')
        //Verify the Drift and Dækning link is visible and choose it
        cy.contains('Drift & D\u00E6kning', { timeout: 10000 })
            .should('be.visible')
            .and('include.text', 'Drift & D\u00E6kning')
            .click()
        // //Verify the Drift and Dækning button is visible and choose it
        cy.contains('L\u00F8s problemer med simkortet', { timeout: 10000 } )
            .should('be.visible')
            .and('include.text', 'L\u00F8s problemer med simkortet')
            .click()
        //Verify the URL of the page has mobile extension plus drift dæknening with simkort
        cy.url({ timeout: 10000 }).should('include', '/mobil/drift-og-daekning/simkort')
        //Choose Tyverispær simkortet
        cy.contains('Tyverisp\u00E6r simkortet', { timeout: 10000 })
            .should('be.visible')
            .and('include.text', 'Tyverisp\u00E6r simkortet')
            .click()
        // Verify Sådan tyverispærrer du simkortet header is displayed
        cy.get('.article-card__sheet > .card-title', { timeout: 10000 })
            .should('be.visible')
            .and('include.text', 'S\u00E5dan tyverisp\u00E6rrer du simkortet')
            
     })

})