import React from "react";
import ReactDOM from "react-dom";
import UiFormController from "./ui-form-controller";

var wizardElementId = "wizard-content";

function getQueryParam(param) {
    location.search.substr(1)
        .split("&")
        .some(function(item) { // returns first occurence and stops
            return item.split("=")[0] == param && (param = item.split("=")[1]);
        });
    return param;
}

let descriptorURL = getQueryParam("descriptor");
let errorReportURL =  getQueryParam("errorReport");
//PRVO: ./startServer
//BROWSER: http://localhost:8000/?descriptor=/demo/wizardConfig.js&errorReport=/wizard/errorReport

let uiFormController = <UiFormController descriptorURL={descriptorURL} descriptorErrorReportURL={errorReportURL} />;
ReactDOM.render(uiFormController, document.getElementById(wizardElementId));
