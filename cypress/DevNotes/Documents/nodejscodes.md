https://www.tutorialsteacher.com/nodejs/nodejs-module-exports


# Object Literal
```javascript
var obj = {
    authorName: 'Ryan Dahl',
    language: 'Node.js'
}
```


# Functions
```js
function Display(x) { 
    console.log(x);
}

Display(100);
```


# Access Global Scope
```js
exports.log = {
    console: function(msg) {
        console.log(msg);
    },
    file: function(msg) {
        // log to file here
      }
}
```


# Node.js Module Types
Node.js includes three types of modules:
* Core Modules
* Local Modules
* Third Party Modules



# Node.js Local Module

# Writing Simple Module
```javascript
Log.js 
var log = {
            info: function (info) { 
                console.log('Info: ' + info);
            },
            warning:function (warning) { 
                console.log('Warning: ' + warning);
            },
            error:function (error) { 
                console.log('Error: ' + error);
            }
    };

module.exports = log
```

# Loading Local Module
```javascript
var module = require('module_name');
var http = require('http');
```

```javascript
app.js
var myLogModule = require('./Log.js');

myLogModule.info('Node.js started');
```

```javascript
C:\> node app.js
Info: Node.js started
```


#  Export Module in Node.js

//Export Literals 
```javascript
Message.js 
module.exports = 'Hello world';


app.js 
var msg = require('./Messages.js');

console.log(msg);

```


# Export Object
```javascript
Message.js 
exports.SimpleMessage = 'Hello world';
//or
module.exports.SimpleMessage = 'Hello world';


app.js
var msg = require('./Messages.js');
console.log(msg.SimpleMessage);

C:\> node app.js
Hello World
```


```javascript
data.js 
module.exports = {
    firstName: 'James',
    lastName: 'Bond'
}
app.js 
var person = require('./data.js');
console.log(person.firstName + ' ' + person.lastName);

C:\> node app.js
James Bond

```


# Export Function
```javascript
Log.js 
module.exports = function (msg) { 
    console.log(msg);
};
Now, you can use the above module, as shown below.

app.js 
var msg = require('./Log.js');

msg('Hello World');

C:\> node app.js
Hello World
```



# Export Function as a Class
```javascript
Person.js 
module.exports = function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function () { 
        return this.firstName + ' ' + this.lastName;
    }
}


app.js Copy
var person = require('./Person.js');

var person1 = new person('James', 'Bond');

console.log(person1.fullName());

C:\> node app.js
James Bond
```