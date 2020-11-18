/********************************************************************************************
* ? visit : type : click : dblclick : select : submit : check : uncheck : rightclick: clear 
* ? focus : blur : scrollIntoView : scrollTo : focused : hover : go : reload : trigger
*********************************************************************************************/

# *** #visit *** 
 cy.visit('http://localhost:3000')    // Yields the window of the remote page

 cy.visit('./pages/hello.html')
 
 //Change the default timeout
 cy.visit('/index.html', { timeout: 30000 })
 
 //Add basic auth headers
 cy.visit('https://the-internet.herokuapp.com/basic_auth', {
      auth: {
        username: 'admin',
        password: 'admin'
      }
 })

// this is the same thing as providing the auth object
cy.visit('https://wile:coyote@www.acme.com')

//Provide an onBeforeLoad callback function
cy.visit('http://localhost:3000/#dashboard', {
  onBeforeLoad: (contentWindow) => {
    // contentWindow is the remote page's window object
  }
})

# Provide an onLoad callback function
cy.visit('http://localhost:3000/#/users', {
  onLoad: (contentWindow) => {
    // contentWindow is the remote page's window object
    if (contentWindow.angular) {
      // do something
    }
  }
})

# Add query paramaters
// visits http://localhost:3500/users?page=1&role=admin
cy.visit('http://localhost:3500/users', {
  qs: {
    page: '1',
    role: 'admin'
  }
})


// visits http://example.com/users?page=1&admin=true
cy.visit('http://example.com/users?page=1', {
  qs: { admin: true }
})

//Submit a form
cy.visit({
    url: 'http://localhost:3000/cgi-bin/newsletterSignup',
    method: 'POST',
    body: {
      name: 'George P. Burdell',
      email: 'burdell@microsoft.com'
    }
  })



  {
    "baseUrl": "http://localhost:3000/#/"
  }
  cy.visit('dashboard') // Visits http://localhost:3000/#/dashboard


  cy.visit('index.html').then((contentWindow) => {
    // contentWindow is the remote page's window object
  })



# Type
  
	Type into a textarea.
	cy.get('textarea').type('Hello world') // yields <textarea>

	Type into a login form
	cy.get('[contenteditable]').type('some text!')

	cy.get('input').type('Hello, World') // Type 'Hello, World' into the 'input'


	‘Selecting’ an option from datalist
	cy.get('input').type('Apple')

	Tabindex
	cy.get('#el').type('supercalifragilisticexpialidocious')


	Type a key combination
	// this is the same as a user holding down SHIFT and ALT, then pressing Q
	cy.get('input').type('{shift}{alt}Q')

	// 'ctrlKey' will be true for each event while 'test' is typed
	// but false while 'everything' is typed
	cy.get('input').type('{ctrl}test').type('everything')

	
	Type literal { or } characters
	cy.get('#code-input')
	  // will not escape { } characters
	  .type('function (num) {return num * num;}', { parseSpecialCharSequences: false })
	Hold down modifier key and type a word
	// all characters after {ctrl} will have 'ctrlKey'
	// set to 'true' on their key events
	cy.get('input').type('{ctrl}test')
	Release behavior

	// 'ctrlKey' will be true for each event while 'test' is typed
	// but false while 'everything' is typed
	cy.get('input').type('{ctrl}test').type('everything')

	To keep a modifier activated between commands, specify {release: false} in the options.

	// 'altKey' will be true while typing 'foo'
	cy.get('input').type('{alt}foo', { release: false })
	// 'altKey' will also be true during 'get' and 'click' commands
	cy.get('button').click()

	Modifiers are automatically released between tests, even with {release: false}.
	it('has modifiers activated', () => {
	  // 'altKey' will be true while typing 'foo'
	  cy.get('input').type('{alt}foo', { release: false })
	})

	it('does not have modifiers activated', () => {
	  // 'altKey' will be false while typing 'bar'
	  cy.get('input').type('bar')
	})

	To manually release modifiers within a test after using {release: false}, use another type command and the modifier will be released after it.
	// 'altKey' will be true while typing 'foo'
	cy.get('input').type('{alt}foo', { release: false })
	// 'altKey' will be true during the 'get' and 'click' commands
	cy.get('button').click()
	// 'altKey' will be released after this command
	cy.get('input').type('{alt}')
	// 'altKey' will be false during the 'get' and 'click' commands
	cy.get('button').click()

	Use keyboard shortcuts in body
	// all of the type events are fired on the body
	cy.get('body').type('{uparrow}{uparrow}{downarrow}{downarrow}{leftarrow}{rightarrow}{leftarrow}{rightarrow}ba')
	Do a shift + click
	// execute a SHIFT + click on the first <li>
	// {release: false} is necessary so that
	// SHIFT will not be released after the type command
	cy.get('body').type('{shift}', { release: false }).get('li:first').click()

	Force typing regardless of its actionable state
	Forcing typing overrides the actionable checks Cypress applies and will automatically fire the events.
	cy.get('input[type=text]').type('Test all the things', { force: true })



 
# Select an <option> within a <select>.

cy.get('select').select('user-1') // Select the 'user-1' option


// yields <option value="456">apples</option>
Text Content
cy.get('select').select('apples').should('have.value', '456')
  
  
// yields <option value="456">apples</option>
Select the option with the value “456”
cy.get('select').select('456').should('have.value', '456')


// Select multiple options
cy.get('select')
  .select(['apples', 'bananas']).invoke('val')
  .should('deep.equal', ['456', '458'])


Force select a hidden
cy.get('select')
  .select('banana', { force: true })
  .invoke('val')
  .should('eq', 'banana')
 

cy.get('select')
  .select('okra', { force: true })
  .invoke('val')
  .should('eq', 'okra')

  
  # rightclick
  cy.get('.menu').rightclick()       // Right click on .menu
  cy.focused().rightclick()          // Right click on el with focus
  cy.contains('Today').rightclick()  // Right click on first el containing 'Today'

  Force a right click regardless of its actionable state
  cy.get('#open-menu').rightclick({ force: true })

  Force a right click with position argument
  cy.get('#open-menu').rightclick('bottomLeft', { force: true })

  Force a right click with relative coordinates
  cy.get('#open-menu').rightclick(5, 60, { force: true })

  Right click all buttons found on the page
  cy.get('.open-menu').rightclick({ multiple: true })

  Command right click
  // execute a CMD + right click on the .menu-item
  // { release: false } is necessary so that
  // CMD will not be released after the type command
  cy.get('body').type('{cmd}', { release: false })
  cy.get('.menu-item').rightclick()

  Right click the DOM element
  cy.get('.rightclick-action-div').rightclick()


# Focus Blur  
cy.get('input').first().focus() // Focus on the first input
// yields the <textarea> for further chaining
cy.get('textarea').focus().type('Nice Product!').blur()


# Submit  
cy.get('form').submit()   // Submit a form

cy.get('#contact').submit()


/*************************************************************
* click
************************************************************/

cy.get('button').contains('Submit').click();


/*************************************************************
* dblclick
************************************************************/
cy.get('button').dblclick()          // Double click on button
cy.focused().dblclick()              // Double click on el with focus
cy.contains('Welcome').dblclick()    // Double click on first el containing 'Welcome'

//Double click an anchor link
cy.get('a#nav1').dblclick() // yields the <a>

//Specify a position of the element to double click
cy.get('button').dblclick('bottom')


Specify coordinates relative to the top left corner
cy.get('button').dblclick(30, 10)


Force a double click regardless of its actionable state
cy.get('button').dblclick({ force: true })

Force a double click with position argument
cy.get('button').dblclick('topRight', { force: true })

Force a double click with relative coordinates
cy.get('button').dblclick(60, 60, { force: true })


Double click all buttons found on the page
cy.get('button').dblclick({ multiple: false })

Alt click
// execute a ALT + dblclick on the first <li>
// { release: false } is necessary so that
// ALT will not be released after the type command
cy.get('body').type('{alt}', { release: false })
cy.get('li:first').dblclick()

/*************************************************************
* Clear
* Clear the value of an input or textarea.
************************************************************/
cy.get('[type="text"]').clear()        // Clear text input
cy.get('textarea').type('Hi!').clear() // Clear textarea
cy.focused().clear()                   // Clear focused input/textarea
cy.get('textarea').clear().type('Hello, World')
cy.get('input[name="name"]').clear().type('Jane Lane')


/*************************************************************
* #check
* To check a checkbox or radio, use the .check() command
************************************************************/

// By default, .check() will check all
// matching checkbox or radio elements in succession, one after another
cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
  .check().should('be.checked')

cy.get('.action-radios [type="radio"]').not('[disabled]')
  .check().should('be.checked')

// .check() accepts a value argument
cy.get('.action-radios [type="radio"]')
  .check('radio1').should('be.checked')

// .check() accepts an array of values
cy.get('.action-multiple-checkboxes [type="checkbox"]')
  .check(['checkbox1', 'checkbox2']).should('be.checked')

// Ignore error checking prior to checking
cy.get('.action-checkboxes [disabled]')
  .check({ force: true }).should('be.checked')

cy.get('.action-radios [type="radio"]')
  .check('radio3', { force: true }).should('be.checked')


/*************************************************************
* #uncheck
* Clear the value of an input or textarea.
************************************************************/
cy.get('[type="checkbox"]').uncheck()   // Unchecks checkbox element

Uncheck all checkboxes
cy.get(':checkbox').uncheck()
Uncheck element with the id ‘saveUserName’
cy.get('#saveUserName').uncheck()
Value
Uncheck the checkbox with the value of ‘ga’
cy.get('input[type="checkbox"]').uncheck(['ga'])
Values
Uncheck the checkboxes with the values ‘ga’ and ‘ca’
cy.get('[type="checkbox"]').uncheck(['ga', 'ca'])

cy.get('[data-js="choose-all"]').click()
  .find('input[type="checkbox"]').first().uncheck()

  // By default, .uncheck() will uncheck all matching
// checkbox elements in succession, one after another
cy.get('.action-check [type="checkbox"]')
.not('[disabled]')
.uncheck().should('not.be.checked')

// .uncheck() accepts a value argument
cy.get('.action-check [type="checkbox"]')
.check('checkbox1')
.uncheck('checkbox1').should('not.be.checked')

// .uncheck() accepts an array of values
cy.get('.action-check [type="checkbox"]')
.check(['checkbox1', 'checkbox3'])
.uncheck(['checkbox1', 'checkbox3']).should('not.be.checked')

// Ignore error checking prior to unchecking
cy.get('.action-check [disabled]')
.uncheck({ force: true }).should('not.be.checked')



# Checking radio buttons in Cypress

cy.get('[type="radio"].XyzTypeRadio').check("2")

cy.get('[type="radio"].XyzTypeRadio').first().check()


#scrollIntoView

  // scroll the button into view, as if the user had scrolled
cy.get('#scroll-horizontal button').scrollIntoView().should('be.visible')


cy.get('#scroll-both button').scrollIntoView().should('not.be.visible')

#select

// at first, no option should be selected
cy.get('.action-select')
  .should('have.value', '--Select a fruit--')

// Select option(s) with matching text content
cy.get('.action-select').select('apples')
// confirm the apples were selected
// note that each value starts with "fr-" in our HTML
cy.get('.action-select').should('have.value', 'fr-apples')

cy.get('.action-select-multiple')
  .select(['apples', 'oranges', 'bananas'])
  // when getting multiple values, invoke "val" method first
  .invoke('val')
  .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

// Select option(s) with matching value
cy.get('.action-select').select('fr-bananas')
  // can attach an assertion right away to the element
  .should('have.value', 'fr-bananas')

cy.get('.action-select-multiple')
  .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
  .invoke('val')
  .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])
// assert the selected values include oranges
cy.get('.action-select-multiple')
  .invoke('val').should('include', 'fr-oranges')




  cy.get('.action-email')
  .type('fake@email.com').should('have.value', 'fake@email.com')
  
  
  // Delay each keypress by 0.1 sec
  .type('slow.typing@email.com', { delay: 100 })
  
  
  cy.get('.action-blur').type('About to blur').blur()
  .should('have.class', 'error')
  .prev().should('have.attr', 'style', 'color: red;')
  
  cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
  cy.get('.rightclick-action-input-hidden').should('be.visible')
  
  // By default, .check() will check all
  // matching checkbox or radio elements in succession, one after another
  cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
  .check().should('be.checked')
  
  
  cy.get('.action-radios [type="radio"]').not('[disabled]')
  .check().should('be.checked')
  
  
      // .check() accepts an array of values
  cy.get('.action-multiple-checkboxes [type="checkbox"]')
  .check(['checkbox1', 'checkbox2']).should('be.checked')
  
  cy.get('form').contains('submit the form!').click()

  cy.get('form')                  // yields <form>...</form>
    .contains('form', 'Proceed')  // yields <form>...</form>
    .submit()                     // yields <form>...</form>
    


      // cypress test code
  cy.get('#num').then(($span) => {
    // capture what num is right now
    const num1 = parseFloat($span.text())
  
    cy.get('button').click().then(() => {
      // now capture it again
      const num2 = parseFloat($span.text())
  
      // make sure it's what we expected
      expect(num2).to.eq(num1 + 1)
    })
  })


  
# Anyway to test for specific scroll amount?
cy.window().then(($window) => {
  expect($window.scrollY).to.be.closeTo(400, 100);
});


#How can I use cypress to assert that an image is the correct one?
cy.visit(URL);
cy.get('your_selector').should('have.attr', 'href', '/your_picture_href')


#  How to get div 'text' value in Cypress test using jquery
 cy.get(".ibxudA").find('.WildnessText-kRKTej').should('have.text',"Wildnes")
cy.contains('Wildness')


# Make An Element Visible On The Page
cy.get('.myClass').scrollIntoView();
