describe('Subscriptions Page TV', function() {
    it('Verify the subscription page TV', function() {
        const Url = "https://selvbetjening.staging.internal.yousee.dk"
        cy.visit(Url + "/qa/easylogin")

        cy.server()
        cy.LoginApp('test', 'bcpp', 'selfcare_64', 'Test1234')


        cy.get('a').each(function($el) {
            if ($el.attr('href').includes('https://selvbetjening.staging.internal.yousee.dk/tv#!/abonnement/')) {
                cy.wrap($el).should('exist');
                cy.wrap($el).click();
            }
        })

        cy.wait(3000)
        cy.get('.page-header__title', { timeout: 15000 }).should('have.text', 'Tv ')

        cy.get(':nth-child(2) > .col-12 > :nth-child(2)').should('have.text','Tv via telefonstikket (DSL)')
			
        cy.get('.subscription-header__actions > .button').should('be.visible')

        cy.get('.subscription-header__price').should('contain.text', '9 kr./md.')

        cy.get('.subscription-header__title').should('contain.text','Grundpakke')

        cy.contains('Tilk\u00F8b').should('be.visible')

        cy.get('h2[class="component-block__header-title"]').should('contains.text', 'Mine kanaler')

        cy.get('h2[class="component-block__header-title"]').should('contains.text','Indstillinger')

        
    })


})