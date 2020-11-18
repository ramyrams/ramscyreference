# How can I run test files in order
```javascript
    "testFiles": [
        "GeneratePAMCredential.js",
        "SmokeTesting/*.js",
        "MoreTests/FunctionalTestingWithXHRAPI.js"
    ]
```


# Commands
```javascript
Cypress.Commands.add('login', (username, password, options = {}) => {
    cy.visit('/LaunchPad/login')
    // Fill out the login form
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()
})
/*
    We are white listing the cookie because Cypress.Cookies.preserveOnce('SESSION') 
    does not work. https://github.com/cypress-io/cypress/issues/2952

    Because we are forcing Cypress to not clear the cookies, you will have to close
    the test window after the suite is completed other wise the Vision360 apps will
    think your session is alive.
*/
Cypress.Cookies.defaults({
    whitelist: 'SESSION'
})