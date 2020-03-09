describe('Invoices', function () {
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
       const Accnum = 510193912

        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/accounts/510193912/invoices?includesettled=true', 1,Accnum)

        cy.LaunchApp(Url + "/qa/easylogin")
        cy.LoginApp('test', 'bcpp', 'api_coax', 'Test1234')
       const  Accnum1 = 650626102
        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/accounts/650626102/invoices?includesettled=true', 1, Accnum1)

        Cypress.currentTest.retries(2) 
    })


    Cypress.Commands.add('expectValidJsonWithMinimumLength', (url, length,Account_num) => {
        return cy.request({
            method: 'GET',
            url: url,
            followRedirect: false,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => {


                let result = { "invoices": [{ "accountNumber": 510193912, "invoiceNumber": 1, "amountTotalInclVat": 997.0, "lastPaymentDate": "2019-12-03T00:00:00", "type": "Invoice", "status": "Overdue", "refundedAmount": 0.0, "originalAmount": 0.0, "refundDate": null }] }

                //'{"currentBillingPeriod":{"startDate":"2019-12-01T00:00:00+01:00","endDate":"2019-12-05T10:30:10.459+01:00"},"additionalUsageTotalAmount":0.0,"additionalUsages":[],"hasEuConsumption":false}'

                let body1 = JSON.stringify(response.body.invoices)
                let body2 = JSON.parse(body1)



                console.log(body1)
                console.log(body2)


                expect(response.status).to.eq(200)

                expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')

                console.log(body1)

                expect(body2).to.have.lengthOf(length)

                expect(body2).to.not.be.null;

                body2.forEach(function (item) {


                    expect(item).to.have.all.keys('accountNumber', 'invoiceNumber', 'amountTotalInclVat', 'lastPaymentDate', 'type', 'status', 'refundedAmount', 'originalAmount', 'refundDate')
                   
                    expect(item).to.have.property('accountNumber', Account_num)
                })
                                             


            })

               

    })



})