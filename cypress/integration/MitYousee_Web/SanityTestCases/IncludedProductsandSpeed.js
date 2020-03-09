describe('Wifi Modem Key and Channel change', function () {
    //Can be run with Test and Prod user
    it('Verify Login Page', function () {
        const Url = "https://selvbetjening.staging.internal.yousee.dk"
        
        cy.visit(Url + "/qa/easylogin")

        cy.server()
        cy.LoginApp('test', 'bcpp', 'test_wifimodem', 'Test1234')
        cy.percySnapshot('Home_Page')

        cy.get('a').each(function ($el) {
            if ($el.attr('href').includes('https://selvbetjening.staging.internal.yousee.dk/bredbaand#!/abonnement/')) {
                cy.wrap($el).should('be.visible');
                cy.wrap($el).click();
            }
        })
        cy.wait(3000)
        cy.get('.page-header__title', {timeout: 15000}).should('have.text', 'Bredb\u00E5nd ')

        cy.get(':nth-child(2) > .col-12 > :nth-child(3)').contains('Maximum hastighed:')
            .should('be.visible')

        cy.contains('Netv\u00E6rksnavn og adgangskode').should('be.visible')

        cy.get(':nth-child(1) > :nth-child(1) > .list__item > .product > .product__row > .product__buttons > .product__toggle > .button').should('be.visible')
        .click()

        cy.get(':nth-child(2) > .form > .form__body > .form__fields > :nth-child(1) > .form__field-title > h4').should('be.visible')
        cy.get(':nth-child(2) > .form__field-title > h4').should('be.visible')
        cy.get('.form > .button').should('not.be.enabled')

        cy.Name_Alpha(5).then((returned_val) => {
            var randomname = returned_val
            cy.get('#input_1', { timeout: 15000 }).should('be.visible')
                .clear()
                .type('Abcd' + randomname)
        })
        
        
        cy.get('#input_2').should('be.visible')
            .clear()
            .type('12341234')

        cy.wait(2000)

        cy.get('.form > .button').should('be.enabled')
            .click()

        cy.wait(2000)

        cy.get('.receipt__heading').should('have.text', 'Netv\u00E6rksoplysningerne er \u00E6ndret')

        cy.get('.receipt__content > .button').should('have.text', 'Luk')
            .click()
        

        cy.get(':nth-child(2) > :nth-child(1) > .list__item > .product > .product__row > .product__description > .product__title > span').should('be.visible')


        cy.get(':nth-child(2) > :nth-child(1) > .list__item > .product > .product__row > .product__buttons > .product__toggle > .button').should('be.visible')
            .click()

        cy.get('.product__details > .form > :nth-child(1) > .form__fields > .form__field-row > .form__field-title > h4').should('be.visible')

        cy.get(':nth-child(2) > .form__fields > .form__field-row > .form__field-title > h4').should('be.visible')

        cy.get(':nth-child(1) > .form__fields > .form__field-row > .form__field > .form__selectbox').should('be.visible')
                          
                    .invoke('val')
                    .then(text => {
                        const currentchannelkey = text
                        if (currentchannelkey == '3') {
                            cy.get(':nth-child(1) > .form__fields > .form__field-row > .form__field > .form__selectbox').select('1')
                        } else {
                            cy.get(':nth-child(1) > .form__fields > .form__field-row > .form__field > .form__selectbox').select('3')
                        }

                    });

        cy.get('.form > .button-container > .button').should('be.enabled')
            .click()

        cy.wait(2000)

        cy.get('.receipt__heading').should('have.text', 'Netv\u00E6rksoplysningerne er \u00E6ndret')

        cy.get('.receipt__content > .button').should('have.text', 'Luk')
            .click()
        Cypress.currentTest.retries(2)
    })

})