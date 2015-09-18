# GENERIC FORM UI LIB

Enables creation of dynamic wizards UI

## Usage

- You must depend on generic form UI in your project. Then in index.js
```jsx
import Wizard from "generic-form-ui";
let descriptor = "http://url.to.some.descriptor";
let wizardElementId = "wizard-content";
let uiFormController = new UiFormController(wizardElementId);
uiFormController.start(descriptorURL);
```

## To lounch demo perform the following (you must have node allready installed):

- npm install
- npm run demo:build
- node server.js


### Sample wizards:

	http://localhost:8000/index.html?descriptor=demo/wizardConfig.js
	http://localhost:8000/index.html?descriptor=demo/firsttime/wizardConfig.js
	http://localhost:8000/index.html?descriptor=demo/fullconnect/wizardConfig.js


check source of demo wizard configurations to see how it works

### Please open browser console to see warnings if missconfiguration occurs.

### NOTE: THIS IS STILL ONLY ALPHA, THUS DEVELOPMENT VERSION

## Validation

you can perform client (sync) and server (async) verification. Async verification occurs on save operation. 

###Client side validation (sync)
Example of client side validation can be found in demo/wizardConfig.js . Note following code:
```js
var GreaterThan12 = t.subtype(t.Num, function(value) {
    return value > 12;
 });
```
which decalres numeric type that must be bigger than 12. This way you can perform validation on any kind of field. Note how this new property is used later on:
```js
model : t.struct({
      name: t.Str,
      surname: t.Str,
      email: t.maybe(aumTcomb.types.Email),
      age: GreaterThan12,
      dateOfBirth: t.Dat,
      accountType: AccountTypes
    }),;
```
note that age parameter is of type GreaterThan12.

###Server side validation (async)
To see how is server side validation performed, take a look at server/step1saveHandler.js and views/step1saveresponse.ejs . Note that response json contains validationErrors field in following format:
```json
{name: "name must be greater than 5", surname: "Surname must be greater than 4"}
```
those messages are shown near the affected fields. You can see example of this verifications (client and server) in action if you point your browser to: 
http://localhost:8000/index.html?descriptor=demo/wizardConfig.js
and follow log in console to see what is hapening. Trey following:
Add little number (ex 1) in field "Starost".
Leave other fields as they are and submit the form.

##Wizard title and description

If you have #wizard-title and #wizard-description elements on your page, you can pass wizard title and description in your configuration. Check example in demo/fullconnect/wizardConfig.js