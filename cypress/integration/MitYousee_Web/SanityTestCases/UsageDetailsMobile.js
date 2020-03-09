describe('Usage Details for Mobile', function () {
    it('Verify Login Page', function () {
        const Url = "https://selvbetjening.staging.internal.yousee.dk"
        cy.visit(Url + "/qa/easylogin")

        cy.server()
        cy.LoginApp('test', 'bcpp', 'test_auto2', 'Test1234')
        cy.percySnapshot('Home_Page')

        cy.SelectAccount("62 62 71 43")

       
        
    })


})