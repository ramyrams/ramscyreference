/// <reference types="@bahmutov/cy-api" />

let Auth = "";
let SessionId = "";

describe('API Testing with Cypress', () => {

    it('Verify user able to load ParadigmCentral application',()=>{



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

}) //end of description



    
/*

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

                var auth=""
                var sessionid=""
                cy.readCookie(response.requestHeaders.cookie, 'ASP.NET_SessionId' ).then(($input) => {
                    sessionid = $input
                })

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
                    auth = $input
                })

                cy.readFile('cypress/data.json').then((Data) => {

                    var jsonData = JSON.parse(JSON.stringify(Data));

                    jsonData.SessionID =  sessionid
                    jsonData.Token =  auth
                    
                    cy.writeFile('cypress/data.json', jsonData)
                })


            })
    })

*/
 


/*

    cy.request({
        method:'POST',
        url:config.accounts_prod + '/token',
        headers:{ 
            'authorization': 'Basic testestestestest'
        },
        qs:{
            'grant_type':'password',
            'username':email,
            'password':password
        }
    }).then((response)=>{
        var X = response.body.access_token      
        cy.log("create session " + x)
        callback(response.body.access_token, user_id);

    })


    it('GET-list user',()=>{
        cy.request('GET','http://httpbin.org/get').then((response)=>{
            expect(response.status).equal(200)
            expect(response.body.url).to.equal("http://httpbin.org/get")
            
            // expect(response.body.data).to.have.length(6)
            //expect(response.body.data[0].first_name).equal('Michael')
            //expect(response.body).to.not.be.null
            //expect(response.body.data).to.have.length(6)
            
        })
    })

    it('POST-Create user',()=>{
        var user = {
            "name": "Vandana Yadav",
            "job": "QA"
        }

        cy.request(
            {
                method : 'POST',
                log: true,
                followRedirect: false,
                url: 'http://httpbin.org/post',
                headers : {
                    'content-type' : 'application/json',                        
                },
                body :{
                    'name' : 'Rams'
                }
            }).then((response)=>{

                cy.log(response.body)

                 // Parse JSON the body.
                 //let body = JSON.parse(response.body);
                
                expect(response.status).equal(200)
                expect(response.body).to.have.property('json')
                expect(response.body.json).to.deep.equal({'name' : 'Rams'})
                expect(response.body).to.not.be.null;

                //expect(response.body.name).equal(user.job)

                //expect(response.headers['content-type']).to.eq('application/json')
                
                
                //expect(body.data).to.have.length.of.at.least(length);

                /*
                 // Ensure certain properties are present.
                body.data.forEach(function (item) {
                    expect(item).to.have.all.keys('type', 'id', 'attributes');
                         ['changed', 'created', 'default_langcode', 'langcode', 'promote', 'uuid', 'vid'].forEach((key) => {
                            expect(item['attributes']).to.have.property(key);
                        });
                });
                */
        
  /*         
        })
    })
*/

    /*
    it('POST-Create user',()=>{
        var user = {
            "name": "Vandana Yadav",
            "job": "QA"
        }

        cy.request('POST','/users',user).then((response)=>{
            expect(response.status).equal(201)
            expect(response.body.name).equal(user.name)
            expect(response.body.job).equal(user.job)
           
        })
        cy.request('POST','/users',user).its('body').should('include',{name:'Vandana Yadav'})
    })

    it('Ùpdate user',()=>{
        var user1 = {
            "name": "Samantha",
            "job": "DevOps"
        }

        cy.request('PUT','/users/2',user1  ).then((response)=>{
            expect(response.status).equal(200)
            expect(response.body.name).equal(user1.name)
            expect(response.body.job).equal(user1.job)
        })
    })

    it('Delete user',()=>{
        var user1 = {
            "name": "Samantha",
            "job": "DevOps"
        }

        cy.request('DELETE','/users/2').then((response)=>{
            expect(response.status).equal(204)
           
        })
    })
})

    it('Validate the header', () => {
        cy.get('@pikachu')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8');
    });
 
    it('Validate the status code', () => {
        cy.get('@pikachu')
            .its('status')
            .should('equal', 200);
    });
 
    it('Validate the pokemon\'s name', () => {
        cy.get('@pikachu')
            .its('body')
            .should('include', { url: 'http://httpbin.org/get' });
    });*/
//});