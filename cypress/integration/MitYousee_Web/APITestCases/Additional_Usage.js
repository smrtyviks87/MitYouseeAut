describe('Additional Usage', function () {
    var result
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



        cy.get('#username')
            .type("api_dsl")
        cy.get('#password')
            .type("Test1234")
        cy.get('#login-form > :nth-child(5) > .button')
            .click()


        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/subscriptions/8AF0B4D3E3DCC1BF1ADEA62A08ABFA6F%2CSP01_758_36_MOBIL/usage/additional', 1)

        cy.LaunchApp(Url + "/qa/easylogin")
        cy.LoginApp('test', 'bcpp', 'api_coax', 'Test1234')

        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/subscriptions/1AC55E5BD224BFB2A43962997FB28D3E%2CSP01_758_36_MOBIL/usage/additional', 1)

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

            
                let result = { "currentBillingPeriod": { "startDate": "2020-01-01T00:00:00+01:00", "endDate": "2020-01-27T14:00:29.126+01:00" }, "additionalUsageTotalAmount": 0, "additionalUsages": [], "hasEuConsumption": false }
                    //'{"currentBillingPeriod":{"startDate":"2019-12-01T00:00:00+01:00","endDate":"2019-12-05T10:30:10.459+01:00"},"additionalUsageTotalAmount":0.0,"additionalUsages":[],"hasEuConsumption":false}'
                
                let body1 = JSON.stringify(response.body)
                let body2 = JSON.parse(body1)
                let billp = JSON.stringify(response.body.currentBillingPeriod)
                let CBP = JSON.parse(billp)




                expect(response.status).to.eq(200)

                expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')

                console.log(body1)

                expect(body2).to.not.be.null;

                expect(body2).to.have.all.keys('currentBillingPeriod', 'additionalUsageTotalAmount', 'additionalUsages', 'hasEuConsumption');

                expect(CBP).to.have.all.keys('startDate', 'endDate');

                expect(body2).to.have.property('additionalUsageTotalAmount', 0)

                expect(body2).to.have.property('hasEuConsumption', false)
                             
            })





    })
 


})