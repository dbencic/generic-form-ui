import Wizard from "./lib/wizard";

var wizardElementId = "wizard-content";

function getQueryParam(param) {
    location.search.substr(1)
        .split("&")
        .some(function(item) { // returns first occurence and stops
            return item.split("=")[0] == param && (param = item.split("=")[1])
        })
    return param;
}

let descriptor = getQueryParam("descriptor");
let wizard = new Wizard(descriptor, wizardElementId);
