
describe('MenuOverviewAPI', function () {
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

        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/tv/5B63FD58FC533BCEDCABABC5FC76F811%2CSP11_016_03_TV/channels-and-packages', 1, 'SP11_016_03_TV', 'Grundpakke med Tv-boks + Bland Selv 10')

        cy.LaunchApp(Url + "/qa/easylogin")
        cy.LoginApp('test', 'bcpp', 'api_coax', 'Test1234')

        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/tv/8B4B22EB444655F4E2528B9E6D6867E2%2CSP11_016_01_TV/channels-and-packages', 1, 'SP11_016_01_TV', 'Grundpakke med Tv-boks')

        Cypress.currentTest.retries(2) 

    })

    Cypress.Commands.add('expectValidJsonWithMinimumLength', (url, length, Productcode,Productname) => {
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

                let chnl = JSON.stringify(response.body.channels)

                let channels = JSON.parse(chnl)
                let body2 = JSON.parse(body1)

                expect(response.status).to.eq(200)


                expect(body2).to.not.be.null;

                expect(body2).to.have.all.keys('productCode', 'productName', 'channels', 'blandSelvPoints');

                expect(body2).to.have.property('productCode', Productcode)
                
                expect(body2).to.have.property('productName', Productname)
                var i=0
                channels.forEach(function (item) {

                    expect(item).to.have.all.keys('productCode', 'productName', 'cmsRef');
                    i=i+1

                })
                console.log(i)
            })


    })

})

