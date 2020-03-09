describe('Invoice2', function () {
    it('Verify Login Page', function () {
        const Url = "https://selvbetjening.staging.internal.yousee.dk"
        cy.visit(Url + "/qa/easylogin")

        cy.server()
        cy.LoginApp('test', 'bcpp', 'Selfcare_64', 'Test1234')
        cy.percySnapshot('Home_Page')

        cy.visit(Url + '/regninger')

        cy.wait(3000)

        cy.get('.page-header__title').should('have.text', 'Regninger & betaling')

        cy.wait(3000)

        if (cy.get('.is-selected > .account-selector__account').should('be.visible')) {

            cy.get('.is-selected > .account-selector__account').click()

            cy.contains('204 842 256').should('be.visible')
                .click()
        } else {
            cy.contains('204 842 256').should('be.visible')
                .click()

        }

        cy.wait(15000)

        cy.contains('Betalingshistorik').should('be.visible')   

        cy.get('.VictoryContainer > [role="img"]').should('be.visible')

        cy.get('.invoice-bargraph__bar--is-selected').should('be.visible')
            .click()
        cy.wait(3000)
        cy.contains('Betalt').should('be.visible')

        cy.contains('Automatisk kortbetaling').should('be.visible')

        Cypress.currentTest.retries(2)       
    })

})