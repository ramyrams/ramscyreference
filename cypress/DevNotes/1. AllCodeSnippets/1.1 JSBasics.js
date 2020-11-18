//List which stores inputs and expected results
const inputs = [
    {product: 'dress', returned_info: 'Sort by'},
    {product: 'xxxTT^&LL', returned_info: 'No results'},
    {product: ' ', returned_info: 'No results'} 
]
         
//Loop which iterates over list of input submits each input and verifies expected string visibility
inputs.forEach(input => {
    const { product, returned_info } = input
    cy.get('#search_query_top').type(product);
    cy.get('#searchbox > .btn').click();
    cy.url().should('include', 'submit_search=')
    cy.contains(returned_info).should('be.visible')
    cy.get('.search_query').clear()
})



const visitLoginPage = () => {
    cy.visit('http://localhost:3000')
}

const loginWith = (email, password) => {
    cy.get('[name="email"]').type(email)
    cy.get('[name="password"]').type(password)
    cy.get('button').click()
}
const logout = () => {
    cy.get('button').click()
}

