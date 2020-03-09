/* Project: Guided Help
 * Author:_Vikrant Sarkaniya
 * Email: viks@nuuday.dk
  */
describe('GuidedHelp - Search Phone Numbers', function () {
    it('Verify SearchPhoneNumber', function () {
        const Url = "https://kundeservice.staging.internal.yousee.dk/"

        //Visit the Kundeservice Page
        cy.visit(Url)
        cy.wait(2000)
        //verify the Kundeservice URL includes Staging domain.
        cy.url({ timeout: 10000 }).should('include', 'staging.internal.yousee.dk')
        cy.wait(2000)
        //Enter Mobile Number to Search and hit enter button
        cy.get('#searchInput', { timeout: 10000 })
            .should('be.visible')
            .type('98989898{enter}')
        cy.wait(2000)   
        //Verify the Mobile number not found message is displayed.
        cy.get('.cludo-banner > h3', { timeout: 10000 })
            .should('be.visible')
            .contains('Vi kan desv\u00E6rre ikke finde det telefonnummer du leder efter')

    })
    
})