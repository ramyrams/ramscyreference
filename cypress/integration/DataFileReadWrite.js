describe("ECL App Test Suite", function(){
       
    /*
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
*/

    it('Read data file', function(){
       
        cy.readFile('cypress/data.json').then((Data) => {

            var jsonData = JSON.parse(JSON.stringify(Data));

            //Read of the element
            console.log(jsonData['SessionID'])
            
            //Read one of the element from the array
            console.log(jsonData['MyArray'][1])

            //Read element from the object
            console.log(jsonData['employee'].city)

            //Read the object from the element
            console.log(jsonData['arrayOfObjects'][1].Title)

            //Read the complex object
            console.log(jsonData['VeryComplexObject'][1]['ComplexObject'][0].id)
           
        })
    })

    it('Write data file', function(){
       
        cy.readFile('cypress/data.json').then((Data) => {

            var jsonData = JSON.parse(JSON.stringify(Data));
            
             //How to add the -attribute
             jsonData.CCN =  "JJJD"
             console.log(jsonData)

            //How to delete the -attribute
            delete jsonData.CCN;  // or delete object['property']
            console.log(jsonData)

            //Update the JSON
            jsonData.CreateJustForUpdate = "mewly updated"
            console.log(jsonData)
          
            jsonData.CCNCCB =  "JJJD"

            cy.writeFile('cypress/data.json', jsonData) 
        })
    })

    var jsonData 
    it('Data Accross function1', function(){
       
        cy.readFile('cypress/data.json').then((Data) => {

             jsonData = JSON.parse(JSON.stringify(Data));

             jsonData.NewVale =  "New value across the function"

             cy.writeFile('cypress/data.json', jsonData) 
        })
    })

    it('Data Accross function2', function(){
        console.log('Data Accross function2')
        console.log(jsonData.NewVale)
    })
})



