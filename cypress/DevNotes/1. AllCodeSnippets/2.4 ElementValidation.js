/********************************************************************************************
* ? should : contains : and
*********************************************************************************************/       

// Create an assertion. Assertions are automatically retried until they pass or time out.



Validation

cy.get('.err').should('be.empty').and('be.hidden') 

  
cy
.get('nav')                       // yields <nav>
.should('be.visible')             // yields <nav>


cy
.get('nav')                          // yields <nav>
.should('be.visible')                // yields <nav>
.should('have.css', 'font-family')   // yields 'sans-serif'
.and('match', /serif/)               // yields 'sans-serif'


cy.get('div').should('have.text', 'foobarbaz')

cy.get('div').invoke('text').then(parseFloat).should('be.gt', 10)

cy.get('#xhr-result').should('contain', '"page":1');


cy.get(':checkbox').should('be.disabled')

cy.get('option:first').should('be.selected').then(($option) => {
// $option is yielded
})


cy.get('form').should('have.class', 'form-horizontal')

cy.get('input').should('not.have.value', 'Jane')

cy.get('button').should('have.id', 'new-user').then(($button) => {
// $button is yielded
})

// have.attr comes from chai-jquery
cy.get('#header a').should('have.attr', 'href', '/users')

cy.get('#btn-focuses-input').click()
cy.get('#input-receives-focus').should('have.focus') // equivalent 

cy.get('[data-cy="loader"]').should('not.exist');


cy.get('@button')
.should('be.visible')
.should('have.attr', 'href', '#')
.should('have.class', 'ai1wm-button-green')
.should('contain', 'Create backup')
.children('i.ai1wm-icon-export')
.should('be.empty')

cy.get('.assertions-link')
.should('have.class', 'active')
.and('have.attr', 'href')
.and('include', 'cypress.io')

cy.get('.error').should('be.empty')                    // Assert that '.error' is empty
cy.contains('Login').should('be.visible')              // Assert that el is visible
cy.wrap({ foo: 'bar' }).its('foo').should('eq', 'bar') // Assert the 'foo' property equals 'bar'





Under the hood Cypress:
• Gets the element .mobile-nav
✨and waits up to 10 seconds for it to exist in the DOM✨
✨and waits up to 10 seconds for it to be visible✨
✨and waits up to 10 seconds for it to contain the text: ‘Home’✨

cy
  .get('.mobile-nav', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Home')




  
<div>
<p class="text-primary">Hello World</p>
<p class="text-danger">You have an error</p>
<p class="text-default">Try again later</p>
</div>



cy
.get('p')
.should(($p) => {
  // should have found 3 elements
  expect($p).to.have.length(3)

  // make sure the first contains some text content
  expect($p.first()).to.contain('Hello World')

  // use jquery's map to grab all of their classes
  // jquery's map returns a new jquery object
  const classes = $p.map((i, el) => {
    return Cypress.$(el).attr('class')
  })

  // call classes.get() to make this a plain array
  expect(classes.get()).to.deep.eq([
    'text-primary',
    'text-danger',
    'text-default'
  ])
})



cy
.get('p')
.should(($p) => {
  expect($p).to.have.length(3)

  return 'foo'
})
.then(($p) => {
  // the argument $p will be the 3 elements, not "foo"
})



ASSERT CLASS NAME CONTAINS HEADING-
<div class="docs-header">
<div class="main-abc123 heading-xyz987">Introduction</div>
</div>
cy.get('.docs-header')
.find('div')
// .should(cb) callback function will be retried
.should(($div) => {
  expect($div).to.have.length(1)

  const className = $div[0].className

  expect(className).to.match(/heading-/)
})
// .then(cb) callback is not retried,
// it either passes or fails
.then(($div) => {
  expect($div).to.have.text('Introduction')
})


You can even throw your own errors from the callback function.

cy.get('.docs-header')
.find('div')
.should(($div) => {
  if ($div.length !== 1) {
    // you can throw your own errors
    throw new Error('Did not find 1 element')
  }

  const className = $div[0].className

  if (!className.match(/heading-/)) {
    throw new Error(`No class "heading-" in ${className}`)
  }
})


ASSERT TEXT CONTENTS OF 3 ELEMENTS
Example below first asserts that there are 3 elements, and then checks the text contents of each one.

<ul class="connectors-list">
<li>Walk the dog</li>
<li>Feed the cat</li>
<li>Write JavaScript</li>
</ul>
cy.get('.connectors-list > li').should(($lis) => {
expect($lis).to.have.length(3)
expect($lis.eq(0)).to.contain('Walk the dog')
expect($lis.eq(1)).to.contain('Feed the cat')
expect($lis.eq(2)).to.contain('Write JavaScript')
})

cy.get('.connectors-list > li').should(($lis) => {
expect($lis, '3 items').to.have.length(3)
expect($lis.eq(0), 'first item').to.contain('Walk the dog')
expect($lis.eq(1), 'second item').to.contain('Feed the cat')
expect($lis.eq(2), 'third item').to.contain('Write JavaScript')
})


# COMPARE TEXT VALUES OF TWO ELEMENTS

<div class="company-details">
<div class="title">Acme Developers</div>
<div class="identifier">ACMEDEVELOPERS</div>
</div>
const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()

// will keep text from title element
let titleText

cy.get('.company-details')
.find('.title')
.then(($title) => {
  // save text from the first element
  titleText = normalizeText($title.text())
})

cy.get('.company-details')
.find('.identifier')
.should(($identifier) => {
  // we can massage text before comparing
  const idText = normalizeText($identifier.text())

  // text from the title element should already be set
  expect(idText, 'ID').to.equal(titleText)
})


CHAINING MULTIPLE ASSERTIONS
Cypress makes it easier to chain assertions together. In this example we use .and() which is identical to .should().

// our subject is not changed by our first assertion,
// so we can continue to use DOM based assertions
cy.get('option:first').should('be.selected').and('have.value', 'Metallica')


WAIT UNTIL THE ASSERTIONS PASS
Cypress won’t resolve your commands until all of its assertions pass.

// Application Code
$('button').click(() => {
$button = $(this)

setTimeout(() => {
  $button.removeClass('inactive').addClass('active')
}, 1000)
})
cy.get('button').click()
.should('have.class', 'active')
.and('not.have.class', 'inactive')  


Timeouts
.should() will continue to retry its specified assertions until it times out.

cy.get('input', { timeout: 10000 }).should('have.value', '10')
// timeout here will be passed down to the '.should()'
// and it will retry for up to 10 secs
cy.get('input', { timeout: 10000 }).should(($input) => {
// timeout here will be passed down to the '.should()'
// unless an assertion throws earlier,
// ALL of the assertions will retry for up to 10 secs
expect($input).to.not.be('disabled')
expect($input).to.not.have.class('error')
expect($input).to.have.value('US')
})  


cy.wrap({ foo: 'bar' })
  .should('have.property', 'foo') // Assert 'foo' property exists
  .and('eq', 'bar')               // Assert 'foo' property is 'bar'



  cy
  .get('nav')                       // yields <nav>
  .should('be.visible')             // yields <nav>
  .and('have.class', 'open')        // yields <nav>
cy
  .get('nav')                       // yields <nav>
  .should('be.visible')             // yields <nav>
  .and('have.css', 'font-family')   // yields 'sans-serif'
  .and('match', /serif/)            // yields 'sans-serif'
cy.get('button').should('have.class', 'active').and('not.be.disabled')

cy
  .get('a')
  .should('contain', 'Edit User') // yields <a>
  .and('have.attr', 'href')       // yields string value of href
  .and('match', /users/)          // yields string value of href
  .and('not.include', '#')        // yields string value of href

  cy
  .get('#header a')
  .should('have.class', 'active')
  .and('have.attr', 'href', '/users')

cy
  .get('.list')
  .find('input[type="checkbox"]')
  .should('be.checked')
  .and('not.be.disabled')


  cy.get('.error').should('be.empty')                    // Assert that '.error' is empty
  cy.contains('Login').should('be.visible')              // Assert that el is visible
  cy.wrap({ foo: 'bar' }).its('foo').should('eq', 'bar') // Assert the 'foo' property equals 'bar'

  cy.get('.error').should('be.empty')                    // Assert that '.error' is empty
  cy.contains('Login').should('be.visible')              // Assert that el is visible
  cy.wrap({ foo: 'bar' }).its('foo').should('eq', 'bar') // Assert the 'foo' property equals 'bar'



  cy.get('.error').should('be.empty')                    // Assert that '.error' is empty
  cy.contains('Login').should('be.visible')              // Assert that el is visible
  cy.wrap({ foo: 'bar' }).its('foo').should('eq', 'bar') // Assert the 'foo' property equals 'bar'


  cy.get(':checkbox').should('be.disabled')


  cy.get('option:first').should('be.selected').then(($option) => {
    // $option is yielded
  })

  cy.get('form').should('have.class', 'form-horizontal')

  cy.get('input').should('not.have.value', 'Jane')


  cy.get('button').should('have.id', 'new-user').then(($button) => {
    // $button is yielded
  })

  cy.get('#header a').should('have.attr', 'href', '/users')

  cy.get('table tr').should('have.length', 2)

  cy.get('tbody tr:first').should(($tr) => {
    expect($tr).to.have.class('active')
    expect($tr).to.have.attr('href', '/users')
  })

  cy
  .get('p')
  .should(($p) => {
    expect($p).to.have.length(3)


    


Length
// retry until we find 3 matching <li.selected>
cy.get('li.selected').should('have.length', 3)
Class
// retry until this input does not have class disabled
cy.get('form').find('input').should('not.have.class', 'disabled')
Value
// retry until this textarea has the correct value
cy.get('textarea').should('have.value', 'foo bar baz')
Text Content
// retry until this span does not contain 'click me'
cy.get('a').parent('span.help').should('not.contain', 'click me')
Visibility
// retry until this button is visible
cy.get('button').should('be.visible')
Existence
// retry until loading spinner no longer exists
cy.get('#loading').should('not.exist')
State
// retry until our radio is checked
cy.get(':radio').should('be.checked')
CSS
// retry until .completed has matching css
cy.get('.completed').should('have.css', 'text-decoration', 'line-through')
// retry until .accordion css have display: none
cy.get('#accordion').should('not.have.css', 'display', 'none')


.should('be.empty')                    // Assert that '.error' is empty
.should('be.visible')              // Assert that el is visible.should('be.visible')             // yields <nav>
.should('eq', 'bar') // Assert the 'foo' property equals 'bar'.should('be.disabled')
.should('have.class', 'form-horizontal')
.should('not.have.value', 'Jane')
.should('have.attr', 'href', '/users')
.should('have.focus') // equivalent to should('be.focused')



cy.get('option:first').should('be.selected').then(($option) => {
  // $option is yielded
})

cy.get('button').should('have.id', 'new-user').then(($button) => {
  // $button is yielded
})

cy
  .get('p')
  .should(($p) => {
    // should have found 3 elements
    expect($p).to.have.length(3)

	expect($lis.eq(0)).to.contain('Walk the dog')
	
    // make sure the first contains some text content
    expect($p.first()).to.contain('Hello World')

    // use jquery's map to grab all of their classes
    // jquery's map returns a new jquery object
    const classes = $p.map((i, el) => {
      return Cypress.$(el).attr('class')
    })

    // call classes.get() to make this a plain array
    expect(classes.get()).to.deep.eq([
      'text-primary',
      'text-danger',
      'text-default'
    ])
  })

  
# Yields
  cy
    .get('nav')                       // yields <nav>
    .should('be.visible')             // yields <nav>



    cy
    .get('nav')                          // yields <nav>
    .should('be.visible')                // yields <nav>
    .should('have.css', 'font-family')   // yields 'sans-serif'
    .and('match', /serif/)               // yields 'sans-serif'


# CHAINERS
  cy.get(':checkbox').should('be.disabled')

  cy.get('option:first').should('be.selected').then(($option) => {
    // $option is yielded
  })

# VALUE

//Assert the class is ‘form-horizontal’
cy.get('form').should('have.class', 'form-horizontal')

//Assert the value is not ‘Jane’
cy.get('input').should('not.have.value', 'Jane')

//The current subject is yielded
cy.get('button').should('have.id', 'new-user').then(($button) => {
  // $button is yielded
})


# METHOD AND VALUE
// have.attr comes from chai-jquery
cy.get('#header a').should('have.attr', 'href', '/users')


# FOCUS
cy.get('#btn-focuses-input').click()
cy.get('#input-receives-focus').should('have.focus') // equivalent 


# FUNCTION
cy
  .get('p')
  .should(($p) => {
    // should have found 3 elements
    expect($p).to.have.length(3)

    // make sure the first contains some text content
    expect($p.first()).to.contain('Hello World')

    // use jquery's map to grab all of their classes
    // jquery's map returns a new jquery object
    const classes = $p.map((i, el) => {
      return Cypress.$(el).attr('class')
    })

    // call classes.get() to make this a plain array
    expect(classes.get()).to.deep.eq([
      'text-primary',
      'text-danger',
      'text-default'
    ])
  })


  cy
  .get('p')
  .should(($p) => {
    expect($p).to.have.length(3)

    return 'foo'
  })
  .then(($p) => {
    // the argument $p will be the 3 elements, not "foo"
  })


y.get('.docs-header')
  .find('div')
  // .should(cb) callback function will be retried
  .should(($div) => {
    expect($div).to.have.length(1)

    const className = $div[0].className

    expect(className).to.match(/heading-/)
  })
  // .then(cb) callback is not retried,
  // it either passes or fails
  .then(($div) => {
    expect($div).to.have.text('Introduction')
  })


  cy.get('.docs-header')
  .find('div')
  .should(($div) => {
    if ($div.length !== 1) {
      // you can throw your own errors
      throw new Error('Did not find 1 element')
    }

    const className = $div[0].className

    if (!className.match(/heading-/)) {
      throw new Error(`No class "heading-" in ${className}`)
    }
  })


# ASSERT TEXT CONTENTS OF 3 ELEMENTS

cy.get('.connectors-list > li').should(($lis) => {
  expect($lis).to.have.length(3)
  expect($lis.eq(0)).to.contain('Walk the dog')
  expect($lis.eq(1)).to.contain('Feed the cat')
  expect($lis.eq(2)).to.contain('Write JavaScript')
})

cy.get('.connectors-list > li').should(($lis) => {
  expect($lis, '3 items').to.have.length(3)
  expect($lis.eq(0), 'first item').to.contain('Walk the dog')
  expect($lis.eq(1), 'second item').to.contain('Feed the cat')
  expect($lis.eq(2), 'third item').to.contain('Write JavaScript')
})


# COMPARE TEXT VALUES OF TWO ELEMENTS
const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()

// will keep text from title element
let titleText

cy.get('.company-details')
  .find('.title')
  .then(($title) => {
    // save text from the first element
    titleText = normalizeText($title.text())
  })

cy.get('.company-details')
  .find('.identifier')
  .should(($identifier) => {
    // we can massage text before comparing
    const idText = normalizeText($identifier.text())

    // text from the title element should already be set
    expect(idText, 'ID').to.equal(titleText)
  })

# CHAINING MULTIPLE ASSERTIONS
// our subject is not changed by our first assertion,
// so we can continue to use DOM based assertions
cy.get('option:first').should('be.selected').and('have.value', 'Metallica')


# WAIT UNTIL THE ASSERTIONS PASS

// Application Code
$('button').click(() => {
  $button = $(this)

  setTimeout(() => {
    $button.removeClass('inactive').addClass('active')
  }, 1000)
})
cy.get('button').click()
  .should('have.class', 'active')
  .and('not.have.class', 'inactive')


  # Timeouts
  cy.get('input', { timeout: 10000 }).should('have.value', '10')
  // timeout here will be passed down to the '.should()'
  // and it will retry for up to 10 secs
  cy.get('input', { timeout: 10000 }).should(($input) => {
    // timeout here will be passed down to the '.should()'
    // unless an assertion throws earlier,
    // ALL of the assertions will retry for up to 10 secs
    expect($input).to.not.be('disabled')
    expect($input).to.not.have.class('error')
    expect($input).to.have.value('US')
  })


cy.contains('Login').and('be.visible')  


//Contains
cy.contains('Log In')

cy.contains('Age').find('input').type('29')

cy.contains(108762).click().contains('Yes, Delete!').click()

cy.contains('h1', 'todos')


cy.get('button').then(($btn) => {

        // store the button's text
        const txt = $btn.text()
      
        // submit a form
        cy.get('form').submit()
      
        // compare the two buttons' text
        // and make sure they are different
        cy.get('button').should(($btn2) => {
          expect($btn2.text()).not.to.eq(txt)
        })
      })
      
  
      
      Cypress get specific text
 


      <label for="prod-field"
        ><span class="label-text">Project</span>>
        <span class="aui-icon">Required</span>
      </label>
      
      cy.get('[for="prod-field"] .label-text').should('have.text', 'Project');


      
.should('have.attr', 'alt').then(alttext => {
        expect(alttext.length).not.to.be.greaterThan(160);
      });

      
      
# Extract text and number from variable

Markup:

<div class="date">Tue 7 Jul</div>

Test:

cy.get('.date').then(($el) => {
    cy.log('original: ' + $el.text());
    const dateString = Cypress.moment($el.text(), 'ddd D MMM')
    const month = Cypress.moment(dateString, 'ddd D MMM').format('MMMM');
    const day = Cypress.moment(dateString, 'ddd D MMM').format('D');

    cy.log(`After formatting month = ${month}`);
    cy.log(`After formatting day = ${day}`);
    expect(month).to.equal('July');
    expect(day).to.equal('7');
});





cy.get('.nav').contains('About') 
cy.contains('Hello')    


# FIND THE FIRST ELEMENT CONTAINING SOME TEXT
<ul>
  <li>apples</li>
  <li>oranges</li>
  <li>bananas</li>
</ul>
yields <li>apples</li>

cy.contains('apples')

# FIND THE INPUT[TYPE='SUBMIT'] BY VALUE
cy.get('form').contains('submit the form!').click()

# FIND THE FIRST ELEMENT CONTAINING A NUMBER
cy.contains(4)

# FIND THE FIRST ELEMENT WITH TEXT MATCHING THE REGULAR EXPRESSION

<ul>
  <li>apples</li>
  <li>oranges</li>
  <li>bananas</li>
</ul>
// yields <li>bananas</li>

cy.contains(/^b\w+/)

# SPECIFY A SELECTOR TO RETURN A SPECIFIC ELEMENT

cy.contains('ul', 'apples')

# KEEP THE FORM AS THE SUBJECT

cy.get('form')                  // yields <form>...</form>
  .contains('form', 'Proceed')  // yields <form>...</form>
  .submit()                     // yields <form>...</form>

# CASE SENSITIVITY
cy.get('div').contains('capital sentence') // fail
cy.get('div').contains('capital sentence', { matchCase: false }) // pass

# WHEN STARTING A SERIES OF COMMANDS:

cy.get('#checkout-container').contains('Buy Now')


# BE WARY OF CHAINING MULTIPLE CONTAINS
cy.contains('Delete User').click()
cy.contains('Yes, Delete!').click()

# Single Element
cy.contains('Jane Lane')
cy.get('#main').contains('Jane Lane')

# FAVOR OF <BUTTON> OVER OTHER DEEPER ELEMENTS
cy.contains('Search').children('i').should('have.class', 'fa-search')

# FAVOR OF <A> OVER OTHER DEEPER ELEMENT
cy.get('nav').contains('Sign Out').should('have.attr', 'href', '/signout')

# FAVOR OF <LABEL> OVER OTHER DEEPER ELEMENTS
cy.contains('Age').find('input').type('29')
