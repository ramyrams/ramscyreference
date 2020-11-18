Test/Suite Options
users can add test configuration in object during test/suite declaration:
it('can test with config', {
    defaultCommandTimeout: 200
  }, () => {
    // test body
  })
run test only in certain browsers:
it('only runs in ff', {
    browser: 'firefox'
  }, () => {
  })
api for excluding browsers:
it('does not run in ff', {
    browser: '!firefox'
  }, () => {})
can apply same options for the whole suite:
describe('suite with config', {
    defaultCommandTimeout: 40
  }, () => {
	// all tests declared here will inherit the config
  })


# Before
Cypress.isBrowser('firefox')
Cypress.isBrowser({ family: 'chromium', channel: 'stable' })

# After (can also check these things)
Cypress.isBrowser('!chrome')
Cypress.isBrowser(['electron', 'chrome'])
Cypress.isBrowser(['!electron', '!chrome'])
Cypress.isBrowser([
  { family: 'chromium', channel: 'canary' },
  { family: 'firefox', channel: 'dev' }
])

it("should contain a form element", () => {
  const form = cy.get("form");
  form.should("exist");
  form.get('input#username').should('exist');
  form.get('input#password').should('exist');
  form.get('button[type="submit"]').should('exist');
});

it("should send http request with login payload when submit button clicked", () => {
  cy.server();
  cy.route("POST", "/submit").as("submit");
  cy.get('input#username').type("test");
  cy.get('input#password').type("123abc");
  cy.get('button[type="submit"]').click();

  cy.wait("@submit").should("have.property", "status", 200);

  cy.get("@submit").should((xhr) => {
    expect(xhr.request.body).to.deep.equal({ username: "test", password: "123abc" });
    expect(xhr.response.body).to.equal("submit success!");
  });



cy.get('[data-attr=menu-item-funnels]').click()
 cy.get('h1').should('contain', 'Funnels')
 cy.get('[data-attr=funnel-editor]').should('exist')