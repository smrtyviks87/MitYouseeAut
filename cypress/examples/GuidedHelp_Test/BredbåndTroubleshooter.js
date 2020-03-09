/* Project: Guided Help
 * Author:_Vikrant Sarkaniya
 * Email: viks@nuuday.dk
  */

describe('GuidedHelp- Bredbånd Troublleshooter', function () {
    it('Verify Bredbånd Troubleshooter', function () {
        const Url = "https://kundeservice.staging.internal.yousee.dk/"
        //Visit the Kundeservice Page
        cy.visit(Url)
        //Select Broadband option for help
        cy.get(':nth-child(2) > .tiles-container__box-link > .tiles-container__box-text')
            .should('be.visible')
            .contains('Bredb\u00E5nd')
            .click()
        //Select Wifi Booster option for help
        cy.contains('WiFi Booster problemer', { timeout: 10000 })
            .should('be.visible')
            .contains('WiFi Booster problemer')
            .click()
        // Verify the URL has the correct path
        cy.url({ timeout: 10000 }).should('include', '/bredbaand/loes-problem/wifi-booster-problemer')
        //Select Wifi Booster option for help
        cy.contains('Ingen forbindelse', { timeout: 10000 })
            .should('be.visible')
            .click()
        // Verify the URL has the correct path
        cy.url({ timeout: 10000 }).should('include', '/bredbaand/loes-problem/wifi-booster-problemer/ingen-forbindelse')
        //Verify the Tjek din opsætning Headert is displayed
        cy.contains('Tjek din ops\u00E6tning', { timeout: 10000 })
            .should('be.visible')
        //wait for sometime
        cy.wait(3000)
           //Click Button Nej tag mig videre

        cy.contains('Nej tag mig videre', { timeout: 10000 })
            .should('be.visible')
            .click()
        //wait for sometime
        cy.wait(2000)
        //´Verifyt he Header Power lampen blinker hvidt
        cy.get('.slick-current > .stepguide-v2__slide-title', { timeout: 10000 })
            .should('be.visible')
            .and('include.text', 'Power-lampen blinker hvidt')
        cy.wait(2000)
        //Click Ja button
        cy.get('.stepguide-v2__troubleshoot-prompt-button--yes', { timeout: 50000 })
            .should('be.visible')
            .and('include.text', 'Ja')
            .click()
        cy.wait(2000)
        //Verify the Smiley header for feedabck is displayed
        cy.get('.smiley-feedback__header', { timeout: 10000 })
            .should('be.visible')
            .and('include.text', 'Del din mening med os')

        cy.wait(2000)
        // Click Smiley Option Perfekt
        cy.get('[data-rating="5"] > .smiley-feedback__icon-text', { timeout: 10000 })
            .should('be.visible')
            .and('include.text', 'Perfekt')
            .click()
        cy.wait(2000)
        // Type some text for feedback
        cy.get('.smiley-feedback__comment-area', { timeout: 10000 } )
            .should('be.visible')
            .type('rigtig godt tekst')

        //Click Send button
        cy.contains('Send', { timeout: 10000 })
            .and('include.text', 'Send')
            .click()
        cy.wait(2000)
        //Verify that the Message is send successfully and confirmation message is displayed
        cy.get('.smiley-feedback__success-header', { timeout: 10000 })
            .should('be.visible')
            .and('include.text', 'Tak for dit svar')
            
    
            
    })

})