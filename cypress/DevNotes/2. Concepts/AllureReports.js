before(() => {
    const allure = Cypress.Allure.reporter.getInterface();
    const today = new Date();
    const currentHour = today.getHours();

    allure.writeExecutorInfo({
        name: require("os").userInfo().username,
        type: 'type', // jenkins, bamboo, teamcity
        url: 'https://google.com.ua',
        buildOrder: currentHour, // in case buildOrder are same - it will count as retry
        buildName: 'basic',
        buildUrl: 'https://path-to-ci',
        reportUrl: 'https://path-to-report',
        reportName: 'reportName'
    });

    allure.writeEnvironmentInfo({
        someEnvInfo: 'envInfo'
    });

    allure.writeCategoriesDefinitions([
        {
            name: 'Not to have class tests',
            messageRegex: /.*not to have class.*/,
            matchedStatuses: ['failed']
        }
    ]);
});

beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions');
    const allure = Cypress.Allure.reporter.getInterface();
    allure.feature('Actions Feature');
    allure.epic('Plain js tests');
    allure.tms('docs', 'https://on.cypress.io/interacting-with-elements');
    allure.label('tag', 'this is tag');
    allure.label('owner', 'Me, lol');
});

cy.allure().tms('docs', 'https://on.cypress.io/blur');


cy.allure()
.tms('docs', 'https://on.cypress.io/focus')
.severity('minor');

cy.allure()
.tms('docs', 'https://on.cypress.io/click')
.descriptionHtml(
    `
<p class="has-line-data" data-line-start="0" data-line-end="1">You can click on 9 specific positions of an element:</p>
<pre><code>
-------------------------------------
| topLeft        top       topRight |
|                                   |  
|                                   |  
|                                   |  
| left          center        right |  
|                                   |  
|                                   |  
|                                   |  
| bottomLeft   bottom   bottomRight |  
-------------------------------------
</code></pre>`
)
.severity('critical');


cy.allure()
.tms('docs', 'https://on.cypress.io/dblclick')
.description(
    `
Our app has a listener on 'dblclick' event in our 'scripts.js'
that hides the div and shows an input on double click`
)
.severity('blocker')


cy.allure().label('subSuite', 'subSuiteValue');

cy.allure().step('.check() accepts a value argument');


cy.allure().testAttachment(
    'csv_table',
    `John,Doe,120 jefferson st.,Riverside, NJ, 08075
Jack,McGinnis,220 hobo Av.,Phila, PA,09119
"John ""Da Man""",Repici,120 Jefferson St.,Riverside, NJ,08075
Stephen,Tyler,"7452 Terrace ""At the Plaza"" road",SomeTown,SD, 91234
,Blankman,,SomeTown, SD, 00298
"Joan ""the bone"", Anne",Jet,"9th, at Terrace plc",Desert City,CO,00123`,
    'text/csv'
);


cy.allure().parameter('docs', 'https://on.cypress.io/scrollintoview');


cy.allure().parameter('x', 250).parameter('y', 250);


cy.allure()
.parameter('scrollWidth', 250)
.parameter('scrollHeight', 250);





describe("ECL Test Suite", function(){

    before(() => {
        const allure = Cypress.Allure.reporter.getInterface();
        const today = new Date();
        const currentHour = today.getHours();

        allure.writeExecutorInfo({
            name: "QATeam",
            type: 'jenkins', // jenkins, bamboo, teamcity
            url: Cypress.config().baseUrl,
            buildOrder: currentHour, // in case buildOrder are same - it will count as retry
            buildName: 'SmokeTesting',
            buildUrl: 'https://path-to-ci',
            reportUrl: 'https://path-to-report',
            reportName: 'Smoke Testing Report'
        });

        allure.writeEnvironmentInfo({
            baseUrl: Cypress.config().baseUrl
        });

        allure.writeCategoriesDefinitions([
            {
                name: 'Not to have class tests',
                messageRegex: /.*not to have class.*/,
                matchedStatuses: ['failed']
            }
        ]);
    });
  
    beforeEach(function () {
        cy.fixture('TestData.json').as('AppConfig').then(function (data) {
            this.data = data;
            })
    })
    
    it('Verify ECL MR-Non-Index Upload', function(){

        cy.log(Cypress.config().baseUrl)
        cy.log(Cypress.config().Fax_No)
        
        const allure = Cypress.Allure.reporter.getInterface();

        const testCNNPDFDocument = 'test.pdf';
        const Classification = "Medical Records"
        const ContentType = "Non Indexed"
        const Comments = "This CCN document created by automation script."
        const testCaseURL = 'https://paradigmoutcomes.visualstudio.com/Paradigm%20Apps/_workitems/edit/84167'

        const confirmationMessage = "Content uploaded successfully!."

        allure.tms('Test Case:', testCaseURL)
        allure.label('App', 'ECL');

        cy.allure().step('Login to PC Application and open ECL Application')
        cy.Login();
        cy.get(".ecl-app-drawer").click()


        cy.allure().step('Browse & upload new content as Non-Index')
        cy.contains("UPLOAD NEW CONTENTS").click()
        cy.get('input[type=file]').UploadFile(testCNNPDFDocument, 'application/pdf');
        cy.get("#ddlClassification").select(Classification)
        cy.get("#ddlContentType").select(ContentType).wait(2500)
        cy.server().route('POST', '/ECLWeb/ECL/Upload/GetUserCommentSection').as('CommentSection')
        cy.get("#UserComment").type(Comments)
               
    
        cy.server().route('POST', '/ECLWeb/ECL/Upload/**').as('PostECLUpload')
        cy.get("#cmdUpload").click()
        cy.wait('@PostECLUpload')
       
        cy  
          .get('@PostECLUpload')
          .then((xhr) => {
            expect(xhr.response.body).to.have.property('IsSuccessFul', true)
            expect(xhr.response.body).to.have.property('DocName', "test.pdf")
        })


        const data = {
            "title": "first item",
            "completed": false,
            "id": "4973171049"
          }
        const str = JSON.stringify(data)
        cy.writeFile('./data.json', str, {flag: "a+"})


        cy.allure().step('Verify the confirmation message')
        cy.get(".jGrowl-message").contains(confirmationMessage)
        cy.get('.jGrowl-close').click()
        cy.Logout();

    })

})
