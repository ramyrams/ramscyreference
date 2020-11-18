/********************************************************************************************
* ? tick : hash : invoke : wrap
*********************************************************************************************/

//Commands to work with sessionStorage
Cypress.Commands.add('typeLogin', (user) => {
  cy.get('input[name=email]')
    .type(user.email)

  cy.get('input[name=password]')
    .type(user.password)
})

cy.typeLogin({ email: 'fake@email.com', password: 'Secret1' })


// Click link containing text
Cypress.Commands.add('clickLink', (label) => {
  cy.get('a').contains(label).click()

  cy.window()
    .its('localStorage.token')
    .should('eq', label)
})

cy.clickLink('Buy Now')


Log in command using request
Cypress.Commands.add('login', (userType, options = {}) => {
  // this is an example of skipping your UI and logging in programmatically

  // setup some basic types
  // and user properties
  const types = {
    admin: {
      name: 'Jane Lane',
      admin: true,
    },
    user: {
      name: 'Jim Bob',
      admin: false,
    }
  }

  // grab the user
  const user = types[userType]

  // create the user first in the DB
  cy.request({
    url: '/seed/users', // assuming you've exposed a seeds route
    method: 'POST',
    body: user,
  })
  .its('body')
  .then((body) => {
    // assuming the server sends back the user details
    // including a randomly generated password
    //
    // we can now login as this newly created user
    cy.request({
      url: '/login',
      method: 'POST',
      body: {
        email: body.email,
        password: body.password,
      }
    })
  })
})
// can start a chain off of cy
cy.login('admin')

// can be chained but will not receive the previous subject
cy.get('button').login('user')




// Download a file
Cypress.Commands.add('downloadFile', (url, directory, fileName) => {
  return cy.getCookies().then((cookies) => {
    return cy.task('downloadFile', {
      url,
      directory,
      cookies,
      fileName,
    })
  })
})
cy.downloadFile('https://path_to_file.pdf', 'mydownloads', 'demo.pdf')


//Commands to work with sessionStorage
Cypress.Commands.add('getSessionStorage', (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key))
})

cy.getSessionStorage('token').should('eq', 'abc123')



// Overwrite type command

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})
cy.get('#username').type('username@email.com')
cy.get('#password').type('superSecret123', { sensitive: true })



// Overwrite screenshot command
Cypress.Commands.overwrite('screenshot', (originalFn, subject, name, options) => {
  // call another command, no need to return as it is managed
  cy.get('.app')
    .should('be.visible')

    // overwrite the default timeout, because screenshot does that internally
    // otherwise the `then` is limited to the default command timeout
    .then({ timeout: Cypress.config('responseTimeout') },
      () => {
        // return the original function so that cypress waits for it
        return originalFn(subject, name, options)
      })
})

// Overwrite contains command
Cypress.Commands.overwrite('contains', (originalFn, subject, filter, text, options = {}) => {
  // determine if a filter argument was passed
  if (typeof text === 'object') {
    options = text
    text = filter
    filter = undefined
  }

  options.matchCase = false

  return originalFn(subject, filter, text, options)
})


//1. Add the following code to cypress/support/command.js :
Cypress.Commands.add("baiduSearch", (searchValue) => {
  cy.fixture('constants.json').then(constants => {
      cy.get(constants.elements.search_box).type(searchValue)
      cy.get(constants.elements.search_submit).click()
  })
})
 

Cypress.Commands.add('visitPage', (path = '', options={}) => {
  const data = {}
  return cy.then(()=>
        ['sessionStorage', 'localStorage', 'cookies'].forEach(type => {
          const file = options[type]||Cypress.config(type)
          file&&cy.readFile(file).then(json=>data[type]=json)
        })
      )
      .wrap(path).then(url => cy
      .visit(url, Object.assign({}, options, {
        onBeforeLoad: win => {
          const {sessionStorage, localStorage, document} = win
          const {sessionStorage:ss, localStorage:ls, cookies} = data
          ss&&Object.entries(ss).forEach(([key, value]) => sessionStorage.setItem(key, JSON.stringify(value)))
          ls&&Object.entries(ls).forEach(([key, value]) => localStorage.setItem(key, JSON.stringify(value)))
          cookies&&(document.cookie = Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join(';'))
          options.onBeforeLoad&&options.onBeforeLoad(win)
        }
      }))
  )
})

//----------------------------------------

Cypress.Commands.add('upload', {prevSubject: 'element'}, (subject, fileName, type) => cy
  .fixture(fileName, 'hex').then(fileHex => {
    if (typeof fileHex!=='string') throw('When uploading json rename your filetype to \'notjson\'. See Cypress issue #7412')
    const bytes = hexStringToByteArray(fileHex)
    const file = new File([bytes], fileName, {type})
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)
    subject.get(0).files = dataTransfer.files
    return subject
  })
  .trigger('change', {force:true})
)

function hexStringToByteArray(str) {
    return new Uint8Array(str.match(/.{2}|./g).map(s=>parseInt(s, 16)));
}

cy.get('input[type=file]').upload('upload.json_', 'text/json')

//----------------------------------------

const { MailSlurp } = require("mailslurp-client");

Cypress.Commands.add("createInbox", () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
  return mailslurp.waitForLatestEmail(inboxId);
});

Then in tests:

it("can sign up", () => {
  cy.createInbox((inbox) => {
    cy.get("#sign-up-email").type(inbox.emailAddress);
    // etc
  });
});

cy.waitForLatestEmail(inbox.id).then((email) => {
  console.log(email);
  // { subject: '...', body: '...' }
});
https://www.mailslurp.com/examples/cypress-js/
//----------------------------------------

//custom commands
  Cypress.Commands.add("clickRandomProduct", () => {
}


//How will we call a function written in a separate file from a Cypress test?
//Put this in your support/commands.js file:
Cypress.Commands.add('subValues', (a, b) => {
   return a - b 
});

//Put this in your support/index.js file, if it isn't already there (it should be):

import "./commands";
//Call it in your test like so:

describe ('Calling a function', function(){
  it('Call the Subtract function and asert the calculation', function(){
    cy
      .subValues(15, 8)
      .should('eq', 7) // true        
    });
});




function setup() {
    cy.wrap(app.clearDatabase()).then(() => console.log('got to 1'));
    cy.wrap(app.makeDatabase()).then(() => console.log('got to 2'));
  }
  beforeEach(() => {
    setup();
    cy.visit('/');
  });




      
  cy.get('.ajax_cart_quantity').first().invoke('text').should('equal', '1'}
    
  //Assert state of cart (if it presents correct number).
 cy.get('.continue').click().then(testCartState);
 //Reload page 
 //and assert the Cart's state (should keep previous number of 
   products).
 cy.reload().then(testCartState)


 
 cy.get('.error')					
 cy.contains('Login')				
 cy.wrap({ foo: 'bar' }).its('foo')	

 