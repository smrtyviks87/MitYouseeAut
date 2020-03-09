describe('Voice Mail Fastnet', function () {
    it('Verify Login Page', function () {
        const Url = "https://selvbetjening.staging.internal.yousee.dk"
        cy.visit(Url + "/qa/easylogin")

        cy.server()
        cy.LoginApp('test', 'bcpp', 'test_auto1', 'Test1234')
        cy.percySnapshot('Home_Page')

        cy.SelectAccount("98 12 91 27")

        cy.contains('F\u00E5 besked via sms og/eller e-mail ved ny voicemailbesked', { timeout: 15000 }).should('be.visible')

        
        cy.contains('Rediger', { timeout: 25000 }).should('be.visible')
            .click()

        cy.getRandomNum(4).then((returned_val) => {
            var randomnum = returned_val
            cy.get('[placeholder="Mobilnummer"]', { timeout: 15000 }).should('be.visible')
                .clear()
                .type('9812' + randomnum)

        })
        

        cy.Name_Alpha_Numeric(5).then((returned_val) => {
            var randomname = returned_val
            cy.get('[placeholder="E-mail"]', { timeout: 15000 }).should('be.visible')
                .clear()
                .type(randomname + '@tdc.dk')
        })
                      
        cy.contains('Gem \u00E6ndringer').should('be.visible')
            .click()
        cy.contains('Besked ved ny voicemail er opdateret', { timeout: 15000 }).should('be.visible')

        cy.contains('Luk', { timeout: 15000 }).should('be.visible')
			.click()

    })
   
})