// *************************** Example ************************
Common testing scenarios:
Asserting on the body of a request.
Asserting on a url of a request
Asserting on the headers of a request.
Stubbing the body of a response.
Stubbing the status code of a response.
Stubbing the headers of a response
Delaying a response
Waiting for a particular response to happen



cy.server().route('POST', '/ECLWeb/ECL/Upload/**').as('PostECLUpload')

cy.get("#cmdUpload").click()

cy.wait('@PostECLUpload')

cy  
  .get('@PostECLUpload')
  .then((xhr) => {
     
    cy.log("This should print in the runner log") 
    cy.log(JSON.stringify(xhr.response.body))

    console.log("This logs in DevTools Console Log")
    console.log(xhr.id)
    console.log(xhr.status)
    console.log(xhr.method)
    console.log(xhr.statustext)
    console.log(xhr.duration)
    console.log(xhr.url)

    console.log(xhr.response.body) // it is same as xhr.responseBody
    console.log(xhr.response.headers)
  
    const response = xhr.responseBody
    console.log(response)

    expect(xhr.method).to.equal('POST')
    expect(xhr.status).to.equal(200)

    expect(response).to.have.property('IsSuccessFul', true)
    expect(response).to.have.property('DocName', "test.pdf")

})

// *************************** CORS possiblity ************************
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



let requestStarted = false; // will be set to true when the XHR request starts
cy.route({
  method: 'POST',
  url: '\*\*/pointcommands',
  onRequest: () => (requestStarted = true)
}).as('sendCommand');

cy.get(".marengo-ok").as("button");

cy.waitUntil(() =>
    cy
    .get("@button")
    .should('be.visible')
    .click()
    .then(() => requestStarted === true)
, {
  timeout: 10000,
  interval: 1000,
  errorMsg: 'POST not sent `enter code here`within time limit'
});

cy.wait("@sendCommand");




cy.waitUntil(function() {
  return cy.get('element').should('not.exist');
}