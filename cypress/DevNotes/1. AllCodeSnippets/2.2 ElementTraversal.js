/********************************************************************************************
* ? children : closest : eq : filter : find : first : last : next : nextAll : nextUntil 
* ? prev : prevAll : prevUntil : not : parent : parents : parentsUntil : siblings
*********************************************************************************************/





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
    

    cy.get('.mat-paginator')
    .find('.mat-paginator-range-label')
    .should('contain', `20 of ${dataSource.length}`);
  
    
    
cy.get('.mat-paginator')
.find('button.mat-paginator-next')
.click();

 
cy.get('[for="prod-field"]').should(($el) => {
    expect(
      $el
        .contents() // Grab all contents
        .first() // The text node you're looking for
        .text() // Get the text
        .trim() // And trim the white space
    ).to.eq('Project');
  });

  
  

# How to get div 'text' value in Cypress test using jquery
cy.get(".ibxudA").find('.WildnessText-kRKTej').should('have.text',"Wildness")



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
  
  
