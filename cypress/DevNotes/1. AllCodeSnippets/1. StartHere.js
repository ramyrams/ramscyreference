/// <reference types="Cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />

/**
* ? Should this methis be expore in the public API
* ! Deprecated methos, do not do this
* * Important informtion is highlighted
* TODO: Any to do activieis
* @Param this is about parameter 
*/


import PCLandingPage from '../PageObjects/PCLandingPage'

describe("EDDG Test Suite", function(){

     //Use the cy.fixture() method to pull data from fixture file
    before('Run this before running the test suite', function () {
        cy.fixture('appconfig.json').as('AppConfig').then(function (data) {
        this.data = data;
        })
    })

    after('some description', function() {
        // Steps which need to be executed after all tests finished execution
    });

    beforeEach('some description', function() {
        // Steps which need to be executed before each test case
    });

    afterEach('some description', function() {
        // Steps which need to be executed after each of the tests which finished execution
    });

    it.only(function() {
      // runs once after all tests in the block
      // All code under it() does not execute except for code under it()
    })
   
    it.skip(function() {
      // runs once after all tests in the block
      // The code under it skips execution
    })

    it('Varify EDDG Dashboard Loading', function(){
        const lp = new PCLandingPage()
        lp.visit()
        lp.EnterUserName(this.data.Username)
        lp.EnterPassowrd(this.data.Password)
        lp.Login()
        cy.title().should('be.equal', 'Paradigm Central - Solutions for Complex Medical Management')
    })


/*************************************************
* Log
**************************************************/
//TODO: Take URL from config file    
cy.log("This is data from ")

cy.log(Cypress.env())

cy.log(Cypress.env('url'))


/*************************************************
* environment variable
**************************************************/

// Access all the environment variables
Cypress.env()
 
// Access specific environment variable with a name
Cypress.env("Key1"); // // It will return "Value1"

// Change environment variables from configuration file (cypress.json by default) from within your tests
Cypress.env('host', 'http://server.dev.local')


/*************************************************
* Interacting with Elements
**************************************************/

cy.get('.action-btn').click()
cy.get('.action-form').type('ILOVECypress')
cy.get('.action-form').submit()

cy.get('button').click({ position: 'topLeft' })
cy.get('button').debug().click()

// force the click and all subsequent events
// to fire even if this element isn't considered 'actionable'
cy.get('button').click({ force: true })


***************************************************************
# Element Events
***************************************************************

cy.get('.btn').click()          // Click on button
cy.focused().click()            // Click on el with focus
cy.contains('Welcome').click()  // Click on first el containing 'Welcome'
cy.get('.nav > a').click()		// Click a link in a nav
cy.get('img').click('topRight')	// Click the top right corner of the button.
cy.get('#top-banner').click(15, 40)	//The click below will be issued inside of the element (15px from the left and 40px from the top).

//Force a click regardless of its actionable state
cy.get('.close').as('closeBtn')

// Force a click with position argument
cy.get('@closeBtn').click({ force: true })

//Force a click with relative coordinates
cy.get('#footer .next').click(5, 60, { force: true })

//Click all elements with id starting with ‘btn’
cy.get('[id^=btn]').click({ multiple: true })


//Force a click regardless of its actionable state
cy.get('.close').as('closeBtn')
cy.get('@closeBtn').click({ force: true })

Force a click with position argument
cy.get('#collapse-sidebar').click('bottomLeft', { force: true })

Force a click with relative coordinates
cy.get('#footer .next').click(5, 60, { force: true })

Click all elements with id starting with ‘btn’
cy.get('[id^=btn]').click({ multiple: true })

Shift click
// execute a SHIFT + click on the first <li>
// { release: false } is necessary so that
// SHIFT will not be released after the type command
cy.get('body').type('{shift}', { release: false })
cy.get('li:first').click()


***************************************************************
# Contains
***************************************************************
Find the first element containing a number
cy.contains(4)

// yields <span>
cy.get('#main').contains('Jane Lane')

// yields <button>
cy.contains('Search').children('i').should('have.class', 'fa-search')

// yields <a>
cy.get('nav').contains('Sign Out').should('have.attr', 'href', '/signout')

// yields label
cy.contains('Age').find('input').type('29')

//Element contains text “New User”
cy.get('h1').contains('New User')

// yields <li>bananas</li>
cy.contains(/^b\w+/)

// yields <ul>...</ul>
cy.contains('ul', 'apples')

cy.get('form')                  // yields <form>...</form>
  .contains('form', 'Proceed')  // yields <form>...</form>
  .submit()                     // yields <form>...</form>


cy.get('div').contains('capital sentence') // fail
cy.get('div').contains('capital sentence', { matchCase: false }) // pass


/*************************************************
* Interacting with Elements
**************************************************/

cy.get('#err')
cy.get('.err')
cy.get('input[name="firstName"]').should('have.value', 'Homer')
cy.get('#header a')

Selector
//Get the input element
cy.get('input').should('be.disabled')

//Find the first li descendent within a ul
cy.get('ul li:first').should('have.class', 'active')

//Find the dropdown-menu and click it
cy.get('.dropdown-menu').click()

//Find 5 elements with the given data attribute
cy.get('[data-test-id="test-example"]').should('have.length', 5)

//Find the link with an href attribute containing the word “questions” and click it
cy.get('a[href*="questions"]').click()

cy.get('.list > li') // Yield the <li>'s in .list


cy.get('form').within(() => {
  cy.get('input').type('Pamela') // Only yield inputs within form
  cy.get('textarea').type('is a developer') // Only yield textareas within form
})


Alias

Get the aliased ‘todos’ elements
  cy.get('ul#todos').as('todos')

  //...hack hack hack...

  //later retrieve the todos
  cy.get('@todos')

Get the aliased ‘submitBtn’ element
  beforeEach(() => {
    cy.get('button[type=submit]').as('submitBtn')
  })

  it('disables on click', () => {
    cy.get('@submitBtn').should('be.disabled')
  })

Get the aliased ‘users’ fixture
  beforeEach(() => {
    cy.fixture('users.json').as('users')
  })

  it('disables on click', () => {
    // access the array of users
    cy.get('@users').then((users) => {
    // get the first user
    const user = users[0]

    cy.get('header').contains(user.name)
    })
  })


# Timeouts
cy.get('input', {timeout: 10000}).should('have.value', '10').and('have.class', 'error')
             ↲
  // timeout here will be passed down to the '.and()'
  // and it will retry for up to 10 secs
  
cy.get('input', {timeout: 10000}).should('have.value', 'US').and(($input) => {
             ↲
  // timeout here will be passed down to the '.and()'
  // unless an assertion throws earlier,
  // ALL of the assertions will retry for up to 10 secs
  expect($input).to.not.be('disabled')
  expect($input).to.not.have.class('error')
})



/*************************************************
* Should
**************************************************/
*** Element Value check *** 
	// retry until this textarea has the correct value
  cy.get('#username').should('have.value', this.data.Username);
  
  // retry until this textarea has the correct value
cy.get('textarea').should('have.value', 'foo bar baz')
	
	cy.title().should('be.equal', 'Paradigm Central - Solutions for Complex Medical Management')

	cy.get('h1').should('contain', 'My First Post')
	
	cy.get('h1').should('have.text', 'New York')

	cy.get('.error').should('be.empty')                    // Assert that '.error' is empty

	// retry until this span does not contain 'click me'
	cy.get('a').parent('span.help').should('not.contain', 'click me')


*** Visibility Check ***

	// retry until this button is visible
	cy.get('button').should('be.visible')

	cy.contains('Login').should('be.visible')              // Assert that el is visible

*** Element Status check ***

  // retry until this span does not contain 'click me'
  cy.get('a').parent('span.help').should('not.contain', 'click me')

	// retry until loading spinner no longer exists
	cy.get('#loading').should('not.exist')

	// retry until our radio is checked
	cy.get(':radio').should('be.checked')

	cy.get(':checkbox').should('be.disabled')

	// retry until this input does not have class disabled
	cy.get('form').find('input').should('not.have.class', 'disabled')
	
	cy.get('.woocommerce-Button').should('be.disabled');

  cy.get('button.mat-button.mat-primary').eq(8).should('not.be.disabled')
  cy.get('button.mat-button.mat-primary').eq(8).should('be.disabled')

*** Element attributes check ***

	cy.get('#input-receives-focus').should('have.focus') // equivalent to should('be.focused')

	cy.get('option:first').should('be.selected').and('have.value', 'Metallica')

	// retry until we find 3 matching <li.selected>
	cy.get('li.selected').should('have.length', 3)


	// retry until .completed has matching css
	cy.get('.completed').should('have.css', 'text-decoration', 'line-through')

	// retry until .accordion css have display: none
	cy.get('#accordion').should('not.have.css', 'display', 'none')

	cy.get('.woocommerce-Button').should('have.attr', 'disabled', 'disabled');

	cy.get('form').should('have.class', 'form-horizontal')

	cy.get('#header a').should('have.attr', 'href', '/users')

	cy.wrap({ foo: 'bar' }).its('foo').should('eq', 'bar') // Assert the 'foo' property equals 'bar'



*** Chained ***

	cy
	.get('nav')                          // yields <nav>
	.should('be.visible')                // yields <nav>
	.should('have.css', 'font-family')   // yields 'sans-serif'
	.and('match', /serif/)               // yields 'sans-serif'


	cy.get('button').click()
	.should('have.class', 'active')
	.and('not.have.class', 'inactive')


*** Perform action ***

	cy.get('option:first').should('be.selected').then(($option) => {
		// $option is yielded
	})

	cy.get('button').should('have.id', 'new-user').then(($button) => {
	// $button is yielded
	})


*** Wait action ***

	cy.get('input', { timeout: 10000 }).should('have.value', '10')

	cy.get('.mobile-nav', { timeout: 10000 }).should('be.visible')





// .should(cb) callback function will be retried
cy.get('.docs-header').find('div').should(($div) => {
	expect($div).to.have.length(1)

	const className = $div[0].className

	expect(className).to.match(/heading-/)
})

cy.get('.docs-header').find('div').should(($div) => {
	if ($div.length !== 1) {
	  // you can throw your own errors
	  throw new Error('Did not find 1 element')
	}

	const className = $div[0].className

	if (!className.match(/heading-/)) {
	  throw new Error(`No class "heading-" in ${className}`)
	}
})


cy.get('.connectors-list > li').should(($lis) => {
	expect($lis).to.have.length(3)
	expect($lis.eq(0)).to.contain('Walk the dog')
	expect($lis.eq(1)).to.contain('Feed the cat')
	expect($lis.eq(2)).to.contain('Write JavaScript')
})



cy.get('.assertion-table')
  .find('tbody tr:last').should('have.class', 'success')
  .find('td')
  .first()
  // checking the text of the  element in various ways
  .should('have.text', 'Column content')
  .should('contain', 'Column content')
  .should('have.html', 'Column content')
  // chai-jquery uses "is()" to check if element matches selector
  .should('match', 'td')
  // to match text content against a regular expression
  // first need to invoke jQuery method text()
  // and then match using regular expression
  .invoke('text')
  .should('match', /column content/i)


// a better way to check element's text content against a regular expression
// is to use "cy.contains"
// https://on.cypress.io/contains
cy.get('.assertion-table')
  .find('tbody tr:last')
  // finds first  element with text content matching regular expression
  .contains('td', /column content/i)
  .should('be.visible')
  
  
cy.get('.assertions-link')
  .should('have.class', 'active')
  .and('have.attr', 'href')
  .and('include', 'cypress.io')




let text
/**
* Normalizes passed text,
* useful before comparing text with spaces and different capitalization.
* @param {string} s Text to normalize
*/
const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()

cy.get('.two-elements')
.find('.first')
.then(($first) => {
  // save text from the first element
  text = normalizeText($first.text())
})

cy.get('.two-elements')
.find('.second')
.should(($div) => {
  // we can massage text before comparing
  const secondText = normalizeText($div.text())
  expect(secondText, 'second text').to.equal(text)
})


cy.get('#random-number')
  .should(($div) => {
    // retries getting the element
    // while the "🎁" is converted into NaN
    // and only passes when a number is set
    const n = parseFloat($div.text())
    expect(n).to.be.gte(1).and.be.lte(10)
  })
  
  
  
  


// .then(cb) callback is not retried,
// it either passes or fails
.then(($div) => {
expect($div).to.have.text('Introduction')
})




// break on a debugger before the get command
cy.get('button').debug().click()

or

debugger
cy.get('button').click()


alias
cy.get('table').find('tr').as('rows');
cy.get('@rows').first().click();



 cy.get('.noo-product-inner h3').each(($el , index , $list) => {
        //cy.log($el.text());
        if($el.text().includes(productName)) {
            cy.get($el).click();
        }
    })
   


 
//Changing the timeout from 4 seconds to 10 seconds, overload the config in test or suite level
Cypress.config('defaultCommandTimeout',10000)
 






















# Aliases instead of variables
describe('create backup button', function() {
  beforeEach(() => {
    cy.get('a#ai1wm-create-backup').as('button')
  }) 
  it('Create backup button should be visible, has right text and attributes', function() {
    cy.get('@button')
      .should('be.visible')
      .should('have.attr', 'href', '#')
      .should('have.class', 'ai1wm-button-green')
      .should('contain', 'Create backup')
      .children('i.ai1wm-icon-export')
      .should('be.empty')
  })
  it('Clicking the Create backup button should trigger the export', function() {
    cy.get('@button').click()
    // Export test logic comes here
  })
})


# Commands
	 support folder
	 
Cypress.Commands.add('login', function (options = {}) {
  cy.visit('/wp-login.php')
  cy.fixture('user').then((user) => {
    cy.get('#loginform').within(function() {
      cy.get('#user_login').clear().type(user.login)
      cy.get('#user_pass').clear().type(user.password)
      cy.root().submit()
    })
    cy.url().should('include', '/wp-admin')
  })
})

# WaitForResponse
it('The form displays a success message when all details are input and server returns success', function() {
  cy.fillInFeedbackForm()
  cy.server()
  cy.route(
    'POST',
    'http://wordpress/wp-admin/admin-ajax.php?action=ai1wm_feedback',
    '{"errors":[]}',
  ).as('feedback')

  cy.get('#ai1wm-feedback-submit').click()
  cy.wait('@feedback')
  cy.get('.ai1wm-feedback .ai1wm-message.ai1wm-success-message p').should(
    'have.text',
    'Thanks for submitting your feedback!',
  )
  cy.get('@form').should('not.exist')
})