describe('UserProfile', function () {
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


        cy.expectValidJsonWithMinimumLength('https://yss-api.internal.yousee.dk/yousee/selfcare/accounts/accountsummary', 1)

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

                /*let oldresult = '{"technicalStack":"Tdc","customerRelationStatus":"IsResidentialHasSubscriptions","accounts":[{"accountNumber":510194023,"paysForAccount":true, "subscriptions": [{"accountNumber": 510194023, "subscriptionId": "8AF0B4D3E3DCC1BF1ADEA62A08ABFA6F, SP01_758_36_MOBIL", "paysForAccount": true,                    "product": { "groupId": "MOBILE", "productName": "Fri + 20 GB", "productCode": "SP01_758_36_MOBIL" }, "phoneNumber": "62630190", "address": null, "businessMarked": false, "rootLid": "62630190", "isSplitBill": true, "technology": "Unknown", "devices": [], "packageInformation": null, "isOfflineSubscription": false                }], "isYouseeAccount": false
            }, { "accountNumber": 510193912, "paysForAccount": true, "subscriptions": [{ "accountNumber": 510193912, "subscriptionId": "EF3C0E80F4AFD91D0B8C4D9E3D7BE435, SP13_350_17", "paysForAccount": true, "product": { "groupId": "BROADBAND", "productName": "Bredbnd 5 / 0, 5 Mbit", "productCode": "SP13_350_17" }, "phoneNumber": null, "address": { "street": "Borrekrattet", "streetNumber": "8", "city": "Lyngby", "zipCode": "2800", "level": null, "side": null, "houseLetter": "", "apartmentNumber": null }, "businessMarked": false, "rootLid": "EM139178", "isSplitBill": true, "technology": "Dsl", "devices": [], "packageInformation": null, "isOfflineSubscription": false }, { "accountNumber": 510193912, "subscriptionId": "8ADC693ED42986F7F4C5A1C5F4B0E7B5, SP57_860_01", "paysForAccount": true, "product": { "groupId": "FIXED", "productName": "YouSee Bredb\u00E5ndstelefoni FriTale", "productCode": "SP57_860_01" }, "phoneNumber": "45897507", "address": null, "businessMarked": false, "rootLid": "EM139178", "isSplitBill": true, "technology": "Unknown", "devices": [], "packageInformation": null, "isOfflineSubscription": false }, { "accountNumber": 510193912, "subscriptionId": "5B63FD58FC533BCEDCABABC5FC76F811, SP11_016_03_TV", "paysForAccount": true, "product": { "groupId": "TV", "productName": "Grundpakke med Tv - boks", "productCode": "SP11_016_03_TV" }, "phoneNumber": null, "address": { "street": "Borrekrattet", "streetNumber": "8", "city": "Lyngby", "zipCode": "2800", "level": null, "side": null, "houseLetter": "", "apartmentNumber": null }, "businessMarked": false, "rootLid": "EM139178", "isSplitBill": true, "technology": "Dsl", "devices": ["C6973100"], "packageInformation": null, "isOfflineSubscription": false }], "isYouseeAccount": false }, { "accountNumber": 510194552, "paysForAccount": true, "subscriptions": [{ "accountNumber": 510194552, "subscriptionId": "E058F479055BA56C75009012EB7563D8, SP01_757_40_MBB", "paysForAccount": true, "product": { "groupId": "MOBILE_BROADBAND", "productName": "YouSee Mobilt Bredb\u00E5nd 1TB", "productCode": "SP01_757_40_MBB" }, "phoneNumber": "20160035", "address": null, "businessMarked": false, "rootLid": "20160035", "isSplitBill": true, "technology": "Unknown", "devices": [], "packageInformation": null, "isOfflineSubscription": false }], "isYouseeAccount": false }]}'*/
                let result = '{"technicalStack":"Tdc","customerRelationStatus":"IsResidentialHasSubscriptions","accounts":[{"accountNumber":510194023,"paysForAccount":true,"subscriptions":[{"accountNumber":510194023,"subscriptionId":"8AF0B4D3E3DCC1BF1ADEA62A08ABFA6F,SP01_758_36_MOBIL","paysForAccount":true,"product":{"groupId":"MOBILE","productName":"Fri + 20 GB","productCode":"SP01_758_36_MOBIL"},"phoneNumber":"62630190","address":null,"businessMarked":false,"rootLid":"62630190","isSplitBill":true,"technology":"Unknown","devices":[],"packageInformation":null,"isOfflineSubscription":false}],"isYouseeAccount":false},{"accountNumber":510193912,"paysForAccount":true,"subscriptions":[{"accountNumber":510193912,"subscriptionId":"EF3C0E80F4AFD91D0B8C4D9E3D7BE435,SP13_350_17","paysForAccount":true,"product":{"groupId":"BROADBAND","productName":"Bredb\u00E5nd 5/0,5 Mbit","productCode":"SP13_350_17"},"phoneNumber":null,"address":{"street":"Borrekrattet","streetNumber":"8","city":"Lyngby","zipCode":"2800","level":null,"side":null,"houseLetter":"","apartmentNumber":null},"businessMarked":false,"rootLid":"EM139178","isSplitBill":true,"technology":"Dsl","devices":[],"packageInformation":null,"isOfflineSubscription":false},{"accountNumber":510193912,"subscriptionId":"8ADC693ED42986F7F4C5A1C5F4B0E7B5,SP57_860_01","paysForAccount":true,"product":{"groupId":"FIXED","productName":"YouSee Bredb\u00E5ndstelefoni FriTale","productCode":"SP57_860_01"},"phoneNumber":"45897507","address":null,"businessMarked":false,"rootLid":"EM139178","isSplitBill":true,"technology":"Unknown","devices":[],"packageInformation":null,"isOfflineSubscription":false},{"accountNumber":510193912,"subscriptionId":"5B63FD58FC533BCEDCABABC5FC76F811,SP11_016_03_TV","paysForAccount":true,"product":{"groupId":"TV","productName":"Grundpakke med Tv-boks","productCode":"SP11_016_03_TV"},"phoneNumber":null,"address":{"street":"Borrekrattet","streetNumber":"8","city":"Lyngby","zipCode":"2800","level":null,"side":null,"houseLetter":"","apartmentNumber":null},"businessMarked":false,"rootLid":"EM139178","isSplitBill":true,"technology":"Dsl","devices":["C6973100"],"packageInformation":null,"isOfflineSubscription":false}],"isYouseeAccount":false},{"accountNumber":510194552,"paysForAccount":true,"subscriptions":[{"accountNumber":510194552,"subscriptionId":"E058F479055BA56C75009012EB7563D8,SP01_757_40_MBB","paysForAccount":true,"product":{"groupId":"MOBILE_BROADBAND","productName":"YouSee Mobilt Bredb\u00E5nd 1TB","productCode":"SP01_757_40_MBB"},"phoneNumber":"20160035","address":null,"businessMarked":false,"rootLid":"20160035","isSplitBill":true,"technology":"Unknown","devices":[],"packageInformation":null,"isOfflineSubscription":false}],"isYouseeAccount":false}]}'
                let body1 = JSON.stringify(response.body)
                let body2 = JSON.parse(body1)
                let accounts = JSON.stringify(response.body.accounts)
                let acc = JSON.parse(accounts)
         

           

                expect(response.status).to.eq(200)

                expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')

                console.log(body1)

                expect(body2).to.not.be.null;

                expect(body2).to.have.all.keys('technicalStack', 'customerRelationStatus', 'accounts');
              
                acc.forEach(function (item) {

                    expect(item).to.have.all.keys('accountNumber', 'paysForAccount', 'subscriptions', 'isYouseeAccount');

                
                })

                
                for (var i = 0; i < 3; i++) {

                    let Subs = JSON.stringify(response.body.accounts[i].subscriptions)
                    let substn = JSON.parse(Subs)
                    //console.log(Subs)
                    //console.log(substn)

                    substn.forEach(function (item1) {

                        expect(item1).to.have.all.keys('accountNumber', 'subscriptionId', 'paysForAccount', 'product', 'phoneNumber', 'address', 'businessMarked', 'rootLid', 'isSplitBill', 'technology', 'devices', 'packageInformation', 'isOfflineSubscription');


                    })
                }


                if (result === body1) {
                    console.log('Results Matched')
                   

                } else {
                    console.log("Result did not Match")
                    assert.fail()
                }

                
                               

            })
       

    


    })
    Cypress.Commands.add('getDifference', (str1, str2) => {
        let diff = "";
        str1.split('').forEach(function(val, i) {
            if (val != str2.charAt(i))
                diff += val;
        });
        console.log(diff)
        return diff;

    })
    

})