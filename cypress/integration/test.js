var basic = require('./basic');

basic.foo();
basic.bar();



describe("EDDG Test Suite", function(){
    it('Verify Paradigm Central landing and login', function(){
        
        cy.visit('https://the-internet.herokuapp.com/basic_auth', {
            auth: {
              username: 'admin',
              password: 'admin'
            }
          })
        
    })

})
