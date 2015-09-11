# GENERIC FORM UI LIB

Enables creation of dynamic wizards UI

## Usage

- You must depend on generic form UI in your project. Then in index.js
```jsx
import Wizard from "generic-form-ui";
let descriptor = "http://url.to.some.descriptor";
let wizardElementId = "wizard-content";
let wizard = new Wizard(descriptor, wizardElementId);
```

## To lounch demo perform the following (you must have node allready installed):

- npm install
- npm run demo:build
- node server.js


### Sample wizards:

	http://localhost:8000/index.html?descriptor=demo/wizardConfig.js
	http://localhost:8000/index.html?descriptor=demo/firsttime/wizardConfig.js
	http://localhost:8000/index.html?descriptor=demo/fullconnect/wizardConfig.js


check source of demo/wizardConfig.js to see how it works

### Please open browser console to see warnings if missconfiguration occurs.

### NOTE: THIS IS STILL ONLY ALPHA, THUS DEVELOPMENT VERSION

##Wizard title and description

If you have #wizard-title and #wizard-description elements on your page, you can pass wizard title and description in your configuration. Check example in demo/fullconnect/wizardConfig.js