-----------------------------------------------------------------------------------------------------
# Dev Environment Setup
-----------------------------------------------------------------------------------------------------
Install VS Code
Install Node and confirm the version node -v
Install NPM and confirm the version - npm -v
npm install cypress --save-dev

npm i -D @shelex/cypress-allure-plugin
npm install nodemailer
npm install -D cypress-plugin-tab
npm install -D cypress-xpath

-----------------------------------------------------------------------------------------------------
# Verify Environment Setup
-----------------------------------------------------------------------------------------------------
node -v 
npm -v
npx cypress --version
npx cypress info
npx cypress verify
npx cypress cache path

-----------------------------------------------------------------------------------------------------
# Setup Project Dev Environment 
-----------------------------------------------------------------------------------------------------
# Create a new project folder
MD <Project Folder>
CD <Project Folder>

# to generate the  package.json file
npm init -y

npx cypress open

-----------------------------------------------------------------------------------------------------
# Developement
-----------------------------------------------------------------------------------------------------
/// <reference types="cypress" />

# Skeleton Class
describe('', ()=>{
    before(()=>{
		cy.visit('localhost:3000')
		cy.clearCookies()
    });

    it('', ()=> {
    });
});



npm install -g allure-commandline --save-dev
npm i -D @shelex/cypress-allure-plugin
npm install -D cypress-xpath



-----------------------------------------------------------------------------------------------------
# Deployment
-----------------------------------------------------------------------------------------------------

# Install all the dependencies in package.json
npm install



For Jenkins Unicode support
https://medium.com/pacroy/how-to-fix-jenkins-console-log-encoding-issue-on-windows-a1f4b26e0db4

-----------------------------------------------------------------------------------------------------
# Test run during the development 
-----------------------------------------------------------------------------------------------------

cypress run --record "--parallel" "--group" "4x-electron"


.gitignore file:
	node_modules/
	cypress/videos/
	cypress/screenshots/

 
-----------------------------------------------------------------------------------------------------
# Cypress Open
-----------------------------------------------------------------------------------------------------

npx cypress open --config-file cypress.test.json
npx cypress open --config-file test/cypress.test.json

-----------------------------------------------------------------------------------------------------
# Cypress run
-----------------------------------------------------------------------------------------------------
# Run the script from the package.json
npx cypress run SmokeTest:Test1

npx cypress run --config-file cypress.train.json --spec cypress/integration/SmokeTesting/VerifyEddgApplication.js
npx cypress run --config-file cypress.stg.json
npx cypress run --config-file cypress.test.json
npx cypress run --config-file cypress.test2.json
cypress run --browser chrome
cypress run --config pageLoadTimeout=100000,watchForFileChanges=false
cypress run --config-file tests/cypress-config.json
cypress run --config-file false

cypress run --env host=api.dev.local
cypress run --env host=api.dev.local,port=4222
cypress run --env flags='{"feature-a":true,"feature-b":false}'

cypress run --group develop-env
cypress run --group user-tests --spec 'cypress/integration/user/**/*'

cypress run --headed
cypress run --headless --browser chromey
cypress run --headed --no-exit

cypress run --spec 'cypress/integration/examples/*'


cypress run --spec 'cypress/integration/examples/actions.spec.js,cypress/integration/examples/files.spec.js' --- Run tests specifying multiple test files to run

 
-----------------------------------------------------------------------------------------------------
# Execure and generate Allure Report
-----------------------------------------------------------------------------------------------------
npx cypress run --config video=false --env allure=true --browser chrome --spec "cypress/integration/SmokeTesting/VerifyEddgApplication.js"

parallel execution
	cypress run --record --group 1x-electron
	cypress run --record --group 2x-chrome --parallel --browser chrome
	cypress run --record --group 4x-electron --parallel
	cypress run --record --group Windows/Chrome-69 --browser chrome
	cypress run --record --group Mac/Chrome-70 --browser chrome
	cypress run --record --group Linux/Electron
	cypress run --record --group package/admin --spec 'cypress/integration/packages/admin/**/*'
	cypress run --record --group package/customer --spec 'cypress/integration/packages/customer/**/*'
	cypress run --record --group package/guest --spec 'cypress/integration/packages/guest/**/*'


-----------------------------------------------------------------------------------------------------
# Reinstall
-----------------------------------------------------------------------------------------------------

Delete in this folder, if any issue copy to the second folder manually
C:\Users\rpalaniappan\AppData\Local\Cypress\Cache\4.12.1\Cypress
C:\Windows\System32\config\systemprofile\AppData\Local\Cypress\Cache

-----------------------------------------------------------------------------------------------------
# Allure Reports
-----------------------------------------------------------------------------------------------------
Note: https://github.com/Shelex/cypress-allure-plugin
Example: 
	https://github.com/Shelex/cypress-allure-plugin-example/blob/master/cypress/integration/examples/actions.spec.js
	https://github.com/Ebazhanov/cypress-allure2-report-example
	https://github.com/Shelex/cypress-allure-historical-example
	
npx cypress run --config video=false --env allure=true --browser chrome
npx allure generate --clean
npx allure open

"allure:report": "allure generate allure-results --clean -o allure-report",
"allure:clear": "rm -r allure-results/ allure-report/latest cypress/screenshots || true",
"allure:history": "mv -f allure-report/latest/history allure-results/history && rm -r allure-report/latest || true"
		
-----------------------------------------------------------------------------------------------------
# Dependencity - Node Module
 
-----------------------------------------------------------------------------------------------------
# Find unused npm packages in package.json
npm install depcheck -g
depcheck

-----------------------------------------------------------------------------------------------------
# Code Snippets
-----------------------------------------------------------------------------------------------------
https://gist.github.com/jennifer-shehane



-----------------------------------------------------------------------------------------------------
# Cypress Chat group
-----------------------------------------------------------------------------------------------------
https://gitter.im/cypress-io/cypress

-----------------------------------------------------------------------------------------------------
# Awesome Cypress packages
-----------------------------------------------------------------------------------------------------
https://awesomejs.dev/for/cypress/pkg/246063676626305550/releases


-----------------------------------------------------------------------------------------------------
# Chrome Extensions
-----------------------------------------------------------------------------------------------------
ChroPath
Cypress Recorder

-----------------------------------------------------------------------------------------------------
# Other comments
-----------------------------------------------------------------------------------------------------
cypress cache prune


-----------------------------------------------------------------------------------------------------
# E2E Code Coverage
-----------------------------------------------------------------------------------------------------
npm i -D @cypress/code-coverage
npm i -D babel-plugin-istanbul
npm i -D nyc
npm i -D istanbul-lib-coverage

// cypress/support/index.js
import '@cypress/code-coverage/support'


// cypress/plugins/index.js
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  // include any other plugin code...

  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return config
}


Video: E2E Code Coverage video
https://app.pluralsight.com/player?course=cypress-end-to-end-javascript-testing&author=adhithi-ravichandran&name=4f48db2a-edcc-4b4a-abe4-3a183892a30d&clip=5&mode=live

https://docs.cypress.io/guides/tooling/code-coverage.html#Introduction


-----------------------------------------------------------------------------------------------------
# MS SQL
-----------------------------------------------------------------------------------------------------
npm install --save mssql
npm install --save msnodesqlv8


-----------------------------------------------------------------------------------------------------
# E2E Code Coverage
-----------------------------------------------------------------------------------------------------
npm install -D @cypress/code-coverage



// cypress/support/index.js
import '@cypress/code-coverage/support'


// cypress/plugins/index.js
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  // include any other plugin code...

  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return config
}



npx nyc report --reporter=text-summary


Code-vorage

Cyper/Support/Indexx.js

Import Code_coverate/Support


Cypress/plugin/index.js





------------------
C:\CyEDDG>npx cypress run --config-file cypress.test.json video=true --env allure=true --browser chrome
No version of Cypress is installed in: C:\Users\a.rpalaniappan\AppData\Local\Cypress\Cache\5.0.0\Cypress

Please reinstall Cypress by running: cypress install

----------

Cypress executable not found at: C:\Users\a.rpalaniappan\AppData\Local\Cypress\Cache\5.0.0\Cypress\Cypress.exe

----------

Platform: win32 (10.0.14393)
Cypress Version: 5.0.0



-----------------------------------------------------------------------------------------------------
# Examples
-----------------------------------------------------------------------------------------------------


https://github.com/bahmutov
https://github.com/cypress-io/cypress-example-conduit-app


https://github.com/Hypercubed/cypress-page-object-pattern

https://github.com/cypress-io/cypress/issues/6621

POM
https://github.com/Hypercubed/cypress-page-object-pattern




# Cypress Testing Library
https://github.com/testing-library/cypress-testing-library
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/testing-library__cypress/index.d.ts
https://noriste.github.io/reactjsday-2019-testing-course/book/cypress-testing-library.html


# Unlock TFS failed
Check out failed because file is locked the user in Job:  Ramaswamy Palaniappan (Hudson-PROD_Regression_Testing-MASTER)

Solution:
Deleted the workspace in Jenkins and reran the Pam password job, it worked.


https://docs.cypress.io/examples/examples/recipes.html#Stubbing-and-spying

Odoo Framework E2E Testing using Cypress	https://github.com/borni-dhifi/odoo-cypress/tree/master/odoo
https://github.com/cypress-io/cypress-test-tiny
https://github.com/romansndlr/bulletproof-cypress-real-world/tree/master/cypress/integration
https://github.com/cypress-io/cypress-example-recipes
https://github.com/cypress-io/cypress-example-kitchensink
https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/tree/master/cypress/integration
https://github.com/cypress-io/cypress-example-todomvc
https://github.com/cypress-io/cypress-realworld-app
https://github.com/testing-library/cypress-testing-library
https://github.com/cypress-io/testing-workshop-cypress
https://github.com/cypress-io/cypress-example-api-testing
https://github.com/cypress-io/code-coverage
https://github.com/giltayar/testautomationu-cypress-course
https://github.com/kentcdodds/cypress-testing-workshop


Now cd to that Demo folder, then run the cypress command as following; C:\Demo\node_modules\.bin\cypress run "C:\Demo\cypress\integration\examples\test-spec.js"

If you have multiple spec files to run:

`C:\Demo\node_modules\.bin\cypress run "C:\Demo\cypress\integration\examples\"` 



https://www.npmjs.com/~drumbeg



Collection of Apps for testing 
	https://github.com/gothinkster/realworld
	
uitestpractice.com



https://github.com/mjhea0/cypress-visual-regression
https://github.com/cypress-io/cypress-example-recipes
https://awesomeopensource.com/project/cypress-io/cypress-example-recipes

cypress-coverage-example	https://github.com/paulfalgout/cypress-coverage-example/tree/master/coverage


Allure History Example
	https://github.com/Shelex/cypress-allure-historical-example/blob/master/cypress/plugins/index.js


Good ones
	https://www.youtube.com/channel/UCJW4QKphRxa1M_q_S2ygyng
	elector Strategy part 5 other other deatils


https://www.youtube.com/watch?v=1bELNGm-_uw&list=PLFGoYjJG_fqoxTBJAUYw_poyBh0DI78HV

https://www.youtube.com/watch?v=5ifXs65O36k&list=PLUDwpEzHYYLu4jKg-rNSKH3aJeBinlPXp&index=18


https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets


https://github.com/gothinkster/realworld


Cypress Snippets

TO enable inttli sension per file
	/// <reference types="Cypress" />
https://github.com/cypress-io/cypress-example-recipes


https://github.com/cypress-io/cypress-example-recipes


https://github.com/cypress-io/cypress-example-kitchensink

https://github.com/cypress-io/testing-workshop-cypress


Last page Scanned : https://stackoverflow.com/questions/tagged/cypress?tab=active&page=10&pagesize=50




https://github.com/Shelex/cypress-allure-plugin

@ Sample Code
https://github.com/cypress-io/testing-workshop-cypress
https://github.com/cypress-io/testing-workshop-cypress/tree/master/cypress/integration
https://github.com/cypress-io/cypress-realworld-app/blob/develop/src/__tests__/bankaccounts.test.ts
https://github.com/dobromir-hristov/cypress-e2e-testing-examples







  function randomId () {
  return Math.random()
    .toString()
    .substr(2, 10)
}


const stubMathRandom = () => {
  // first two digits are disregarded, so our "random" sequence of ids
  // should be '1', '2', '3', ...
  let counter = 101
  cy.window().then(win => {
    // inside testing iframe
    cy.stub(win.Math, 'random').callsFake(() => counter++)
  })
}




it('stores todos in the store (with ids)', () => {
  stubMathRandom()
})



beforeEach(resetDatabase)
beforeEach(visit)
beforeEach(stubMathRandom)

   cy.url().should('include', '/dashboard');
cy.url().should('eq','http://localhost:4200/dashboard');



cy.get('.ng-untouched').clear().type(newHeroName);
cy.get('app-hero-detail > :nth-child(1) > :nth-child(5)').click();
cy.get('[ng-reflect-router-link="/detail/15"] > .module > h4').contains(newHeroName);


 
 -----------------------------------------------------------------------------------------------------
# Dev Environment Setup
-----------------------------------------------------------------------------------------------------
Install VS Code
Install Node and confirm the version node -v
Install NPM and confirm the version - npm -v
npm install cypress --save-dev

npm i -D @shelex/cypress-allure-plugin
npm install nodemailer
npm install -D cypress-plugin-tab
npm install -D cypress-xpath

-----------------------------------------------------------------------------------------------------
# Verify Environment Setup
-----------------------------------------------------------------------------------------------------
node -v 
npm -v
npx cypress --version
npx cypress info
npx cypress verify
npx cypress cache path

-----------------------------------------------------------------------------------------------------
# Setup Project Dev Environment 
-----------------------------------------------------------------------------------------------------
# Create a new project folder
MD <Project Folder>
CD <Project Folder>

# to generate the  package.json file
npm init -y

npx cypress open

-----------------------------------------------------------------------------------------------------
# Developement
-----------------------------------------------------------------------------------------------------
/// <reference types="cypress" />

# Skeleton Class
describe('', ()=>{
    before(()=>{
		cy.visit('localhost:3000')
		cy.clearCookies()
    });

    it('', ()=> {
    });
});



npm install -g allure-commandline --save-dev
npm i -D @shelex/cypress-allure-plugin
npm install -D cypress-xpath



-----------------------------------------------------------------------------------------------------
# Deployment
-----------------------------------------------------------------------------------------------------

# Install all the dependencies in package.json
npm install



For Jenkins Unicode support
https://medium.com/pacroy/how-to-fix-jenkins-console-log-encoding-issue-on-windows-a1f4b26e0db4

-----------------------------------------------------------------------------------------------------
# Test run during the development 
-----------------------------------------------------------------------------------------------------

cypress run --record "--parallel" "--group" "4x-electron"


.gitignore file:
	node_modules/
	cypress/videos/
	cypress/screenshots/

 
-----------------------------------------------------------------------------------------------------
# Cypress Open
-----------------------------------------------------------------------------------------------------

npx cypress open --config-file cypress.test.json
npx cypress open --config-file test/cypress.test.json

-----------------------------------------------------------------------------------------------------
# Cypress run
-----------------------------------------------------------------------------------------------------
# Run the script from the package.json
npx cypress run SmokeTest:Test1

npx cypress run --config-file cypress.train.json --spec cypress/integration/SmokeTesting/VerifyEddgApplication.js
npx cypress run --config-file cypress.stg.json
npx cypress run --config-file cypress.test.json
npx cypress run --config-file cypress.test2.json
cypress run --browser chrome
cypress run --config pageLoadTimeout=100000,watchForFileChanges=false
cypress run --config-file tests/cypress-config.json
cypress run --config-file false

cypress run --env host=api.dev.local
cypress run --env host=api.dev.local,port=4222
cypress run --env flags='{"feature-a":true,"feature-b":false}'

cypress run --group develop-env
cypress run --group user-tests --spec 'cypress/integration/user/**/*'

cypress run --headed
cypress run --headless --browser chromey
cypress run --headed --no-exit

cypress run --spec 'cypress/integration/examples/*'


cypress run --spec 'cypress/integration/examples/actions.spec.js,cypress/integration/examples/files.spec.js' --- Run tests specifying multiple test files to run

 
-----------------------------------------------------------------------------------------------------
# Execure and generate Allure Report
-----------------------------------------------------------------------------------------------------
npx cypress run --config video=false --env allure=true --browser chrome --spec "cypress/integration/SmokeTesting/VerifyEddgApplication.js"

parallel execution
	cypress run --record --group 1x-electron
	cypress run --record --group 2x-chrome --parallel --browser chrome
	cypress run --record --group 4x-electron --parallel
	cypress run --record --group Windows/Chrome-69 --browser chrome
	cypress run --record --group Mac/Chrome-70 --browser chrome
	cypress run --record --group Linux/Electron
	cypress run --record --group package/admin --spec 'cypress/integration/packages/admin/**/*'
	cypress run --record --group package/customer --spec 'cypress/integration/packages/customer/**/*'
	cypress run --record --group package/guest --spec 'cypress/integration/packages/guest/**/*'


-----------------------------------------------------------------------------------------------------
# Reinstall
-----------------------------------------------------------------------------------------------------

Delete in this folder, if any issue copy to the second folder manually
C:\Users\rpalaniappan\AppData\Local\Cypress\Cache\4.12.1\Cypress
C:\Windows\System32\config\systemprofile\AppData\Local\Cypress\Cache

-----------------------------------------------------------------------------------------------------
# Allure Reports
-----------------------------------------------------------------------------------------------------
Note: https://github.com/Shelex/cypress-allure-plugin
Example: 
	https://github.com/Shelex/cypress-allure-plugin-example/blob/master/cypress/integration/examples/actions.spec.js
	https://github.com/Ebazhanov/cypress-allure2-report-example
	https://github.com/Shelex/cypress-allure-historical-example
	
npx cypress run --config video=false --env allure=true --browser chrome
npx allure generate --clean
npx allure open

"allure:report": "allure generate allure-results --clean -o allure-report",
"allure:clear": "rm -r allure-results/ allure-report/latest cypress/screenshots || true",
"allure:history": "mv -f allure-report/latest/history allure-results/history && rm -r allure-report/latest || true"
		
-----------------------------------------------------------------------------------------------------
# Dependencity - Node Module
 
-----------------------------------------------------------------------------------------------------
# Find unused npm packages in package.json
npm install depcheck -g
depcheck

-----------------------------------------------------------------------------------------------------
# Code Snippets
-----------------------------------------------------------------------------------------------------
https://gist.github.com/jennifer-shehane



-----------------------------------------------------------------------------------------------------
# Cypress Chat group
-----------------------------------------------------------------------------------------------------
https://gitter.im/cypress-io/cypress

-----------------------------------------------------------------------------------------------------
# Awesome Cypress packages
-----------------------------------------------------------------------------------------------------
https://awesomejs.dev/for/cypress/pkg/246063676626305550/releases


-----------------------------------------------------------------------------------------------------
# Chrome Extensions
-----------------------------------------------------------------------------------------------------
ChroPath
Cypress Recorder

-----------------------------------------------------------------------------------------------------
# Other comments
-----------------------------------------------------------------------------------------------------
cypress cache prune


-----------------------------------------------------------------------------------------------------
# E2E Code Coverage
-----------------------------------------------------------------------------------------------------
npm i -D @cypress/code-coverage
npm i -D babel-plugin-istanbul
npm i -D nyc
npm i -D istanbul-lib-coverage

// cypress/support/index.js
import '@cypress/code-coverage/support'


// cypress/plugins/index.js
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  // include any other plugin code...

  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return config
}


Video: E2E Code Coverage video
https://app.pluralsight.com/player?course=cypress-end-to-end-javascript-testing&author=adhithi-ravichandran&name=4f48db2a-edcc-4b4a-abe4-3a183892a30d&clip=5&mode=live

https://docs.cypress.io/guides/tooling/code-coverage.html#Introduction


-----------------------------------------------------------------------------------------------------
# MS SQL
-----------------------------------------------------------------------------------------------------
npm install --save mssql
npm install --save msnodesqlv8


-----------------------------------------------------------------------------------------------------
# E2E Code Coverage
-----------------------------------------------------------------------------------------------------
npm install -D @cypress/code-coverage



// cypress/support/index.js
import '@cypress/code-coverage/support'


// cypress/plugins/index.js
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  // include any other plugin code...

  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return config
}



npx nyc report --reporter=text-summary


Code-vorage

Cyper/Support/Indexx.js

Import Code_coverate/Support


Cypress/plugin/index.js





------------------
C:\CyEDDG>npx cypress run --config-file cypress.test.json video=true --env allure=true --browser chrome
No version of Cypress is installed in: C:\Users\a.rpalaniappan\AppData\Local\Cypress\Cache\5.0.0\Cypress

Please reinstall Cypress by running: cypress install

----------

Cypress executable not found at: C:\Users\a.rpalaniappan\AppData\Local\Cypress\Cache\5.0.0\Cypress\Cypress.exe

----------

Platform: win32 (10.0.14393)
Cypress Version: 5.0.0



-----------------------------------------------------------------------------------------------------
# Examples
-----------------------------------------------------------------------------------------------------


https://github.com/bahmutov
https://github.com/cypress-io/cypress-example-conduit-app


https://github.com/Hypercubed/cypress-page-object-pattern

https://github.com/cypress-io/cypress/issues/6621

POM
https://github.com/Hypercubed/cypress-page-object-pattern




# Cypress Testing Library
https://github.com/testing-library/cypress-testing-library
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/testing-library__cypress/index.d.ts
https://noriste.github.io/reactjsday-2019-testing-course/book/cypress-testing-library.html


# Unlock TFS failed
Check out failed because file is locked the user in Job:  Ramaswamy Palaniappan (Hudson-PROD_Regression_Testing-MASTER)

Solution:
Deleted the workspace in Jenkins and reran the Pam password job, it worked.


https://docs.cypress.io/examples/examples/recipes.html#Stubbing-and-spying

Odoo Framework E2E Testing using Cypress	https://github.com/borni-dhifi/odoo-cypress/tree/master/odoo
https://github.com/cypress-io/cypress-test-tiny
https://github.com/romansndlr/bulletproof-cypress-real-world/tree/master/cypress/integration
https://github.com/cypress-io/cypress-example-recipes
https://github.com/cypress-io/cypress-example-kitchensink
https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/tree/master/cypress/integration
https://github.com/cypress-io/cypress-example-todomvc
https://github.com/cypress-io/cypress-realworld-app
https://github.com/testing-library/cypress-testing-library
https://github.com/cypress-io/testing-workshop-cypress
https://github.com/cypress-io/cypress-example-api-testing
https://github.com/cypress-io/code-coverage
https://github.com/giltayar/testautomationu-cypress-course
https://github.com/kentcdodds/cypress-testing-workshop


Now cd to that Demo folder, then run the cypress command as following; C:\Demo\node_modules\.bin\cypress run "C:\Demo\cypress\integration\examples\test-spec.js"

If you have multiple spec files to run:

`C:\Demo\node_modules\.bin\cypress run "C:\Demo\cypress\integration\examples\"` 



https://www.npmjs.com/~drumbeg



Collection of Apps for testing 
	https://github.com/gothinkster/realworld
	
uitestpractice.com



https://github.com/mjhea0/cypress-visual-regression
https://github.com/cypress-io/cypress-example-recipes
https://awesomeopensource.com/project/cypress-io/cypress-example-recipes

cypress-coverage-example	https://github.com/paulfalgout/cypress-coverage-example/tree/master/coverage


Allure History Example
	https://github.com/Shelex/cypress-allure-historical-example/blob/master/cypress/plugins/index.js


Good ones
	https://www.youtube.com/channel/UCJW4QKphRxa1M_q_S2ygyng
	elector Strategy part 5 other other deatils


https://www.youtube.com/watch?v=1bELNGm-_uw&list=PLFGoYjJG_fqoxTBJAUYw_poyBh0DI78HV

https://www.youtube.com/watch?v=5ifXs65O36k&list=PLUDwpEzHYYLu4jKg-rNSKH3aJeBinlPXp&index=18


https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets


https://github.com/gothinkster/realworld


Cypress Snippets

TO enable inttli sension per file
	/// <reference types="Cypress" />
https://github.com/cypress-io/cypress-example-recipes


https://github.com/cypress-io/cypress-example-recipes


https://github.com/cypress-io/cypress-example-kitchensink

https://github.com/cypress-io/testing-workshop-cypress


Last page Scanned : https://stackoverflow.com/questions/tagged/cypress?tab=active&page=10&pagesize=50




https://github.com/Shelex/cypress-allure-plugin

@ Sample Code
https://github.com/cypress-io/testing-workshop-cypress
https://github.com/cypress-io/testing-workshop-cypress/tree/master/cypress/integration
https://github.com/cypress-io/cypress-realworld-app/blob/develop/src/__tests__/bankaccounts.test.ts
https://github.com/dobromir-hristov/cypress-e2e-testing-examples







  function randomId () {
  return Math.random()
    .toString()
    .substr(2, 10)
}


const stubMathRandom = () => {
  // first two digits are disregarded, so our "random" sequence of ids
  // should be '1', '2', '3', ...
  let counter = 101
  cy.window().then(win => {
    // inside testing iframe
    cy.stub(win.Math, 'random').callsFake(() => counter++)
  })
}




it('stores todos in the store (with ids)', () => {
  stubMathRandom()
})



beforeEach(resetDatabase)
beforeEach(visit)
beforeEach(stubMathRandom)

   cy.url().should('include', '/dashboard');
cy.url().should('eq','http://localhost:4200/dashboard');



cy.get('.ng-untouched').clear().type(newHeroName);
cy.get('app-hero-detail > :nth-child(1) > :nth-child(5)').click();
cy.get('[ng-reflect-router-link="/detail/15"] > .module > h4').contains(newHeroName);


 
 
# Force the Cypress timezone
"cy:open": "TZ=UTC cypress open",
"cy:run": "TZ=UTC cypress run"



check this out 
cypress-wait-until




http://javascriptissexy.com/16-javascript-concepts-you-must-know-well/
https://github.com/goldbergyoni/javascript-testing-best-practices




const login_signup_link = 'p._g9ean>a'
const login_section = 'div._f9sjj'
const username_input = 'form._3jvtb>div._t296e:nth-child(1)>div._sjplo>div._ev9xl>input._ph6vk._jdqpn._o716c'
const password_input = 'form._3jvtb>div._t296e:nth-child(2)>div._sjplo>div._ev9xl>input._ph6vk._jdqpn._o716c'
const login_button_active = 'button._qv64e._gexxb._4tgw8._njrw0'
const login_button_unactive = 'button._qv64e._gexxb._4tgw8._jfvwv'
const error_alert = 'div._e9kim'
const forgot_password_link = 'a._pbd5h'
const itunes_button = 'a._o7vmf:nth-child(1)'
const googleplay_button = 'a._o7vmf:nth-child(2)'
const notification_form = 'div._dzwdj._rga4h'
const instagram_logo = 'a._giku3._8scx2.coreSpriteDesktopNavLogoAndWordmark._rujh3'
const profile_icon = 'div._ikq0n'


https://github.com/cypress-io/github-action


https://github.com/muratkeremozcan/cypressExamples


 cy.url().should('include', 'rocketmiles');



 # Custom Commands
 https://github.com/muratkeremozcan/rocket-cypress/blob/master/cypress/support/commands.js
 https://github.com/muratkeremozcan/test-framework-comparison/blob/master/cypress-demo/cypress/support/commands.ts


 https://github.com/muratkeremozcan/ui-testing-best-practices


 https://github.com/muratkeremozcan/cypress-example-recipes

 https://github.com/muratkeremozcan/javascript-testing-best-practices
 
