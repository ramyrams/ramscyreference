/*
Why do we need an environment variable?

Environment variables are very useful when:

The values are different across developer machines.
The values are different across multiple environments: (dev, staging, qa, prod)
The values are highly dynamic and change frequently.
You can easily change the environment variables, especially when you are running in CI.
*/


//read from cypress.json
cy.log(Cypress.config().baseUrl)

//read from cypress.qa.json
cy.log(Cypress.config().Fax_No)

//Set the value
Cypress.config('baseUrl', 'http://localhost:1313/');


//// this will point to a dynamic env var
Cypress.env('EXTERNAL_API')


//The baseUrl can be set in your configuration file (cypress.json by default) and then you will be able to set an environment variable in your OS to override it as shown below:
CYPRESS_BASE_URL=https://staging.app.com cypress run



# Settting

There are 5 different ways that you can set environment variables. Each of them has a slightly different use case.

1. Set in your configuration file
2. Create a `cypress.env.json`
3. Export as `CYPRESS_*`
4. Pass in the CLI as `--env`
5. Set an environment variable inside your plugins.
6. Finally, you can set an environment variable within test configuration.


//Any key/value pair that you set in your configuration file (cypress.json by default) under the env key will become an environment variable
// cypress.json

{
    "projectId": "128076ed-9868-4e98-9cef-98dd8b705d75",
    "env": {
      "login_url": "/login",
      "products_url": "/products",
    }
  }

  Cypress.env()               // {login_url: '/login', products_url: '/products'}
  Cypress.env('login_url')    // '/login'
  Cypress.env('products_url') // '/products'

// Option #2 cypress.env.json
Alternatively, you can decide to create your own cypress.env.json file that Cypress will automatically. The values in this file will overwrite conflicting environment variables in your configuration file (cypress.json by default).

This is a very useful strategy because, if you add cypress.env.json to your .gitignore file, the values in the file can be different for each developer machine.


// cypress.env.json
{
    "host": "aaronvikta.dev.local",
    "api_server": "http://localhost:8080/api/v1/"
}


Cypress.env()          // {host: 'aaronvikta.dev.local', api_server: 'http://localhost:8080/api/v1'}
Cypress.env('host')       // 'aaronvikta.dev.local'
Cypress.env('api_server') // 'http://localhost:8080/api/v1/'


//Option #3: CYPRESS_*

Every environment variable on your machine that starts with either CYPRESS_ or cypress_ will automatically be added and made available to you.

All the conflicting values will override values from your configuration file (cypress.json by default) and cypress.env.json files.
Cypress strips off the CYPRESS_ when adding your environment variables.
The environment variable CYPRESS_INTERNAL_ENV key is reserved and must not be set.
Export cypress env variables from the command line:

export CYPRESS_HOST=aryan.dev.local
export cypress_api_server=http://localhost:8080/api/v1/


Cypress.env()         // {HOST: 'aryan.dev.local', api_server: 'http://localhost:8080/api/v1'}
Cypress.env('HOST')       // 'aryan.dev.local'
Cypress.env('api_server') // 'http://localhost:8080/api/v1/'



//Option #4: --env

you can also pass in environment variables as options when using the CLI tool.
The values here will overwrite all other conflicting environment variables.
You can use the --env argument in your cypress run.
You must use comma to separate multiple values and not a space.
From the command line or CI, you can run:
cypress run --env host=johndoe.dev.local,api_server=http://localhost:8080/api/v1


Option #5: Plugins



//Option #6: Test Configuration


// #Suite of test configuration
// change the environment variable for single suite of tests
describe('test against the Spanish site', {
    env: {
      language: 'es'
    }
  }, () => {
    it('the site will display Spanish', () => {
            cy.visit(`https://docs.cypress.io/${Cypress.env('language')}/`)
            cy.contains('?Por qu? Cypress?')
        })
  })

  // Load config file from a custom path in Cypress.io.
  //plugins/index.js 

  //promisified fs module 
  const path = require('path'); 
  const fs = require('fs-extra'); 
  
  function getConfigurationByFile(file) { 
    const pathToConfigFile = path.resolve( 
      'cypress/config', 
      `cypress.${file}.json` 
    ); 
  
    return fs.readJson(pathToConfigFile); 
  } 
  
  module.exports = (on, config) => { 
    // accept a configFile value or use local by default 
    const file = config.env.configFile || 'local'; 
  
    return getConfigurationByFile(file); 
  }; 
