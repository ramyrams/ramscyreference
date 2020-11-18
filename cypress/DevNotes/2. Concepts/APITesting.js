

let Auth = "";
let SessionId = "";

describe('API Testing with Cypress', () => {

    it('Verify user able to load ParadigmCentral application',()=>{

        var people = [["John", "Smith"], ["Jane", "Doe"], ["Emily", "Jones"]]
        console.table(people);

        cy.request('GET','/CatenaMVC/Landing/Account/LogOn').then((response)=>{
            expect(response.status).equal(200)

            console.log(Auth)
            console.log(SessionId)
            
            const title = Cypress.$(response.body).filter('title').text().trim()
 
            const WelcomeMsg = Cypress.$(response.body).find('.appName').text().trim()
 
            expect(title).equal("Log On")
            expect(WelcomeMsg).equal("Welcome to Paradigm Central")

        })
    })

    it('Verify user able to login to PC application with valid credential',()=>{

        cy.request(
            {
                method : 'POST',
                log: true,
                followRedirect: true,
                url: '/CatenaMVC/Landing/Account/LogOn',
                headers : {
                    'content-type' : 'application/x-www-form-urlencoded',                        
                },
                body :{
                    'IsExpired' : false,
                    'UserName': "ndecastro",
                    'Password' : "paradigmpassword2021",
                    'RememberMe' : false
    
                }
            }).then((response)=>{
    
                //console.table(response.body)
    
                const title = Cypress.$(response.body).filter('title').text().trim()
    
                expect(response.status).equal(200)
                expect(title).equal("Paradigm Central - Solutions for Complex Medical Management")
    
                var env = response.requestHeaders.referer.split(".")[1];
    
                var SessionCookieName = ".ASPXFORMSAUTHTEST";
                switch(env) {
                    case "test":
                        SessionCookieName = ".ASPXFORMSAUTHTEST";
                        break;
                    case "test2":
                        SessionCookieName = ".ASPXFORMSAUTHTEST2";
                        break;
                    case "stg":
                        SessionCookieName = ".ASPXFORMSAUTHSTG";
                        break;
                    default:
                        SessionCookieName = ".ASPXFORMSAUTHxxxx";
                }
    
                cy.readCookie(response.requestHeaders.cookie, SessionCookieName ).then(($input) => {
                    Auth = $input
                })
    
                cy.readCookie(response.requestHeaders.cookie, 'ASP.NET_SessionId' ).then(($input) => {
                    SessionId = $input
                })
            })
    })


    it('Verify - Patient Seach by Contract ID',()=>{
        
        var req = {
            method : 'POST', url: '/EDDG-Web/SearchPatient/GetPatientResult',
            headers : {
                'Cookie' : 'ASP.NET_SessionId=' + SessionId + "; .ASPXFORMSAUTHTEST=" + Auth + ";",
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"                         
            },
            body : "sort=&group=&filter=&PatientName=&ClaimNumber=&PatientID=&ContractID=118734&CustomerID=&ContractTypeIDs=&ContractStatusIDs=&JurState=&PrimaryDxCatgryID=&SecondaryDxCatgryID=&ComplexityScoreID=&BillingMethodID=&ContractEffectiveDate=&ContractActualEndDT=&InjuryDate=&ReferralDate="
        }
       
        cy.request( req
            ).then((response)=>{
                expect(response.status).equal(200)
                expect(response.body.Total).equal(1)
            })
    }) //End 

    it('Verify loading Case Overview details',()=>{

        console.table(["apples", "oranges", "bananas"]);

        cy.request(
            {
                method : 'GET', url: '/EDDG-Web/PatientLanding/Main',
                headers : {
                    'Cookie' : 'ASP.NET_SessionId=' + SessionId + "; .ASPXFORMSAUTHTEST=" + Auth + ";"                         
                },
                qs:{
                    "ContractID": 118734,
                    "PatientID" : 108762,
                    "ContractTypeID" : 29
                }
            }).then((response)=>{
                expect(response.status).equal(200)

            })
    }) //End of Verify loading Case Overview details'




/*
based on cy.api
*/

it('Call API with log',()=>{
    var req = {
        method : 'POST', url: '/EDDG-Web/SearchPatient/GetPatientResult',
        headers : {
            'Cookie' : 'ASP.NET_SessionId=' + SessionId + "; .ASPXFORMSAUTHTEST=" + Auth + ";",
            "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"                         
        },
        body : "sort=&group=&filter=&PatientName=&ClaimNumber=&PatientID=&ContractID=118734&CustomerID=&ContractTypeIDs=&ContractStatusIDs=&JurState=&PrimaryDxCatgryID=&SecondaryDxCatgryID=&ComplexityScoreID=&BillingMethodID=&ContractEffectiveDate=&ContractActualEndDT=&InjuryDate=&ReferralDate="
    }

    cy.api(req, "test name")
    .then(({ messages, duration, body, status, statusText, headers, requestHeaders }) => {
        console.log(messages)
        console.log(duration)
        console.log(body)
        console.log(status)
        console.log(statusText)
        console.log(headers)
        console.log(requestHeaders)

        expect(status).equal(200)
        expect(body.Total).equal(1)


      })
    })


it('yields API call result', () => {
    cy.api(
      {
        url: '/'
      },
      'my hello world'
    ).then(response => {
      expect(response).to.include.keys([
        'status',
        'statusText',
        'body',
        'requestHeaders',
        'headers',
        'duration'
      ])
      expect(response.body).to.equal('Hello World!')
    })
  })