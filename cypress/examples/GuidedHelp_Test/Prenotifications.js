/* Project: Guided Help
 * Author:_Vikrant Sarkaniya
 * Email: viks@nuuday.dk
  */

describe('GUided Help - PreNotifications', function () {
    it('Verify Login Page', function() {
        const Url = "https://profil.staging.internal.yousee.dk/"
        var Username ="Help_3"
		var password ="Test1234"
        //Visit the Login page and Lign with the username and password
        cy.GuidedHelpLogin(Url, Username, password)
        // Visit Kundeservice broadband page
        cy.visit('https://kundeservice.staging.internal.yousee.dk/bredbaand')
        //Verify that the URL has bredbaand 
        cy.url({ timeout: 60000 }).should('include', '/bredbaand')
        //  Verify the Titel of the page                      
        cy.get('.notifications__message-title', { timeout: 60000 })
            .should('be.visible')
        //Verify on the Home page for the logged in user notification message is displayed
        cy.contains('Der er driftsforstyrrelser p\u00E5 din adresse Egeh\u00F8j 15', { timeout: 60000 })
            .should('be.visible')

        //Logoff the current user
        cy.get('.login-prompt__link', { timeout: 60000 })
            .should('be.visible')
            .click()

        

    })
    
})
