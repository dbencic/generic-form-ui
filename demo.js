import React from "react";
import ReactDOM from "react-dom";
import UiFormController from "./ui-form-controller";

var wizardElementId = "wizard-content";

function getQueryParam(param) {
    var value = location.search.substr(1) //skips ?
        .split("&").find((item)=>item.split("=")[0] == param);
    console.log("Found value ", value);
    if (value) return value.split("=")[1];
    return undefined;
}

let descriptorURL = getQueryParam("descriptor");
let errorReportURL =  getQueryParam("errorReport");
//PRVO: ./startServer
//BROWSER: http://localhost:8000/?descriptor=/demo/wizardConfig.js&errorReport=/wizard/errorReport

console.log("Starting demo with descriptor:%s and errorReportURL: %s", descriptorURL, errorReportURL);

let uiFormController = <UiFormController descriptorURL={descriptorURL} descriptorErrorReportURL={errorReportURL} />;
ReactDOM.render(uiFormController, document.getElementById(wizardElementId));
