
describe('CustomerAffiliation', function () {
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

        const linkID_dsl ='9641-11-19-13.10.11.914972'
        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/youseemore/customeraffiliation', 1, linkID_dsl)

        cy.LaunchApp(Url + "/qa/easylogin")
        cy.LoginApp('test', 'bcpp', 'api_coax', 'Test1234')

        const linkID_coax = '8911-11-18-12.48.32.914006'
        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/youseemore/customeraffiliation', 1, linkID_coax)

        Cypress.currentTest.retries(2) 
    })

    Cypress.Commands.add('expectValidJsonWithMinimumLength', (url, length,linkid) => {
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
                                      
                expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')

                expect(body2).to.not.be.null;

                expect(body2).to.have.lengthOf(length)

                
                body2.forEach(function (item) {

                    expect(item).to.have.all.keys('linkItId', 'youseeMoreCustomer');
                    expect(item).to.have.property('linkItId', linkid)
                    expect(item).to.have.property('youseeMoreCustomer', true)
                    
                })              
                
            })


    })

})