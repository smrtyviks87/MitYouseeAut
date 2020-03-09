
describe('UserProfile', function () {
    it('Verify Login Page', function () {
        const Url = "https://selvbetjening.staging.internal.yousee.dk"
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


        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/products/hasserviceproducts', 1)

        cy.LaunchApp(Url + "/qa/easylogin")
        cy.LoginApp('test', 'bcpp', 'api_coax', 'Test1234')
			
        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/products/hasserviceproducts', 1)

        Cypress.currentTest.retries(2) 
    })

    Cypress.Commands.add('expectValidJsonWithMinimumLength', (url, length) => {
        return cy.request({
            method: 'GET',
            url: url,
            followRedirect: false,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => {


                let body1 = JSON.stringify(response.body)



                let body2 = JSON.parse(body1)

                expect(response.status).to.eq(200)


                expect(body2).to.not.be.null;

                expect(body2).to.have.all.keys('hasWebmail', 'hasYouseeMusik', 'hasTv');

                expect(body2).to.have.property('hasWebmail', false)
                expect(body2).to.have.property('hasYouseeMusik', true)
                expect(body2).to.have.property('hasTv', true)

            })


    })

})