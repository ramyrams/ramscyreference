//Upload the file 
Cypress.Commands.add('UploadFile', { prevSubject: true }, (subject, fileName, fileType = '') => {
    //get the data test file from the fixture folder
    cy.fixture(fileName,'binary').then(content => {
  
       //convert to blog
        const blob = Cypress.Blob.binaryStringToBlob(content, fileType)
        //input#UFile.upload: selector: "input[type=file]"]
        const el = subject[0];

        //Create the file from the blob
        const testFile = new File([blob], fileName, {type: fileType});

        //Hold the data
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);

        //Send the file
        el.files = dataTransfer.files;
        cy.wrap(subject).trigger('change', { force: true });
    });
});
