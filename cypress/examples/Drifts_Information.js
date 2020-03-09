describe('MitYouSee', function () {
    it('Verify Login Page', function () {
        const Url = "https://selvbetjening.staging.internal.yousee.dk/qa/easylogin"
        //cy.visit(Url + "/qa/easylogin")

        cy.LaunchApp(Url)
       
    })
    it('Verify Home Page', function() {
        const ENV = "test"
        const BC_instance = "bcpp"
        const Username = "SSP03"
        const Password = "Test1234"
        //cy.visit(Url + "/qa/easylogin")

        cy.LoginApp(ENV, BC_instance, Username, Password)

     })
 })