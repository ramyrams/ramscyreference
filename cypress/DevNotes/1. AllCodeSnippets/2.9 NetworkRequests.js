/********************************************************************************************
* ? server : route : request : spy : stub : clock : tick
*********************************************************************************************/
// * Examples: XHRHandling.js



//**************************** #Server **********************************************
// delay each route's response 1500ms
  cy.server({  delay: 1500   });

  //Send 404s on unmatched requests
  cy.server({ force404: true })

  //Change the default response headers for all routes
  cy.server({
    headers: {
      'x-token': 'abc-123-foo-bar'
    }
  })

  //Change defaults for cy.route()
  cy.server({
    method: 'POST',
    delay: 1000,
    status: 422,
    response: {}
  })

  //Set a custom request header for all requests
  cy.server({
    onAnyRequest: (route,  proxy) => {
      proxy.xhr.setRequestHeader('CUSTOM-HEADER',  'Header value')
    }
  })

  //Change the default filtering
  The default filter function in Cypress is:

const whitelist = (xhr) => {
  // this function receives the xhr object in question and
  // will filter if it's a GET that appears to be a static resource
  return xhr.method === 'GET' && /\.(jsx?|html|css)(\?.*)?$/.test(xhr.url)
}
You can override this function with your own specific logic:

cy.server({
  whitelist: (xhr) => {
    // specify your own function that should return
    // truthy if you want this xhr to be ignored,
    // not logged, and not stubbed.
  }
})


//Turn off the server after you’ve started it
cy.server({ enable: false })


 
  // Give an alias to request
  cy.server().route('GET', '/odata/locations/**').as('dataGetFirst');

//**************************** #route **********************************************

  // set up AJAX call interception
  cy.route("POST", "**/api/users").as("signup-request");

  // Give an alias to request
  cy.server().route('GET', 'https://conduit.productionready.io/api/articles?limit=10&offset=0').as('dataGetFirst');

  // spy on POST requests to /myApi endpoint
  cy.server().route({ method: 'POST', url: '/myApi'}).as('apiCheck')
  
  cy.route({  url: '/todos',   delay: 2000,   response: []  }).as('loading')

  cy.route({    method: "POST",   url: Cypress.env('GRAPHQL_API'),   }).as("graphql");
  
  cy.route('/users/**')

  cy.route('**/users').as('getUsers')
  cy.wait('@getUsers')

  //Wait on XHR’s matching method and url
  cy.route('POST', '**/users').as('postUser')

  //Match route against any UserId
  cy.route('**/users/*/comments')
  // https://localhost:7777/users/123/comments     <-- matches
  // https://localhost:7777/users/123/comments/465 <-- does not match


  //Use glob to match all segments
  cy.server().route('**/posts/**')
  // https://localhost:7777/posts/1            <-- matches
  // https://localhost:7777/posts/foo/bar/baz  <-- matches
  // https://localhost:7777/posts/quuz?a=b&1=2 <-- matches

  //With Stubbing
  cy.route('https://localhost:7777/surveys/customer?email=john@doe.com', [
    {
      id: 1,
      name: 'john'
    }
  ])  


  //url as a RegExp
  cy.route(/users\/\d+/, { id: 1, name: 'Phoebe' })
    const commentsResponse = (routeData) => {
      //routeData is a reference to the current route's information
      return {
        data: someOtherFunction(routeData)
      }
  }
  
  cy.route('POST', '**/comments', commentsResponse)

  //Response functions


  cy.wait('@getLogin').then(function(xhr){
    const response = xhr.responseBody
    expect(response[0]).to.have.property('LineName', 'Line A')
    
    // / Cypress supports lodash.
    const obj1Values = Cypress._.values(response[0])
    expect(obj1Values).to.deep.eq([16176, "Line A", "A-0300/0350 801"])
  })


  //Fixtures
  //Instead of writing a response inline you can automatically connect a response with a cy.fixture()
  cy.route('**/posts/*', 'fixture:logo.png').as('getLogo')
  cy.route('**/users', 'fixture:users/all.json').as('getUsers')
  cy.route('**/admin', 'fx:users/admin.json').as('getAdmin')


  cy.route({
    method: 'DELETE',
    url: '**/user/*',
    status: 412,
    response: {
      rolesCount: 2
    },
    delay: 500,
    headers: {
      'X-Token': null
    },
    onRequest: (xhr) => {
      // do something with the
      // raw XHR object when the
      // request initially goes out
    },
    onResponse: (xhr) => {
      // do something with the
      // raw XHR object when the
      // response comes back
    }
  })


  //Simulate a server redirect
  cy.route({
    method: 'POST',
    url: '**/login',
    response: {
      // simulate a redirect to another page
      redirect: '/error'
    }
  })


//**************************** #wait **********************************************

  
  // Wait for response.status to be 200
  cy.wait('@dataGetFirst').its('status').should('be', 404);

    
  cy.wait('@todos') // wait for `GET /todos` response
  // inspect the server's response
  .its('response.body')
  .should('have.length', 0)
  
  cy.wait('@call').then((xhr)=>
  {
      //assert returned status code ===200
  }

     // we cannot guarantee the order of XHR requests - they really depend on the
  // server response speed. Sometimes a later request finishes first.
  // all we can say that each request should receive a response with
  // id equal to 101 or 102
  cy.get('@post.1').its('response.body.id').should('be.oneOf', [101, 102])
  cy.get('@post.2').its('response.body.id').should('be.oneOf', [101, 102])
 

  // tip: log the request object to see everything it has in the console
  cy.get('@post').then(console.log)
  
  // you can retrieve the XHR multiple times - returns the same object
  // confirm the request status
  cy.get('@post').should('have.property', 'status', 201)
    
  // cy.get does NOT work
  // because it immediately returns null object,
  // since the request has not happened yet
  cy.get('@post').should('have.property', 'status', 201)
  
  // alternative: use "requestBody" alias to "request.body" property access
  cy.get('@post').its('requestBody').should('have.property', 'title', 'example post')
  
  // let's confirm the request sent to the server
  cy.get('@post').its('request.body').should('deep.equal', {
    title: 'example post',
    body: 'this is a post sent to the server',
    userId: 1
  })
  

  
  cy.wait('@apiCheck').then((xhr) => {
    assert.isNotNull(xhr.response.body.data, '1st API call has data')
  })
  
  //Tip: you can inspect the full XHR object by logging it to the console
  cy.wait('@new-user').then(console.log)
  
  cy.wait("@signup-request").should(xhr => {
    console.log(JSON.stringify(xhr));
  });

  // this yields us the XHR object which includes
  // fields for request, response, url, method, etc
  cy.wait('@getSearch').its('url').should('include', '/search?query=Book')
  
  
  // trigger network calls by manipulating web app's user interface, then
  cy.wait('@new-user').should('have.property', 'status', 201)
  
  cy.wait('@post').then((xhr1) => {
    // ask for the XHR again using cy.get
    // by now it has happened for sure,
    // and cy.get should yield same XHR object
    cy.get('@post').then((xhr2) => {
      expect(xhr1, 'same XHR').to.equal(xhr2)
    })
  })
  
  
  // we can grab the completed XHR object again to run more assertions
  // using cy.get(<alias>)
  cy.get('@new-user') // yields the same XHR object
    .its('requestBody') // alternative: its('request.body')
    .should('deep.equal', {
    id: '101',
    firstName: 'Joe',
    lastName: 'Black'
  })
  
  // and we can place multiple assertions in a single "should" callback
  cy.get('@new-user')
  .should((xhr) => {
    expect(xhr.url).to.match(/\/users$/)
    expect(xhr.method).to.equal('POST')
    // it is a good practice to add assertion messages
    // as the 2nd argument to expect()
    expect(xhr.response.headers, 'response headers').to.include({
      'cache-control': 'no-cache',
      expires: '-1',
      'content-type': 'application/json; charset=utf-8',
      location: '<domain>/users/101'
    })
  })
  
  

  
  // we cannot chain any more assertions to the above request object
  // because the "have.property" assertion yields the property's value
  // so let's just grab the request object again and run multiple assertions
  cy.get('@post').should((req) => {
    expect(req.method).to.equal('POST')
    expect(req.url).to.match(/\/posts$/)
    // it is good practice to add message to the assertion
    expect(req, 'has duration in ms').to.have.property('duration').and.be.a('number')
  })
  
  // before the request goes out we need to set up spying
  // see https://on.cypress.io/network-requests
  cy.server()
  cy.route('POST', '/posts').as('post')
  
  // https://on.cypress.io/wait
  cy.wait('@post').should((xhr) => {
    expect(xhr.status, 'successful POST').to.equal(201)
    expect(xhr.url, 'post url').to.match(/\/posts$/)
    // assert any other XHR properties
  })
  
  // if you need to assert again, retrieve the same XHR object
  // using cy.get(<alias>) - because by now the request has happened
  cy.get('@post').its('request.body').should('deep.equal', {
    title: 'example post',
    body: 'this is a post sent to the server',
    userId: 1,
  })
  
  
  // get the same request object again and confirm the response
  cy.get('@post').its('response').then((res) => {
    // because the response object is not going to change
    // we can use cy.then() callback to run assertions just once
    // without retrying
    // see https://on.cypress.io/then and https://on.cypress.io/retry-ability
    expect(res.headers).to.include({
      'cache-control': 'no-cache',
      expires: '-1',
      'content-type': 'application/json; charset=utf-8',
      location: 'http://jsonplaceholder.cypress.io/posts/101',
  })
  
    // it is a good practice to add message argument to the
    // assertion "expect(value, message)..." that will be shown
    // in the test runner's command log
    expect(res.body, 'response body').to.deep.equal({
      body: 'this is a post sent to the server',
      id: 101,
      title: 'example post',
      userId: 1
    })
  })
  
  
  // there are two XHR calls matching our route
  // wait for both to complete
  cy.wait('@post').wait('@post')
  
  // we can retrieve all matching requests using the following syntax
  // cy.get('<alias>.all')
  cy.get('@post.all').should('have.length', 2)
    .then((xhrs) => {
    // xhrs is an array of network call objects
    expect(xhrs[0], 'first request status').to.have.property('status', 201)
    expect(xhrs[1], 'second request status').to.have.property('status', 201)
  })
  
  // and we can make assertions about each separate call
  // by retrieving it like this (index starts with 1)
  // cy.get('<alias>.<index>')
  cy.get('@post.1').should((xhr1) => {
   expect(xhr1, 'first request').to.have.property('status', 201)
  })
  

  
  

  
  cy.wait('@new-item')
  .its('response.body')
  .should('have.contain', {
  title: 'test api',
  completed: false
  })
  
  

  
  
  
  it('shows loading element', () => {
    // delay XHR to "/todos" by a few seconds
    // and respond with an empty list
    cy.server()
    cy.route({
      url: '/todos',
      delay: 2000,
      response: []
    }).as('loading')

    cy.visit('/')
    
    // shows Loading element
    cy.get('.loading').should('be.visible')
    
    // wait for the network call to complete
    cy.wait('@loading')
    
    // now the Loading element should go away
    cy.get('.loading').should('not.be.visible')

  })
  
  it('handles todos with blank title', () => {
    cy.server()
    cy.route('/todos', [  
      {
        id: '123',
        title: ' ',
        completed: false
      }
    ])
    
    cy.visit('/')

    cy.get('li.todo')
    .should('have.length', 1)
    .first()
    .should('not.have.class', 'completed')
    .find('label')
    .should('have.text', ' ')
  })
  
  
  
  it('handles 404 when loading todos', () => {
    // when the app tries to load items
    // set it up to fail
    cy.server()
    cy.route({
      url: '/todos',
      response: 'test does not allow it',
      status: 404,
      delay: 2000
    })

    cy.visit('/', {
      // spy on console.error because we expect app would
      // print the error message there
      onBeforeLoad: win => {
        cy.spy(win.console, 'error').as('console-error')
      }
    })

    // observe external effect from the app - console.error(...)
    cy.get('@console-error').should(
      'have.been.calledWithExactly',
      'test does not allow it'
    )
  })
  
  
  #Stub network call
  // instead of just spying on XHR call, let's return some mock data
  // returns an empty list
  // when `GET /todos` is requested
  cy.route('GET', '/todos', [])
  
  
  it(`filters the data by 'price'`, () => {
  cy.server()
  cy.route('POST', 'http://my-api.biz/api').as('apiRequest')
  
  cy.visit('/')
  
  // initial page load loads the min and max price bounds for the UI,
  // as well as the data to initially populate the page. they happen
  // to hit the same URL with different POST params
  cy.wait(['@apiRequest', '@apiRequest'])
  
  cy.get('#price-filter-min').type('1000')
  cy.get('#price-filter-max').type('1400')
  
  // wait for data to get refreshed
  cy.wait('@apiRequest')
  
  cy
  .get('[data-test-column="price"]')
  .each($el => {
      const value = parseFloat($el.text())
      expect(value).to.be.gte(1000)
      expect(value).to.be.lte(1400)
    })
  })
  
  
  
  function waitForResourceToLoad(fileName, type) {
    const resourceCheckInterval = 40;
    
    return new Cypress.Promise(resolve => {
    const checkIfResourceHasBeenLoaded = () => {
    const resource = cy.state('window')
    .performance.getEntriesByType('resource')
    .filter(entry => !type || entry.initiatorType === type)
    .find(entry => entry.name.includes(fileName));
    
    if (resource) {
    resolve();
    
    return;
  }
  
  setTimeout(checkIfResourceHasBeenLoaded, resourceCheckInterval);

  
  checkIfResourceHasBeenLoaded();
  
  Cypress.Commands.add('waitForResource', waitForResource);
  
  
  cy.waitForResourceToLoad('dynamicly-loaded-bundle.js', 'script');
  
  cy.waitForResourceToLoad('below-the-fold.css');
  
  
  
  describe('Capture browser network traffic', function () {
    context('Login functionality', () => {
      it('Dscro should be able to login', () => {
          cy.server()
          
          //This is the post call we are interested in capturing
          cy.route('POST', 'https://loginservice.example.net/login/json/authenticate').as('login')
          
          cy.visit('https://example.net/login')
          
          cy.get('#email').type('tester@gmail.com')
          cy.get('#password').type('Passw0rd1')
          cy.get('button[type=submit]').click()
          cy.wait('@login')
          
          //Assert on XHR
          cy.get('@login').then(function (xhr) {
          expect(xhr.status).to.eq(200)
          expect(xhr.requestHeaders).to.have.property('Content-Type')
          expect(xhr.requestHeaders).to.have.property('X-Password', 'Passw0rd1')
          expect(xhr.method).to.eq('POST')
          expect(xhr.responseBody).to.have.property('tokenId')
        })
      })
    })
  })
  
  
  
  
  
  
  
  
  context("Signup flow", () => {
    it("The happy path should work", () => {
        const random = Math.floor(Math.random() * 100000);
        const user = {
        username: `Tester${random}`,
        email: `user+${random}@realworld.io`,
        password: "mysupersecretpassword"
      };
      // set up AJAX call interception
      cy.server();
      cy.route("POST", "**/api/users").as("signup-request");
      
      cy.visit(paths.register);
      
      // form filling
      cy.findByPlaceholderText(strings.username).type(user.username);
      cy.findByPlaceholderText(strings.email).type(user.email);
      cy.findByPlaceholderText(strings.password).type(user.password);
      
      // form submit...
      cy.get("form")
      .within(() => cy.findByText(strings.signUp))
      .click();
      
      // ... and AJAX call waiting
      cy.wait("@signup-request").should(xhr => {
      let payload;
      
      // request check
      expect(xhr.request.body)
      .to.have.property("user")
      .and.to.be.a("object");
      payload = xhr.request.body.user;
      expect(payload).to.have.property("username", user.username);
      expect(payload).to.have.property("email", user.email);
      expect(payload).to.have.property("password", user.password);
      
      // status check
      expect(xhr.status).to.equal(200);
      
      // response check
      expect(xhr.response.body)
        .to.have.property("user")
        .and.to.be.a("object");
        payload = xhr.response.body.user;
        expect(payload).to.have.property("username", user.username.toLowerCase());
        expect(payload).to.have.property("email", user.email);
        expect(payload)
        .to.have.property("token")
        .and.to.be.a("string").and.not.to.be.empty;
      });
      
      // end of the flow
      cy.findByText(noArticles).should("be.visible");
    });
  });
  
  
  
  cy.wait("@signup-request").should(xhr => {
    expect(xhr.request.body).deep.equal({
      user: {
      username: user.username,
      email: user.email,
      password: user.password
    }
  });
  
  expect(xhr.status).to.equal(200);
  
  cy.wrap(xhr.response.body)
  .should("have.property", "user")
  .and(
    user =>
    expect(user)
    .to.have.property("token")
    .and.to.be.a("string").and.not.to.be.empty
  )
  .and("deep.include", {
      username: user.username.toLowerCase(),
      email: user.email
    });
  });
 



cy.route({ method: 'POST', url: '**/graphql', response: manyItems }).as('manyItems');
cy.visit('/items');
cy.wait(['@manyItems'], { requestTimeout: 10000 });



# Stubbing A Response
cy.route('GET', userSummary, 'fx:responses/user/userSummary\_NonEIP').as('myAlias');
cy.wait(\['@myAlias'\]);




/* If you’ve ever used Selenium or any other web driver-based end-to-end testing framework, you might have used something like waitForSelector, 
which tells orders to wait for an element to show up and then to make an action. With Cypress, instead of waitForSelector, we have a better thing called waitForResponse. 
What this means is that we listen for a network request and when it’s processed, check for an update on the page.
In the following example, we submit a feedback form and wait for an AJAX call. A confirmation message is then shown as a result: */

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
    

    # First attempt to mock response data 
    
    context('TODO app tests', () => {
    
      describe('Requests mocking', () => {
    
        it('Mocking GET response', () => {
     
          //Array which stores mocked payload. 
          let tasksToAdd = []
          //Variable which stores number of tasks to mock
          let numberOfTasksToAdd = 10
          let taskNumber=0
          //Loops which creates expected number of tasks. 
          while (taskNumber < numberOfTasksToAdd) {
            //Variable which stores randomly generated boolean. 
            //This boolean will be used as value for key "completed". 
            //Since it is random, mocked taska will have different values for 
            key "completed"
            let completedValue = Cypress._.sample([true, false])
            //Increase task number
            taskNumber += 1;
            //Variable which stores single task
            let task = {"text": "mocking backend" + taskNumber, "completed": 
            completedValue, "id": taskNumber};
            //Adding task to the array. 
            tasksToAdd.push(task);
          }
      
          cy.server();
          //cy.route mock GET request and its response stored in the variable.
          //Route is aliased so that we can wait for it. 
          cy.route('http://localhost:3000/api/todos', tasksToAdd)
          .as('expandedTodoList')
    
          cy.visit('http://localhost:5000/')
          //Waiting for route to load. 
          cy.wait('@expandedTodoList')
          //Assert if list of tasks contains expected number of mocked elements. 
          cy.get('.todo-list').children().should('have.length', 
          numberOfTasksToAdd)
        })
      })
    })
    
    
    # new API tests + refactoring

  context("Test simple Flask app API", () => {

  const initialUsers = [{
    "username": "intialUser1",
    "password": "initialPassword1"
  }, {
    "username": "intialUser2",
    "password": "initialPassword2"
  }]


const addInitialUsers = () => {
    initialUsers.forEach(addUser)
  }

  const getUsers = () =>
    cy.request({ url: '/users' }).its('body.users');

  const addUser = user =>
    cy.request({
      url: '/register',
      method: 'POST',
      body: user,
    })

  const deleteUser = user =>
    cy.request({
      url: `/users/${user.username}`,
      method: 'DELETE'
    }).then((res) => {
      expect(res.status).to.eq(200)
    })

  const deleteAllUsers = () => {
    getUsers().each(deleteUser)
  }

  const reset = () => {
    deleteAllUsers();
  }

  //after and before hooks
  beforeEach(addInitialUsers)
  afterEach(reset)

  it('Initial 2 Users are loaded', () => {
    getUsers().should('have.length', 2)
  })

  it('Each user has expected properties', () => {
    getUsers().each(value =>
      expect(value).to.have.all.keys('id', 'username', 'password'))
  })

  it('Returns JSON', () => {
    cy.request('/users').its('headers').its('content- type').should('include', 'application/json')
  })

  //Test which adds a new User and deletes it. 
  it('Adds User and deletes the same User', () => {

    const randomNumber = Cypress._.random(0, 10000);
    const user = { "username": "user" + randomNumber, "password": "1234" + 
    randomNumber };

    addUser(user);
    getUsers().then((res) => {
      //Assert Users array length to verify if new User was added
      expect(res).have.length(3);
      //Assert property of the last User (username) in the array, 
      //to verify if it is in accordance with the new user property. 
      expect(res.slice(-1)[0]).have.property('username', user.username)
    })

    deleteUser(user);
    getUsers().then((res) => {
      //Assert Users array length to verify if new User was removed
      expect(res).have.length(2);
        //Assert property of the last User (username) in the array, 
      //to verify if it is't in acchoradnce with the new user property. 
      expect(res.slice(-1)[0]).not.have.property('username', user.username)
    })
  })
    
      it("Doesn't accept duplicated Users", () => {
    
        const user = { "username": "user", "password": "1234" };
    
        addUser(user);
        //Add the same user (user) again and assert if request failes (status 
         code:400)
        cy.request({
          url: '/register',
          method: 'POST',
          body: user,
          failOnStatusCode: false
        }).then((res => {
          expect(res.status).to.eq(400)
        }))
        //Asserts length of the array of users to verify
        //if duplicated user wasn't added
        getUsers().then((res => {
          expect(res).have.length(3);
        }))
      })
    })
    
    
     
    
    
    
    
# stub POST, PUT, DELETE requests
    
    it('POST /todos -  task adding request stubbing', () => {
          //Variable to store new task text. 
          const newTodo = 'Stubbing crazy POST';
          //Variable to store new task id.
          const newTodoId = 100;
          
          //cy.route to manage POST request and its response content.
          cy.route({
            method: 'POST',
            url: '/api/todos',
            response: { id: newTodoId, name: newTodo, isComplete: false }
          }).as('postNewTodo');
    
          //Get app UI element to add/type new task. Send 'enter'.
          cy.get('.new-todo').type(newTodo).type('{enter}');
          //Wait for stubbed POST response.
          cy.wait('@postNewTodo');
        })
    
        it('PUT /todos - task update request stubbing', () => {
          //Variable to store updated task name. 
          const updatedTODO = 'updated crazy todo'
          
          //cy.route to manage PUT request and its response content.
          cy.route({
            method: 'PUT',
            url: 'api/todos/1',
            response: { id: 1, name: updatedTODO, isComplete: false }
          }).as('todoUpdate')
          //Get first task availabe and double click.
          cy.get('.view').first().find('label').dblclick()
          //Get task in 'edit' state, clear current text and enter new text. 
          cy.get('.edit').clear().type(updatedTODO).type('{enter}')
          //Wait for stubbed PUT response. 
          cy.wait('@todoUpdate')
        })
    
        it('DELETE /todos - task deleting request stubbing', () => {
          //cy.route to manage DELETE request and its response content.
          cy.route({
            method: 'DELETE',
            url: 'api/todos/1',
            response: {}
          }).as('todoDeletion')
          
          //Get UI elements - task and its destroy button and click it. 
          cy.get('.view').first().find('button').click({ force: true })
          //Wait for stubbed DELETE response. 
          cy.wait('@todoDeletion')
        })
        