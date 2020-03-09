// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@percy/cypress';
Cypress.Commands.add('LaunchApp', (Url) => {
    cy.visit(Url)
});

Cypress.Commands.add('SelectAccount', (LID) => {
    cy.contains(LID, { timeout: 10000 }).should('be.visible')
        .click()
});

Cypress.Commands.add('LoginApp', (Env, BC, User, Passwd) => {

    //cy.get('.button-container > .button').click()
    //cy.get('.button-container > .button').then(($flash) => {
    //    if ($flash.hasClass('active')) {
    //        $flash.click()
    //        cy.wait(3000)
    //    }
    //})Ok, forstået
    cy.get('[class="button button--tertiary-alt2"]').then(($result)=>{
        if ($result.is(':visible')) {
            cy.get('[class="button button--tertiary-alt2"]').click()
            cy.wait(3000)
        }

    })
    
    
    cy.contains("EasyLogin - YSPro/BC")
    cy.percySnapshot('Login_Page')
    cy.get('[name="env"]')
        .select(Env)

    cy.get('[name="bc"]')
        .select(BC).should('have.value', BC)

    cy.get('#username')
        .type(User)

    cy.get('#password')
        .type(Passwd)

    cy.get('#login-form > :nth-child(5) > .button')
        .click()
    

    cy.contains("Overblik", { timeout: 15000 }).should('be.visible')

    cy.wait(2000)
    cy.percySnapshot('Home_Page')

});
Cypress.Commands.add('GuidedHelpLogin', (Url,Username,Passwd) => {
        
    cy.visit(Url)
    //cy.wait(2000)
    cy.contains('Log ind', { timeout: 60000 }).should('be.visible')
    
    

    //if (cy.contains('Log p\u00E5 med andet brugernavn').should('be.visible')) { cy.contains('Log p\u00E5 med andet brugernavn').click() }
    //if (cy.get('.loginbox-navpanel__options-list > li > .loginbox-navpanel__options-list-item').should('be.visible')) { cy.get('.loginbox-navpanel__options-list > li > .loginbox-navpanel__options-list-item').click()}
    
//    cy.wait(2000)
    cy.get('#user', { timeout: 60000 }).should('be.visible')
        .type(Username)
    cy.get('#password', { timeout: 60000 }).should('be.visible')
        .type(Passwd)

    cy.get('.button', { timeout: 60000 }).should('be.enabled')
        .click()
    //cy.wait(3000)
    cy.url({timeout: 60000}).should('include', 't-selvbetjening.internal.yousee.dk')
});
Cypress.Commands.add('GuidedHomePage', (Url) => {

    cy.visit(Url)
    cy.get('[href="/driftsinformation"] > .teaser__header')
        .should('be.visible')
        .dblclick()
    cy.url({ timeout: 60000 }).should('include', '/driftsinformation')

    cy.get('.lightbox__header-text', { timeout: 60000 }).should('be.visible')

    cy.get('.lightbox__alert-link', { timeout: 60000 })
        .should('be.visible')
        .click()

    cy.get('h1', { timeout: 60000 }).should('be.visible').should('be')


    cy.get('[class="button button--secondary button--with-arrow"]', { timeout: 60000 })
        .not('[disabled]')
        .should('have.attr', 'href').and('include', 'https://daekning.tdc.dk/tdcnetmap_ext_tile2')
});
Cypress.Commands.add('xpath', (path) => {
    cy.get(path)
});
Cypress.Commands.add('Name_Alpha_Numeric', (len) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
});

Cypress.Commands.add('Name_Alpha', (len) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
});
Cypress.Commands.add('getRandomNum', (length) => {
    var randomNum =
        (Math.pow(10, length).toString().slice(length - 1) +
            Math.floor((Math.random() * Math.pow(10, length)) + 1).toString()).slice(-length);
    return randomNum;
});


Cypress.Commands.add('waitforElement', ($obj, time) => {
    if ($obj.should('not.be.visible')) {
        cy.wait(1000)
    }
    
});



