/**********************************************************
* ? get : within : root : wait : as 
***********************************************************/


/******************************************************************
* #get
*******************************************************************/

//get by id
cy.get('#email')

//get by class
cy.get('.query-btn')

cy.get('input[name="firstName"]')

cy.get('#querying .well>button:first')

cy.get('input')


//Find the first li descendent within a ul
cy.get('ul li:first').should('have.class', 'active')

cy.contains(ContractID).click()  

cy.contains('Submit').click()

//Find the dropdown-menu and click it
cy.get('.dropdown-menu').click()

//Find 5 elements with the given data attribute
cy.get('[data-test-id="test-example"]').should('have.length', 5)

//Find the link with an href attribute containing the word “questions” and click it
cy.get('a[href*="questions"]').click()

cy.get('form').within(() => {
    cy.get('input').type('Pamela') // Only yield inputs within form
    cy.get('textarea').type('is a developer') // Only yield textareas within form
  })

  cy.get(".fileUpload > input:nth-child(1)").invoke('val')
  .then(sometext => cy.log(sometext));


  cy.get('button[type=submit]')).as('todos')

  //...hack hack hack...
  
  //later retrieve the todos
  cy.get('@todos')


  // Worst - too generic, no context
  cy.get('button').click()

  // Bad. Coupled to styling. Highly subject to change.
  cy.get('.btn.btn-large').click()

  // Average. Coupled to the `name` attribute which has HTML semantics.
  cy.get('[name=submission]').click()

  // Better. But still coupled to styling or JS event listeners.
  cy.get('#main').click()

  // Slightly better. Uses an ID but also ensures the element
  // has an ARIA role attribute
  cy.get('#main[role=button]').click()

  // Much better. But still coupled to text content that may change.
  cy.contains('Submit').click()

  // Best. Insulated from all changes.
  cy.get('[data-cy=submit]').click()

  cy.get('#query-btn').should('contain', 'Button')

  cy.get('.query-btn').should('contain', 'Button')

  cy.get('#querying .well>button:first').should('contain', 'Button')

  cy.get('[data-test-id="test-example"]').should('have.class', 'example')


  cy.get('div').should(($div) => {
    // access the native DOM element
    expect($div.get(0).innerText).to.eq('foobarbaz')
  })
  
  
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

   
 cy.get('.s-item').find('.s-item__price').each(($el) => {
  expect(parseFloat($el.text().replace(/\$/g, ''))).to.be.greaterThan(40)
      .but.to.be.lessThan(100);
)}


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


Specify logging as false. Moreover, it will skip the command output printing on the Cypress Test runners console.
cy.get('input',{ log: false })

Wait for an explicit timeout
cy.get('input',{ timeout: 1000 }) // It will wait for 1000ms before timing out



How to access multiple values returned by “get()” command?
<ul>
  <input>Cypress</input>
  <input>Cucumber</input>
  <input>Gherkin</input>
  <input>JBehave</input>
  <input>BDD</input>
</ul>
cy.get('input').eq(1).should('contain', 'Cucumber')

# How to chain other Cypress commands with “get()” command
cy.get('.mobile-nav', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Home')

 //Verify number of items present on Widget Tab
    cy.get('.demo-frame > ul > li').should('have.length',19);
 
    //Verify number of items having keyboard as text on Widgets Tab
    //Get and Find Command (Parent - Child Relationship)
 
    cy.get('.demo-frame > ul > li').find('[href*=keyboard]').should('have.length',2);


# How to check if element exists using Cypress.io

    cy.get("body").then($body => {
        if ($body.find("button[data-cy=appDrawerOpener]").length > 0) {   //evaluates as true
            cy.get("button[data-cy=appDrawerOpener]").click();
        }





/******************************************************************
* #wait
*******************************************************************/

//Wait for an arbitrary period of milliseconds:
cy.wait(2000) // wait for 2 seconds

cy.get('div').wait(2000)

cy.wait('@getProfile')

// Implicit wait for class to appear
cy.get("jump to slide 2'",{timeout:60000}).should('have.class','ls-nav-active'); 

//Explicit wait
cy.get("[aria-label='jump to slide 2']",{timeout:60000}).should(($x) => {
      expect($x).to.have.class('ls-nav-active');
})

// # Wait for API to get complete
cy.wait('@getSumOfNumbersAPI').should((xhr) => {
  expect(xhr.status).to.equal(200);
  const { sum } = xhr.response.body;

  // * Verify we get the correct sum
  cy.findByLabelText('Sum of number').should('have.value', sum);
});



// Use this plugin to wait for everything not expected by Cypress wait.  
https://www.npmjs.com/package/cypress-wait-until


describe('Login test', function () {

  it("Test description", () => {
      cy.server();
  
  
      cy.route({
          method: "POST",
          url: '/login'
      }).as("login");
  
      cy.wait("@login", {timeout: 15000});
  
      cy.visit("login");
  
      cy.get('#username')
          .type(Cypress.env('Account'));
  
      cy.get('#password')
          .type(Cypress.env('Password'));
  
      cy.get('#login')
          .click();
  
      cy.get("@login").then(xhr => {
          cy.log(JSON.stringity(xhr.response.body));
      });
  
  });
  
  });
  

/******************************************************************
* #within
*******************************************************************/


/******************************************************************
* #root
*******************************************************************/



/******************************************************************
* #as
*******************************************************************/  