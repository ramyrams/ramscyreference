
$(npm bin)/cypress run
./node_modules/.bin/cypress run
npx cypress run



function add (x, y) {
    return x + y
}

function numsExpectedToEq (arr, expected) {
    // loops through the array of values and
    // ensure they equal what is expected
    arr.forEach((value) => {
      expect(fizzbuzz(value)).to.eq(expected)
    })
  }


 
it('can add numbers', () => {
    expect(add(4, 5)).to.eq(9)
})




cy.get('.btn-remove.action.delete').its('length').then((numberOfItems) => {
  for (var i = numberOfItems-1; i>=0; i--) {
    cy.get('.btn-remove.action.delete').eq(i).click({force:true})
  }
})
