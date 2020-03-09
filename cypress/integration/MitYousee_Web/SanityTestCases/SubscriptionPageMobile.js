describe('Subscriptions Page Mobile', function() {
    it('Verify the subscription page mobile', function() {
        const Url = "https://selvbetjening.staging.internal.yousee.dk"
        cy.visit(Url + "/qa/easylogin")

        cy.server()
        cy.LoginApp('test', 'bcpp', 'selfcare_64', 'Test1234')



        cy.SelectAccount("62 60 45 64")

        

        cy.wait(3000)
        cy.get('.page-header__title', { timeout: 15000 }).should('have.text', 'Mobil')

        cy.get('.subscription-header__title', { timeout: 15000 }).should('have.text', 'Mobil 2 Timer / 2 GB')

        cy.get('.subscription-header__price', { timeout: 15000 }).should('have.text', '69 kr./md.')

        cy.get('.col-12 > :nth-child(3)').should('be.visible')

        cy.get('.component-container__title', { timeout: 15000 }).should('have.text', 'Forbrug')

        cy.get(':nth-child(1) > .consumption-info__header', { timeout: 15000 }).should('have.text', 'Inkluderet Data')

        cy.get(':nth-child(2) > .consumption-info__header', { timeout: 15000 }).should('contains.text', 'Data i 36 lande *')

        cy.get(':nth-child(3) > .consumption-info__header', { timeout: 15000 }).should('have.text', 'Tale ')

        cy.get(':nth-child(4) > .consumption-info__header', { timeout: 15000 }).should('contains.text', 'Tale fra DK til 54 lande')

        //cy.xpath('').should('be.visible')
        cy.get('[class= "consumption-info__text-amount"]').should('have.text', '1,00 GB1,00 GB2t 00m10t 00m')

              
        cy.get('.consumption-info__status-header').should('have.text','28 dage')
    })


})