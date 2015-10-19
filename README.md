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
- npm run build:dev
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

##Display options
Display options include customization of various messages.

###Wizard title and description
If you have #wizard-title and #wizard-description elements on your page, you can pass wizard title and description in your configuration. Check example in demo/fullconnect/wizardConfig.js

###Customization of button caption message
By default submit button has text "Save" on it. You can customize this by setting attribute '**buttonLabel**' in wizard configuration. Point your browser to 
http://localhost:8000/demo/wizardConfig.js when server is started.

###Customization of saving messages
When user clicks "save" button, it gets disabled and text is changed to message indicating that save opertion is in process. There is default message, but if you want to customize it, you can set '**messageWhenSaving**' in step config.
Look at http://localhost:8000/demo/wizardConfig.js when server is started to see such sample configuration, and point to 
http://localhost:8000/?descriptor=demo/wizardConfig.js
to see working example (when saving first step, there is delay of 1 second on server in order to demonstrate saving message behaviour.)

##Saving data
How to save data is described in "save" attribute of step config. See demo/wizardConfig.js for reference. Following attributes are accepted:
..- __method__ ("GET" | "POST" | "DELETE" | "PUT" etc) default GET
..- __url__ , where to save data (ex: /my/awesome/script)
..- __requestContentType__ ("application/json; charset=utf-8" | "application/x-www-form-urlencoded; charset=UTF-8") default json
example
```json
save : {
      method: "POST",
      url: "/save/step1",
      requestContentType: "application/json; charset=utf-8"
//      requestContentType: "application/x-www-form-urlencoded; charset=UTF-8"
    }
```

