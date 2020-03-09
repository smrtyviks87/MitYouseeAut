
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

		const phoneNumberDSL='62630190'
		const subscriptionIdDSL="8AF0B4D3E3DCC1BF1ADEA62A08ABFA6F"

        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/products/8AF0B4D3E3DCC1BF1ADEA62A08ABFA6F,SP01_758_36_MOBIL/menu-details', 1,phoneNumberDSL,subscriptionIdDSL)

        cy.LaunchApp(Url + "/qa/easylogin")
        cy.LoginApp('test', 'bcpp', 'api_coax', 'Test1234')

		const phoneNumbercoax='62630191'
		const subscriptionIdcoax="1AC55E5BD224BFB2A43962997FB28D3E"
			
			
        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/products/1AC55E5BD224BFB2A43962997FB28D3E,SP01_758_36_MOBIL/menu-details', 1, phoneNumbercoax, subscriptionIdcoax)

        Cypress.currentTest.retries(2) 
    })

    Cypress.Commands.add('expectValidJsonWithMinimumLength', (url, length,phoneNumber,subscriptionId) => {
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
				
                expect(body2).to.have.all.keys('productType', 'phoneNumber', 'subscriptionId');

                expect(body2).to.have.property('productType', 'Mobile')
                expect(body2).to.have.property('phoneNumber', phoneNumber)
                expect(body2).to.have.property('subscriptionId', subscriptionId)

            })


    })

})