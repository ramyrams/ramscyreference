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

import '@testing-library/cypress/add-commands'


// * Usage: Ex: cy.clickButton('Log On');
Cypress.Commands.add('clickButton', (buttonLabel) => {
    cy.get('input[type="submit"]').contains(buttonLabel).click();
})

Cypress.Commands.add('Login', function (options = {}) {
  const title = 'Paradigm Central - Solutions for Complex Medical Management'

  cy.fixture('TestData').then((testdata) => {
      cy.visit("/")
      cy.get('#UserName').clear().type(testdata.Username)
      cy.get('#Password').clear().type(testdata.Password)
      cy.clickButton('Log On');
      cy.title().should('be.equal', title)
  })
})

Cypress.Commands.add('Logout', function (options = {}) {
  cy.get("#my-account-button").click()
      
  cy.get("#my-account-drawer").contains("Logout").click()
})

// * Usage: Ex: cy.clickButton('Log On');
Cypress.Commands.add('clickButton', (buttonLabel) => {
  cy.get('input[type="submit"]').contains(buttonLabel).click();
})


Cypress.Commands.add('readCookie', (sCookies, cookieName) => {
  var arrayOfCookies = []

  sCookies = sCookies.replace("; ", ";")
  var cookies      = sCookies;
  var arrayCookies = cookies.split(';');
  arrayCookies.map(function(originalValue){
      var name  = originalValue.split('=')[0];
      var value = originalValue.split('=')[1];
      arrayOfCookies[name] = value;
  });

  return arrayOfCookies[cookieName];
})

//Upload the file 
Cypress.Commands.add('UploadFile', { prevSubject: true }, (subject, fileName, fileType = '') => {
  //get the data test file from the fixture folder
  cy.fixture(fileName,'binary').then(content => {

     //convert to blog
      const blob = Cypress.Blob.binaryStringToBlob(content, fileType)
      //input#UFile.upload: selector: "input[type=file]"]
      const el = subject[0];

      //Create the file from the blob
      const testFile = new File([blob], fileName, {type: fileType});

      //Hold the data
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);

      //Send the file
      el.files = dataTransfer.files;
      cy.wrap(subject).trigger('change', { force: true });
  });
});



// * Usage: cy.get('input[type=file]').FileUpload('test.pdf', 'application/pdf');
// * Testeed and worked in Paradigm ECL App
// * Ref: https://stackoverflow.com/questions/47074225/how-to-test-file-inputs-with-cypress

Cypress.Commands.add('FileUpload', { prevSubject: true }, (subject, fileName, fileType = '') => {
  cy.fixture(fileName,'binary').then(content => {
    return Cypress.Blob.binaryStringToBlob(content, fileType).then(blob => {
      const el = subject[0];
      const testFile = new File([blob], fileName, {type: fileType});
      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(testFile);
      el.files = dataTransfer.files;
      cy.wrap(subject).trigger('change', { force: true });
    });
  });
});


// * How to add a dual custom command in Cypress?
//cy.getLink() // no subject
//cy.get('#dialog').getLink() // with subject

Cypress.Commands.add('getLink', {
    prevSubject: 'optional'
  }, (subject) => {
    if (subject) {
     cy.get(subject).get('a').its('href');
    } else {
      cy.get('a').its('href');
    }
})  