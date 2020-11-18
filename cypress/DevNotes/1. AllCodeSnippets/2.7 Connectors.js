/********************************************************************************************
* ? each : its : invoke : spread : then : end
*********************************************************************************************/





# How to get the text input field value to a const and log that value in Cypress.io
cy.get('input[name="email"]')
  .invoke('val')
  .then(sometext => cy.log(sometext));