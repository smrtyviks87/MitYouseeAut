describe('Show Benefits', function () {
    it('Verify Login Page', function () {
        const Url = "https://selvbetjening.staging.internal.yousee.dk"
        cy.visit(Url + "/qa/easylogin")

        cy.server()
        cy.LoginApp('test','bcpp','ysmauto','Test1234')

    
        cy.get('[data-type="youseemore"]').should('be.visible')
            .click()
        cy.contains('B\u00F8rns Vilk\u00E5r').should('be.visible')
        
        cy.contains('E-b\u00F8ger og lydb\u00F8ger').should('be.visible')
        
        cy.contains('Film og serier').should('be.visible')
        cy.contains('Dobbelt Mobildata').should('be.visible')
        cy.contains('Sjov til b\u00F8rn').should('be.visible')
        cy.contains('Magasiner og ugeblade').should('be.visible')
        cy.contains('Premierefilm').should('be.visible')
    })
    

})