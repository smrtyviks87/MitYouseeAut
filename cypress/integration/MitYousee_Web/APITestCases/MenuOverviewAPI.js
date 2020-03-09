
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

        const arr1 = ["8AF0B4D3E3DCC1BF1ADEA62A08ABFA6F,SP01_758_36_MOBIL", "EF3C0E80F4AFD91D0B8C4D9E3D7BE435,SP13_350_17", "8ADC693ED42986F7F4C5A1C5F4B0E7B5,SP57_860_01" , "5B63FD58FC533BCEDCABABC5FC76F811,SP11_016_03_TV", "E058F479055BA56C75009012EB7563D8,SP01_757_40_MBB"]
        const arr2 = ["Mobile", "Broadband","Fixednet","Tv", "MobileBroadband"]
        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/products/menuoverview', 5, arr1, arr2)
        cy.contains('Log af').click()
        
        cy.LaunchApp(Url + "/qa/easylogin")
        cy.LoginApp('test', 'bcpp', 'api_coax', 'Test1234')
        const arr3 = ["7D9CA068BA5183D3EE1208D9ABA3141D,SP01_757_40_MBB", "7021B8E8202BBD43266B457E7559F5D6,SP14_010_09", "1AC55E5BD224BFB2A43962997FB28D3E,SP01_758_36_MOBIL", "DED23B6D420194D01CBD22214D16E99C,SP13_350_05", "8B4B22EB444655F4E2528B9E6D6867E2,SP11_016_01_TV"]
        const arr4 = ["MobileBroadband", "Fixednet", "Mobile","Broadband", "Tv"]
        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/products/menuoverview', 5, arr3, arr4)

        Cypress.currentTest.retries(2) 

    })

    Cypress.Commands.add('expectValidJsonWithMinimumLength', (url, length,Array1,Array2) => {
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

                console.log(body1)

                expect(response.status).to.eq(200)

                expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')
                
                expect(body2).to.not.be.null;

                expect(body2).to.have.lengthOf(length)

                var i=0
                // Ensure certain properties are present.
                body2.forEach(function (item) {
                    
                    expect(item).to.have.all.keys('subscriptionId', 'productType');
                    expect(item).to.have.property('subscriptionId', Array1[i])
                    expect(item).to.have.property('productType', Array2[i])
                    i=i+1
                    
                })
            })
        

    })

})