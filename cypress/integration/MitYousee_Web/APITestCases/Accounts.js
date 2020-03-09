describe('Accounts Information', function () {
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

		const Accnum =510193912
        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/accounts/510193912', 1, Accnum,'TdcResidentialCustomer')

        cy.LaunchApp(Url + "/qa/easylogin")
        cy.LoginApp('test', 'bcpp', 'api_coax', 'Test1234')
        const Accnum1 =650626102
        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/accounts/650626102', 1, Accnum1, 'YouseeResidentialCustomer')

        Cypress.currentTest.retries(2) 
    })


    Cypress.Commands.add('expectValidJsonWithMinimumLength', (url, length,AccountNumber,AccountSeg) => {
        return cy.request({
            method: 'GET',
            url: url,
            followRedirect: false,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => {


                let result = { "voiceUsageInformation": { "voiceLimit": 0, "voiceUsage": 0 }, "dataUsageInformation": { "dataLimit": 20971520, "dataUsage": 0 }, "euDataUsageInformation": { "dataLimit": 15728640, "dataUsage": 0 }, "xmsUsageInformation": { "xmsLimit": 0, "xmsUsage": 0 }, "internationalUsageInformation": null, "isPackage": false, "hasSharedData": false, "currentMonth": "januar", "remainingDays": 4, "isRoamingWorld": false }
                //'{"currentBillingPeriod":{"startDate":"2019-12-01T00:00:00+01:00","endDate":"2019-12-05T10:30:10.459+01:00"},"additionalUsageTotalAmount":0.0,"additionalUsages":[],"hasEuConsumption":false}'

                let body1 = JSON.stringify(response.body)
                let body2 = JSON.parse(body1)



                console.log(body1)
                console.log(body2)


                expect(response.status).to.eq(200)

                expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')

                console.log(body1)

                expect(body2).to.not.be.null;



                expect(body2).to.have.all.keys('accountNumber', 'paymentInfo', 'invoiceDelivery', 'letterDelivery', 'notificationDelivery', 'contactInformation', 'accountSegment');
                expect(body2).to.have.property('accountNumber', AccountNumber)
                expect(body2).to.have.property('accountSegment', AccountSeg)
                expect(body2.paymentInfo).to.have.property('method', 'Manual')
                expect(body2.invoiceDelivery).to.have.property('type','Email')
                expect(body2.letterDelivery).to.have.property('type', 'Paper')
                expect(body2.notificationDelivery).to.have.property('notifyViaEmail', false)
                expect(body2.contactInformation).to.have.property('email', 'maich2@tdc.dk')


            })





    })



})