/********************************************************************************************
* ? window : document : url : viewport : location : title
*********************************************************************************************/       







cy.title().contains('My App')     // Errors, 'title' does not yield DOM element



const w = Cypress.config('viewportWidth')
const h = Cypress.config('viewportHeight')
if (!features) {
  features = `width=${w}, height=${h}`
}
console.log('openWindow %s "%s"', url, features)


# How can I check URL content with cypress
const path = 'user/survey';

cy.url().then(($url) => {
    if($url.includes(path)) {
        cy.log("Yes")
    } else  {
        cy.log("No")
      }
})



# Access a new window - cypress.io

cy.visit('http://localhost:3000', {
  onBeforeLoad(win) {
    cy.stub(win, 'open')
  })
}

// Do the action in your app like cy.get('.open-window-btn').click()

cy.window().its('open').should('be.called')

In a new test, use cy.visit() to go to the url that would have opened in the new window, fill in the fields and click the buttons like you would in a Cypress test.
cy.visit('http://localhost:3000/new-window')


