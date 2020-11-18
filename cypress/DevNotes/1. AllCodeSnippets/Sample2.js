 // extract a core module like this
var http = require('http);

// extract a user defined module like this
var something = require('./folder1/folder2/folder3/something.js');
 
 
 --spec "cypress/integration/VerifyEddgApplication.js"
  
  # Cypress And command examples
  https://www.taislu.com/2020-02/cy-chains-of-command/
  https://www.taislu.com/2020-02/cy-asserations/
  https://www.taislu.com/2020-02/cy-and-command-examples/
  https://www.taislu.com/2020-02/test-why-gatsby-chose-cypress/
  https://glebbahmutov.com/blog/cypress-should-callback/
  https://www.taislu.com/2020-02/cy-timeouts/
  https://docs.w3cub.com/cypress/api/commands/viewport/
  https://www.taislu.com/2020-02/cy-gatsby-e2e-test-demo/
  https://www.taislu.com/2020-02/cy-asserations/
  https://www.taislu.com/2020-02/cy-get-command-examples/
  https://www.taislu.com/2020-02/test-using-cypress/
  https://www.taislu.com/2020-02/cy-contains-command-examples/
  https://www.taislu.com/2020-02/cy-query-the-dom/
  
  # Visual Testing Using Cypress and Applitools
  
 
# Disabling Uncaught Exceptions
export function toogleUncaughtException(enabled){
    Cypress.on('uncaught:exception', (err, runnable) => {
        return enabled;
      });
}



Use testing-library/cypress-testing-library

After the installation, just import it in cypress' commands.js:

import '@testing-library/cypress/add-commands'
And in your tests

cy.findAllByText("Jackie Chan").click();
cy.findByText("Button Text").should("exist");
cy.findByText("Non-existing Button Text").should("not.exist");
cy.findByLabelText("Label text", { timeout: 7000 }).should("exist");
cy.get("form").within(() => {
  cy.findByText("Button Text").should("exist");
});
cy.get("form").then((subject) => {
  cy.findByText("Button Text", { container: subject }).should("exist");
});


https://github.com/testing-library/cypress-testing-library







    


// This is where I overwrite all of the console methods.
    ['log', 'info', 'error', 'warn', 'debug'].forEach((consoleProperty) => {
      appWindow.console[consoleProperty] = function (...args) {
	  };
	

  
  // app code
  let count = 0
  
  $('button').on('click', () => {
    $('#num').text(count += 1)
  })


  # Cypress Bundled Tools
  Mocha
  Chai
  Chai-jQuery
  Sinon.JS
  Sinon-Chai
  • Cypress._ (lodash)
• Cypress.$ (jQuery)
• Cypress.minimatch (minimatch.js)
• Cypress.moment (moment.js)
• Cypress.Blob (Blob utils)
• Cypress.Promise (Bluebird)



https://www.taislu.com/2020-02/cy-contains-command-examples/