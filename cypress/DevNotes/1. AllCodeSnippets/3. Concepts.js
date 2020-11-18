cy.get('button').then(($btn) => {
    // inspect $btn <object>
    debugger
  
    cy.get('#countries').select('USA').then(($select) => {
      // inspect $select <object>
      debugger
  
      cy.url().should((url) => {
        // inspect the url <string>
        debugger
  
        $btn    // is still available
        $select // is still available too
      })
    })
  })



  # Page Object

         
  import LoginPage from "./ObjectModel/LoginPage"
  
  describe('home page', () => {
      it('loginPage', function () {
          const lp = new LoginPage()
      })
  }
  
  
  class LoginPage {
      visit(){
          cy.visit('https://facebook.com');
      }
  
      fillEmail(value){
          const feild = cy.get('#email')
          feild.clear()
          feild.type(value)
          return this
      }
      
      fillPassword(value){
          const feild = cy.get('#pass')
          feild.clear()
          feild.type(value)
          return this
      }
      
      submit(){
          const button = cy.get('#u_0_b')
          button.click()
      }
  }
  
export default LoginPage;
  


// jQuery before, you may be used to querying for elements like this:
$('.my-selector')

//In Cypress, querying elements is the same:
cy.get('.my-selector')





describe('login', () => {
    beforeEach(() => {
        visitLoginPage()
    })

    it('A User logs in and sees a welcome message', () => {
        loginWith('michael@example.com', 'passsword')

        expect(cy.contains('Welcome back Michael')).toBeTruthy
})

    it('A User logs off and sees a goodbye message', () => {
        loginWith('michael@example.com', 'password')
        logout()

        expect(cy.contains('Goodbye! See you soon!'))
    })
})






# Configuring Cypress in CI with Azure DevOps Pipelines
https://mariocardinal.wordpress.com/2019/03/05/configuring-cypress-in-ci-with-azure-devops-pipelines/


# Moving locators to separate file

//LOCATORS
const MESSAGE_FIELD = '#message';
const SUBJECT_SELECTION = '#id_contact';
const EMAIL_INPUT_FIELD = '#email';
const ORDER_ID_INPUT_FIELD = '#id_order';
const FILE_UPLOAD_INPUT_FIELD = '.filename';
const SUBMIT_FORM_BUTTON = '#submitMessage';
const ALERT_AFTER_SUBMIT  = '.alert'

//METHODS TO GET LOCATORS
const messageField = () => cy.get(MESSAGE_FIELD);
const subjectSelection = () => cy.get(SUBJECT_SELECTION);
const emailInputField = () => cy.get(EMAIL_INPUT_FIELD);
const orderIdInputField = () => cy.get(ORDER_ID_INPUT_FIELD);
const fileUploadInputField = () => cy.get(FILE_UPLOAD_INPUT_FIELD); 
const submitFormButton = () => cy.get(SUBMIT_FORM_BUTTON);
const alertAfterSubmit = () => cy.get(ALERT_AFTER_SUBMIT)

//EXPORT METHODS 
module.exports = { 
  messageField, subjectSelection, emailInputField, orderIdInputField, fileUploadInputField, submitFormButton, alertAfterSubmit
}
    
   





  
  


/*************************************************************
* Access Element value
************************************************************/

cy.get('ul>li').each(() => {...}) // Iterate through each 'li'
cy.getCookies().each(() => {...}) // Iterate through each cookie

Iterate over an array of DOM elements

cy
  .get('ul>li')
  .each(($el, index, $list) => {
    // $el is a wrapped jQuery element
    if ($el.someMethod() === 'something') {
      // wrap this element so we can
      // use cypress commands on it
      cy.wrap($el).click()
    } else {
      // do something else
    }
  })

// The original array is always yielded


cy
  .get('li').should('have.length', 3)
  .each(($li, index, $lis) => {
    return 'something else'
  })
  .then(($lis) => {
    expect($lis).to.have.length(3) // true
  })


// Promises are awaited
cy.wrap([1, 2, 3]).each((num, i, array) => {
  return new Cypress.Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, num * 100)
  })
})






/*************************************************************
* Access Element value
************************************************************/




cy.get('.err').should('be.empty').and('be.hidden') // Assert '.err' is empty & hidden

cy.contains('Login').and('be.visible')             // Assert el is visible

cy.get('button').should('have.class', 'active').and('not.be.disabled')

cy
  .get('a')
  .should('contain', 'Edit User') // yields <a>
  .and('be.active')
  .and('have.class', 'active')
  .and('have.attr', 'href')       // yields string value of href
  .and('match', /users/)          // yields string value of href
  .and('not.include', '#')        // yields string value of href
  

  




cy.debug().getCookie('app') // Pause to debug at beginning of commands
cy.get('nav').debug()       // Debug the `get` command's yield
cy.get('a').debug().should('have.attr', 'href')
cy.get('.ls-btn').click({ force: true }).debug()



cy
  .get('.list')
  .find('input[type="checkbox"]')
    .should('be.checked')
    .and('not.be.disabled')
	
	
it('disables on click', () => {
  cy.get('button[type=submit]').as('submitBtn')
  cy.get('@submitBtn').click().should('be.disabled')
})



cy.get('[type="email"]').type('me@email.com').blur() // Blur email input
cy.get('[tabindex="1"]').focus().blur()              // Blur el with tabindex
cy.get('input:first').blur({ force: true })			//Blur the first input
cy.get('[name="comment"]').focus().type('Nice Product!').blur()		//Blur a textarea after typing.



# Check checkbox(es) or radio(s).

Check all checkboxes
cy.get('[type="checkbox"]').check()

Select all radios
cy.get('[type="radio"]').check()

Check the element with id of ‘saveUserName’
cy.get('#saveUserName').check()

cy.get('[type="radio"]').first().check()  // Check first radio element

Select the radio with the value of ‘US’
cy.get('[type="radio"]').check('US')

Check the checkboxes with the values ‘subscribe’ and ‘accept’
cy.get('form input').check(['subscribe', 'accept'])



Check an invisible checkbox
cy.get('.action-checkboxes').should('not.be.visible') // Passes
  .check({ force: true }).should('be.checked')        // Passes


check the element with name of ‘emailUser’
cy.get('form').find('[name="emailUser"]').check()



cy.get('[type="text"]').clear()        // Clear text input
cy.get('textarea').type('Hi!').clear() // Clear textarea
cy.focused().clear()                   // Clear focused input/textarea
cy.get('input[name="name"]').clear().type('Jane Lane')


# Cookie
cy.clearCookie('session_id')
cy.setCookie('foo', 'bar')
cy.clearCookie('foo')
cy.getCookie('foo').should('be.null')






When starting a series of commands:
This queries the entire document for the content.

cy.contains('Log In')
When chained to an existing series of commands
This will query inside of the <#checkout-container> element.

cy.get('#checkout-container').contains('Buy Now')
Be wary of chaining multiple contains
Let’s imagine a scenario where you click a button to delete a user and a dialog appears asking you to confirm this deletion.

// This doesn't work as intended
cy.contains('Delete User').click().contains('Yes, Delete!').click()

cy.contains('Delete User').click()
cy.contains('Yes, Delete!').click()



cy
  .get('p')
  .should('not.be.empty')
  .and(($p) => {
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
  
  
  


cy.location('pathname').then(path => {
    // path is the value from the previous command, `location("pathname").
    //   In our example, the value of `path` is "/articles/5678".
    const articleID = path.split('/')[2];
})
  
  
cy.get('@articleID');
  
  
cy.get('@articleID').then(articleID => {
// do stuff with the articleID
});
  
  
cy.get('@articleID').then(articleID => {
	cy.request(`/api/articles/${articleID}`).then(response => {
	  expect(response.status).to.eq(200);
	  // And any other assertions we want to make with our API response
	});
});
  
  
  
  const w = Cypress.config('viewportWidth')
    const h = Cypress.config('viewportHeight')
    if (!features) {
      features = `width=${w}, height=${h}`
    }
    console.log('openWindow %s "%s"', url, features)
    
    
  cypress%5Cintegration%5CVerifyEddgApplication.js
  
  
  --spec "cypress/integration/VerifyEddgApplication.js"
  
  cy.get('.assertions-link')
    .should('have.class', 'active')
    .and('have.attr', 'href')
    .and('include', 'cypress.io')
    
    
  
  # Implicit and Explicit assertion with Cypress
  // Implicit wait for class to appear
  cy.get("jump to slide 2'",{timeout:60000}).should('have.class','ls-nav-active'); 
  
  
  //Explicit wait
  cy.get("[aria-label='jump to slide 2']",{timeout:60000}).should(($x) => {
         expect($x).to.have.class('ls-nav-active');
  })
  
  
  cy.get('.error').should('be.empty')                    // Assert that '.error' is empty
  cy.contains('Login').should('be.visible')              // Assert that el is visible
  cy.wrap({ foo: 'bar' }).its('foo').should('eq', 'bar') // Assert the 'foo' property equals 'bar'
  
  
  cy
    .get('nav')                       // yields <nav>
    .should('be.visible')             // yields <nav>
    
  
  cy
    .get('nav')                          // yields <nav>
    .should('be.visible')                // yields <nav>
    .should('have.css', 'font-family')   // yields 'sans-serif'
    .and('match', /serif/)               // yields 'sans-serif'
  
  
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  on("task", {
      getContrctID({ newsql }) {
        console.log("%s", newsql);
  
        var config = {  
          server: 'stgdbt.stg.internal',  //update me
          authentication: {
              type: 'default',
              options: {
                trustedConnection: true
              }
          },
          options: {
              // If you are on Microsoft Azure, you need encryption:
              encrypt: true,
              database: 'CORe'  //update me
          }
      }; 
      var connection = new Connection(config);  
      connection.on('connect', function(err) {  
          // If no error, then good to proceed.  
          console.log("CORe");  
          
          request = new Request("SELECT TOP 10 * FROM [Individual].[Individual]", function(err) {  
            if (err) {  
                console.log(err);}  
            });  
            var result = "";  
            request.on('row', function(columns) {  
                columns.forEach(function(column) {  
                  if (column.value === null) {  
                    console.log('NULL');  
                  } else {  
                    result+= column.value + " ";  
                  }  
                });  
                console.log(result);  
                result ="";  
            });  
      
            request.on('done', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');  
            });  
            connection.execSql(request);  
  
      });  
  
        
        
  /*
        const pool = new sql.ConnectionPool({
            server: 'stgdbt.stg.internal', 
            database: 'CORe',
            driver: "msnodesqlv8",
            options: {
                trustedConnection: true
            }
        })
  
        pool.connect().then(() => {
          //simple query
          pool.request().query('SELECT TOP 10 * FROM [Individual].[Individual]', (err, result) => {
                console.dir(result)
            })
        })
      */
        return null;
  
      }
    })
  

    cy.get('div').should('have.text', 'foobarbaz')

cy.get('div').should(($div) => {
  // access the native DOM element
  expect($div.get(0).innerText).to.eq('foobarbaz')
})


cy.get('div').invoke('text').then(parseFloat).should('be.gt', 10)


cy.get('div').should(($div) => {
  const text = $div.text()

  expect(text).to.match(/foo/)
  expect(text).to.include('foo')
  expect(text).not.to.include('bar')
})



cy.get('div').invoke('text').then((text1) => {
  // do more work here

  // click the button which changes the div's text
  cy.get('button').click()

  // grab the div again and compare its previous text
  // to the current text
  cy.get('div').invoke('text').should((text2) => {
    expect(text1).not.to.eq(text2)
  })
})

cy.get('div').should(($div) => {
  // access the native DOM element
  expect($div.get(0).innerText).to.eq('foobarbaz')
})


cy.waitUntilAllAPIFinished();

   cy.get('#xhr-result').should('contain', '"page":1');






cy.title().contains('My App')     // Errors, 'title' does not yield DOM element
cy.getCookies().contains('_key')  // Errors, 'getCookies' does not yield DOM element
cy.get('form').contains('submit the form!').click()

cy.get('form')                  // yields <form>...</form>
  .contains('form', 'Proceed')  // yields <form>...</form>
  .submit()                     // yields <form>...</form>



cy.contains('Log In')

cy.contains('Age').find('input').type('29')

cy.contains(108762).click().contains('Yes, Delete!').click()



cy.setCookie('cookiName', 'someValue');

# Make An Element Visible On The Page
cy.get('.myClass').scrollIntoView();


cy.wait(50);


# Stubbing A Response
cy.route('GET', userSummary, 'fx:responses/user/userSummary\_NonEIP').as('myAlias');
cy.wait(\['@myAlias'\]);


# Disabling Uncaught Exceptions
export function toogleUncaughtException(enabled){
    Cypress.on('uncaught:exception', (err, runnable) => {
        return enabled;
      });
}




//Get me the first instance of '.thething'
cy.get(thething).first
//Get me the third instance of '.thething'
cy.get(thething).eq(2)
//Get me the last instance of '.thething'
cy.get(thething).last




describe('Alt Text Test', () => {
it('should find a particular element, its alt text and check the alt text does not exceed a certain length', function() {
cy.get('.content-wrapper.row-1')
.find('picture')
.find('img')
.first()


it('Visit the app', function () {
    cy.visit('http://localhost:3000')
    cy.wait(3000)
    cy.get('[data-cy="loader"]').should('not.exist');
  }) 
  
  

.should('have.attr', 'alt')
.then(alttext => {
expect(alttext.length).not.to.be.greaterThan(160);
});
// .and('match', /.+/);
});
});
});





it('loads', () => {
  cy.contains('h1', 'todos')
})



  


# How to get the text input field value to a const and log that value in Cypress.io
cy.get('input[name="email"]')
  .invoke('val')
  .then(sometext => cy.log(sometext));
  
#  How to get div 'text' value in Cypress test using jquery
 cy.get(".ibxudA").find('.WildnessText-kRKTej').should('have.text',"Wildnes
cy.contains('Wildness')




cy.get('.mat-paginator')
  .find('.mat-paginator-range-label')
  .should('contain', `20 of ${dataSource.length}`);
  
  
 
cy.route({ method: 'POST', url: '**/graphql', response: manyItems }).as('manyItems');
cy.visit('/items');
cy.wait(['@manyItems'], { requestTimeout: 10000 });


cy.get('.mat-paginator')
  .find('button.mat-paginator-next')
  .click();

 
 cy.get('.s-item').find('.s-item__price').each(($el) => {
    expect(parseFloat($el.text().replace(/\$/g, ''))).to.be.greaterThan(40)
        .but.to.be.lessThan(100);
 )}


# Page Object


          
import LoginPage from "./ObjectModel/LoginPage"

describe('home page', () => {
    it('loginPage', function () {
        const lp = new LoginPage()
    })
}


class LoginPage {
    visit(){
        cy.visit('https://facebook.com');
    }

    fillEmail(value){
        const feild = cy.get('#email')
        feild.clear()
        feild.type(value)
        return this
    }
    
    fillPassword(value){
        const feild = cy.get('#pass')
        feild.clear()
        feild.type(value)
        return this
    }
    
    submit(){
        const button = cy.get('#u_0_b')
        button.click()
    }
}

export default LoginPage;




 cy.get('.s-item').find('.s-item__price').each(($el) => {
    expect(parseFloat($el.text().replace(/\$/g, ''))).to.be.greaterThan(40)
        .but.to.be.lessThan(100);
 )}
 
 
 
 Cypress get specific text
 
 
 cy.get('[for="prod-field"]').should(($el) => {
  expect(
    $el
      .contents() // Grab all contents
      .first() // The text node you're looking for
      .text() // Get the text
      .trim() // And trim the white space
  ).to.eq('Project');
});


<label for="prod-field"
  ><span class="label-text">Project</span>>
  <span class="aui-icon">Required</span>
</label>

cy.get('[for="prod-field"] .label-text').should('have.text', 'Project');




# How to assert if this text contain at least one words from one statement in cypress
Use regular expression
cy.get(".stitle").contains(/(learning|table)/i);


<p class="stitle">
  learning Lorem ipsum, dolor sit amet consectetur adipisicing elit.
  Dolor, in nulla dolores vero autem cum vitae. Eaque ipsum, numquam, ea
  nam iste a quaerat excepturi facilis praesentium repellendus laudantium
  blanditiis.
</p>
 
 
# get child element in cypress

<ul tag-test="tab">
  <li>1</li>
  <li>2</li>
  <li>3</li>        // test should find this one
</ul>

<ul tag-test="another">
  <li>4</li>
  <li>5</li>
  <li>6</li>        // test should ignore this one
</ul>


the test could be

cy.get('ul[tag-test=tab]')
  .find('li:last-child')     // use find here to restrict search to previous subject
  .contains('3')
or to grab the jQuery object

cy.get('ul[tag-test=tab]')
  .find('li:last-child')
  .then($lastLI => {
    expect($lastLI).to.contain(3)
  })
  
  
 # How to find element and select by cypress.io with vue.js v-select?
 <v-select
      label="label"
      v-model="ccRcode"
      ref="ccRcode"
      :items="getData"
      item-text="descWithCode"
      item-value="code"
      value="{ ccRcode }"
      data-cy='select-input'
></v-select>
And then in your test:

cy.get('[data-cy=select-input]').select('optionValue')





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



# How to get div 'text' value in Cypress test using jquery
cy.get(".ibxudA").find('.WildnessText-kRKTej').should('have.text',"Wildness")


# how to find by text content?
cy.get('YOUR_BUTTON_CLASS').contains('Customer');




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


How will we call a function written in a separate file from a Cypress test?

Put this in your support/commands.js file:

Cypress.Commands.add('subValues', (a, b) => { return a - b });
Put this in your support/index.js file, if it isn't already there (it should be):

import "./commands";
Call it in your test like so:

describe ('Calling a function', function(){
  it('Call the Subtract function and asert the calculation', function(){
    cy
      .subValues(15, 8)
      .should('eq', 7) // true        
    });
});


# Checking radio buttons in Cypress

cy.get('[type="radio"].XyzTypeRadio').check("2")

cy.get('[type="radio"].XyzTypeRadio').first().check()


# Debugging Cypress tests in Visual Studio Code


# Anyway to test for specific scroll amount?
cy.window().then(($window) => {
  expect($window.scrollY).to.be.closeTo(400, 100);
});


#How can I use cypress to assert that an image is the correct one?
cy.visit(URL);
cy.get('your_selector').should('have.attr', 'href', '/your_picture_href')


# How can I check URL content with cypress
const path = 'user/survey';

cy.url().then(($url) => {
    if($url.includes(path)) {
        cy.log("Yes")
    } else  {
        cy.log("No")
      }
})


# How to test file inputs with Cypress?
it('Testing picture uploading', () => {
    cy.fixture('testPicture.png').then(fileContent => {
        cy.get('input[type="file"]').attachFile({
            fileContent: fileContent.toString(),
            fileName: 'testPicture.png',
            mimeType: 'image/png'
        });
    });
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


# What is the difference between cy.readFile and cy.fixture in Cypress.io?
cy.readFile('path/to/test.png', 'base64').then(text => {
    console.log(text); // Outputs a base64 string to the console
});

cy.fixture('path/to/test.png', 'base64').then(text => {
    console.log(text); // Outputs the same base64 string to the console
});

# How to check if element exists using Cypress.io

    cy.get("body").then($body => {
        if ($body.find("button[data-cy=appDrawerOpener]").length > 0) {   //evaluates as true
            cy.get("button[data-cy=appDrawerOpener]")
            .click();
        }
    
----------------------------
function setup() {
  cy.wrap(app.clearDatabase()).then(() => console.log('got to 1'));
  cy.wrap(app.makeDatabase()).then(() => console.log('got to 2'));
}
beforeEach(() => {
  setup();
  cy.visit('/');
});
--------------------------	

// This is where I overwrite all of the console methods.
    ['log', 'info', 'error', 'warn', 'debug'].forEach((consoleProperty) => {
      appWindow.console[consoleProperty] = function (...args) {
	  
	  };
	



      





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
  
  
  cy.get('button').then(($btn) => {
    // inspect $btn <object>
    debugger
  
    cy.get('#countries').select('USA').then(($select) => {
      // inspect $select <object>
      debugger
  
      cy.url().should((url) => {
        // inspect the url <string>
        debugger
  
        $btn    // is still available
        $select // is still available too
      })
    })
  })
  
  
  
  // app code
  let count = 0
  
  $('button').on('click', () => {
    $('#num').text(count += 1)
  })
  
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

  

  