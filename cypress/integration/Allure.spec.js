/// <reference types="Cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />

/**
* ? Should this methis be expore in the public API
* ! Deprecated methos, do not do this
* * Important informtion is highlighted
* TODO: Any to do activieis
* @Param this is about parameter 
*/


import PCLandingPage from '../PageObjects/PCLandingPage'


describe("EDDG Test Suite", function(){

     //Use the cy.fixture() method to pull data from fixture file
    before(function () {

        const allure = Cypress.Allure.reporter.getInterface();
        const today = new Date();
        const currentHour = today.getHours()

        allure.writeExecutorInfo({
            name: 'Paradigm Automation Pipleline',
            type: 'jenkins', 
            url: 'http://172.16.2.66:9090/job/Smoke_Test_Stage/',
            buildOrder: currentHour, // in case buildOrder are same - it will count as retry
            buildName: 'basic',
            buildUrl: 'http://172.16.2.66:9090/',
            reportUrl: 'https://path-to-report',
            reportName: 'Paradigm Daily Health Check Report'
        });

        /*
        allure.writeEnvironmentInfo({
            someEnvInfo: 'envInfo'
        });
*/
        allure.writeEnvironmentInfo(Cypress.env());

        cy.fixture('TestData.json').as('AppConfig').then(function (data) {
        this.data = data;
        })
    })

    beforeEach(() => {
        const allure = Cypress.Allure.reporter.getInterface();
        allure.feature('EDDG Feature');
        allure.epic('EDDG Epic');
        allure.tms('docs', 'https://on.cypress.io/interacting-with-elements');
        allure.label('Application:', 'EDDG');
        allure.label('User:', 'TTESTDCSKL');
    });

    
    /*
    afterEach(function () {
        if (this.currentTest.state === 'failed') {    
            var test = this.currentTest

            Cypress.on('after:screenshot', (details) => {
                console.log(details) // print all details to terminal
            })
        }
    });   
   */
    

    it('Verify EDDG Dashboard Loading', function(){

        cy.allure()
        .tms('docs', 'https://on.cypress.io/rightclick')
        .description(`This is test descript that explain about the goal of the test case.`)
        .tag('FAILED BY INTENT')
        .parameter('docs', 'https://on.cypress.io/scrollintoview')
        .severity('minor');
        

        cy.allure().testAttachment("test", "C:\cyptest\cypress\test.png")

        cy.allure().testAttachment(
            'TestData_csv_table',
            `John,Doe,120 jefferson st.,Riverside, NJ, 08075
            Jack,McGinnis,220 hobo Av.,Phila, PA,09119
            "John ""Da Man""",Repici,120 Jefferson St.,Riverside, NJ,08075
            Stephen,Tyler,"7452 Terrace ""At the Plaza"" road",SomeTown,SD, 91234
            ,Blankman,,SomeTown, SD, 00298
            "Joan ""the bone"", Anne",Jet,"9th, at Terrace plc",Desert City,CO,00123`,
            'text/csv'
        );

  
        cy.allure().descriptionHtml(
            `<p class="has-line-data" data-line-start="0" data-line-end="1">You can click on 9 specific positions of an element:</p>
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

       /**
        *   cy.allure().then((allure) => {
            allure.currentTest.addAttachment('name', 'image/png', relativePath);
        });
        */

        cy.allure().label('Rams label subSuite', 'subSuiteValue');

        const lp = new PCLandingPage()
        cy.allure().step('Step 1')
        lp.visit()
       // cy.screenshot()
        //cy.screenshot()
        cy.allure().step('Step 2')
        lp.EnterUserName(this.data.Username)
        cy.allure().step('Step 3')
        lp.EnterPassowrd(this.data.Password)
        cy.allure().step('Step 4')
        lp.Login()
        cy.title().should('be.equal', 'Paradigm Central - Solutions for Complex Medical Management1')



    })
})