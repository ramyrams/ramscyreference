/********************************************************************************************
* ? debug : log : fixture : readFile : writeFile 
* ? setCookie: clearCookie : clearCookies : getCookie : getCookies : clearLocalStorage
*********************************************************************************************/



cy.fixture('path/to/test.png', 'base64').then(text => {
    console.log(text); // Outputs the same base64 string to the console
});

cy.getCookies().contains('_key')  // Errors, 'getCookies' does not yield DOM element


cy.setCookie('cookiName', 'someValue');


// ******************************* #readFile ***********************************

    cy.readFile('menu.json')

    //Read a .txt file
    cy.readFile('path/to/message.txt').should('eq', 'Hello World') // true

    //For JSON, the contents yielded are parsed into JavaScript and returned.
    cy.readFile('path/to/data.json').its('name').should('eq', 'Eliza') // true

    # What is the difference between cy.readFile and cy.fixture in Cypress.io?
    cy.readFile('path/to/test.png', 'base64').then(text => {
        console.log(text); // Outputs a base64 string to the console
    });

    //Specify the encoding with the second argument
    cy.readFile('path/to/logo.png', 'base64').then((logo) => {
        // logo will be encoded as base64
        // and should look something like this:
        // aIJKnwxydrB10NVWqhlmmC+ZiWs7otHotSAAAOw==...
    })

    //Playing MP3 file
    cy.readFile('audio/sound.mp3', 'base64').then((mp3) => {
        const uri = 'data:audio/mp3;base64,' + mp3
        const audio = new Audio(uri)
    
        audio.play()
    })

    // will fail after the defaultCommandTimeout is reached
    cy.readFile('does-not-exist.yaml')

    // will pass if the file does not exist
    cy.readFile('does-not-exist.yaml').should('not.exist')

    // if this assertion fails cy.readFile will poll the file
    // until it eventually passes its assertions (or times out)
    cy.readFile('some/nested/path/story.txt').should('eq', 'Once upon a time...')

    cy.readFile('path/to/message.txt').then((text) => {
        expect(text).to.equal('Hello World') // true
    })

    cy.readFile('path/to/data.json').then((user) => {
        expect(user.name).to.equal('Eliza') // true
    })

    // You can read a file and yield its contents
    // The filePath is relative to your project's root.
    cy.readFile('cypress.json').then((json) => {
        expect(json).to.be.an('object')
    })

    it('Verify ECL MR-Non-Index Upload', function(){

        
        cy.readFile('cypress/data.json').then((Data) => {

            var jsonData = JSON.parse(JSON.stringify(Data));

            // parse the string into object literal
            console.log(jsonData['title'])
            
            //Read the child onject property
            console.log(jsonData['child'][1].name)
            console.log(jsonData)

            //Update the JSON
            jsonData['child'][1].name = "vikram"
            console.log(jsonData)

            //How to add the -attribute
            jsonData.CCN =  "JJJD"
            console.log(jsonData)

            //How to delete the -attribute
            delete jsonData.CCN;  // or delete object['property']
            console.log(jsonData)
            
            jsonData.CCNCCB =  "JJJD"
            
            cy.writeFile('cypress/data.json', jsonData)
        })
    })



// ******************************* #writeFile ***********************************

    cy.writeFile('path/to/message.txt', 'Hello World')

    cy.writeFile('path/to/data.json', { name: 'Eliza', email: 'eliza@example.com' })

    //Specify the encoding as a String
    cy.writeFile('path/to/ascii.txt', 'Hello World', 'ascii'))

    //Specify the encoding as part of the options object
    cy.writeFile('path/to/ascii.txt', 'Hello World', { encoding: 'ascii', flag: 'a+' })

    //Append contents to the end of a file
    cy.writeFile('path/to/message.txt', 'Hello World', { flag: 'a+' })

    //Write an array to a file
    cy.writeFile('info.log', ['foo', 'bar', 'baz'])

    // Use a response from a request to automatically
    // generate a fixture file for use later
    cy.request('https://jsonplaceholder.cypress.io/users').then(
        (response) => {
            cy.writeFile('cypress/fixtures/users.json', response.body)
        },
    )
  
    cy.fixture('users').should((users) => {
        expect(users[0].name).to.exist
    })

    // JavaScript arrays and objects are stringified
    // and formatted into text.
    cy.writeFile('cypress/fixtures/profile.json', {
        id: 8739,
        name: 'Jane',
        email: 'jane@example.com',
    })

    cy.fixture('profile').should((profile) => {
        expect(profile.name).to.eq('Jane')
    })

    cy.writeFile(Cypress.env('errorFilePath'), issueKey + "\tDoesnt contain ',' in test case description\t"+ issueKey+"\n", { flag: 'a+' });

    after(() => {
        // In record mode, save gathered XHR data to local JSON file
        if (Cypress.env('RECORD')) {
          const path = './cypress/fixtures/fixture.json';
          cy.writeFile(path, xhrData);
        }
      });
      