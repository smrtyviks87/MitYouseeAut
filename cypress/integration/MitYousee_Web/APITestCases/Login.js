describe('MitYouSee', function () {
    it('Verify Login Page', function () {
        const Url = "https://selvbetjening.staging.internal.yousee.dk"

        cy.request("https://bc-residential.pp.tdc.dk/bc/internal/resetcache")
        cy.visit(Url + "/qa/easylogin")

        cy.server()
        

        cy.get('.button-container > .button').click()
        cy.percySnapshot('Login_Page')

        cy.contains("EasyLogin - YSPro/BC")
        cy.get('[name="env"]')
            .select('test')

        cy.get('[name="bc"]')
            .first().focus()
            .select('bcpp').should('have.value', 'bcpp') 
        
        
        //cy.get('[name="bc"]')


        //    .select('bcpp').invoke('val')

        cy.get('#username')
            .type("api_dsl")
        cy.get('#password')
            .type("Test1234")
        cy.get('#login-form > :nth-child(5) > .button')
            .click()

                
        cy.contains("Overblik", { timeout: 15000 })
            .should('be.visible','Overblik')
        cy.percySnapshot('Home_Page')
        cy.contains("62 63 01 90", { timeout: 10000 }).click()


    })
 

   
   
   
})