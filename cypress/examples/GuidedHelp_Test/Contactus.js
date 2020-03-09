/* Project: Guided Help
 * Author:_Vikrant Sarkaniya
 * Email: viks@nuuday.dk
  */

describe('GuidedHelp- Contact us', function () {
    it('Verify SearchForum', function () {
        const Url = "https://kundeservice.staging.internal.yousee.dk/contactus"

        //Visit the Kundeservice Page
        cy.visit(Url)
       //  cy.wait(2000)
        cy.get(':nth-child(1) > .contact-us__category-title', { timeout: 60000 })
            .should('be.visible')
            .and('include.text', 'Teknisk Support')
        
        cy.get(':nth-child(1) > .button-animated-check', { timeout: 60000 })
            .should('be.visible')
            .click()

        cy.get(':nth-child(1) > .contact-us__sub-category', { timeout: 60000 })
            .should('be.visible')
            .and('include.text', 'Bredb\u00E5nd')
            .click()

       //  cy.wait(5000)

        cy.get(':nth-child(2) > .accordion-item > .accordion-item__header', { timeout: 60000 })
            .should('be.visible')
            .and('include.text', 'Ring til os')
            .click()
       //  cy.wait(2000)
        cy.get('.contact-us__option-phone-account-numbers-link', { timeout: 60000 })
            .should('be.visible')
            .and('include.text', 'Log ind for at f\u00E5 dit kontonummer', { timeout: 60000 })

        const Login_Url = "https://profil.staging.internal.yousee.dk/"
        var Username = "Help_3"
        var password = "Test1234"
        //Visit the Login page and Lign with the username and password
        cy.GuidedHelpLogin(Login_Url, Username, password)
      //   cy.wait(2000)
        cy.visit(Url)

       //  cy.wait(2000)

        cy.get(':nth-child(1) > .contact-us__category-title', { timeout: 60000 })
            .should('be.visible')
            .and('include.text', 'Teknisk Support')
       //  cy.wait(2000)
        cy.get(':nth-child(1) > .button-animated-check', { timeout: 60000 })
            .should('be.visible')
            .click()
       //  cy.wait(2000)
        cy.get(':nth-child(1) > .contact-us__sub-category', { timeout: 60000 })
            .should('be.visible')
            .and('include.text', 'Bredb\u00E5nd')
            .click()
       //  cy.wait(5000)
        cy.get(':nth-child(2) > .accordion-item > .accordion-item__header', { timeout: 60000 })
            .should('be.visible')
            .and('include.text', 'Ring til os')
            .click()
       // cy.wait(2000)
        cy.get(':nth-child(1) > .contact-us__option-phone-account-numbers-product > strong > em', { timeout: 60000 })
            .should('be.visible')
            .and('include.text', 'Bredb\u00E5nd p\u00E5 Egeh\u00F8j 15')

    })

})