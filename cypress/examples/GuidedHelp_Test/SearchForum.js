/* Project: Guided Help
 * Author:_Vikrant Sarkaniya
 * Email: viks@nuuday.dk
  */
describe('GuidedHelp- Search Forum', function () {
    it('Verify SearchForum', function () {
        const Url = "https://kundeservice.staging.internal.yousee.dk/"

        //Visit the Kundeservice Page
        cy.visit(Url)
        cy.wait(2000)
        // type mistet mails in the search field and hit enter button
        cy.get('#searchInput', { timeout: 10000 })
            .should('be.visible')
            .type('mistet mails{enter}')
        cy.wait(3000)
        //Choose Tab Forum
        cy.get('.search-filter-container > :nth-child(2) > a', { timeout: 10000 })
            .should('be.visible')
            .click()
        cy.wait(3000)
        //verify Mistet Mails header is  displayed in the results
        cy.get(':nth-child(1) > a > h2', { timeout: 10000 })
            .should('be.visible')
            
            
    })

})