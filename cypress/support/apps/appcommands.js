
Cypress.Commands.add('Login',  (usr, pwd) =>  {
    cy.fixture('PageRepo.json').then((repo) => {
        cy.visit("/")
        cy.get(repo.landing.elements.txt_Username).clear().type(usr)
        cy.get(repo.landing.elements.txt_Password).clear().type(pwd, {log: false})
        cy.clickButton(repo.landing.elements.btn_LogOn);
        cy.title().should('be.equal', repo.landing.txt.page_Title)
    })
})


Cypress.Commands.add('Logout', function (options = {}) {
    cy.get('#my-account-button > a').click()
    cy.contains("Logout").click()

})

