/// <reference types="Cypress" />

class PCLandingPage {

    visit(){
        cy.log(Cypress.env('TEST'))

        cy.visit(Cypress.env('url'));
    }

    EnterUserName(value){
        const tx_Username = cy.get('#UserName')
        tx_Username.clear();
        tx_Username.type(value);
        return this;
    }

    EnterPassowrd(value){
        const tx_Password = cy.get('#Password')
        tx_Password.clear();
        tx_Password.type(value);
        return this;
    }

    Login(){
        //const bn_Logon = cy.get("input[value='Log On']");
        //bn_Logon.click()

        cy.clickButton('Log On');
    }

}

export default PCLandingPage