import React, { Component } from "react";
import WizardStep from "./wizardStep.js";
import jQuery from "jquery";
import aumTcomb from "aum-tcomb-form-lib";
import t from "tcomb-form";

/**
 * utility function
 */
function doRequest(url, onSuccess, 
    onError = function(errorText) {
      alert(errorText);
    },
    requestMethod="GET", requestData, responseDataType = "json") {
  if (!onSuccess) {
    throw "onSuccess must be defined";
  }
  
  jQuery.ajax({
    dataType : responseDataType,
    method : requestMethod,
    data: requestData,
    url: url,
    success : function(data){
      onSuccess(data);
    },

    error : function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
      let errorText = "Error loading data from URL  " + url + " errorText: " + textStatus;
      onError(errorText);
    }

  });
}

/**
 * Class that encapsulates wizard, related sequence of web forms, functionality
 */
class Wizard {

  //descriptor zamjeniti sa descriptorURL
  constructor(descriptorURL, wizardElementId = "wizard-content") {

    if (!descriptorURL) {
      throw "descriptorURL should be suplied";
    }

    this.wizardElementId = wizardElementId;
    this.wizardElementIdSelector = "#" + wizardElementId;

    doRequest(descriptorURL, (data)=>{
      console.log("got wizard descriptor from " + descriptorURL + " : " + data);
      this.descriptor = this.parseDescriptor(data);
      console.log(this.descriptor);
      this.loadWizardStep(this.descriptor.main);
    }, this.onError, undefined, undefined, "text");

  }

  /**
   * @param data to be evaluated
   */
  parseDescriptor(data) {
    if (!data || data == null) {
      console.warn("Descriptor to be parsed to JS is null");
      return undefined;
    }
    let configFactory = eval(data);
    let descriptor = configFactory(t, aumTcomb);
    return descriptor;
  }

  /**
   * Loads data to be edited by the step and then proceedes with form creation
   */
  loadWizardStep(stepToLoad) {
    console.log("loading wizard step:");
    console.log(stepToLoad);
    this.currentStep = stepToLoad;
    jQuery(this.wizardElementIdSelector).html("<div class='alert alert-info'> Loading data...</div>");//cleans
    this.createForm(stepToLoad);
  }

  /**
   * when step is loaded creates form
   * @param stepConfig configuration of the step
   * @param data data to be edited by form. Can be undefined
   */
  createForm(stepConfig) {
    let formDescriptor = stepConfig.formConfig;
    jQuery(this.wizardElementIdSelector).html("");
    try {
      let wizardStep = <WizardStep model={formDescriptor.model} options={formDescriptor.options} 
        value={stepConfig.data} buttonLabel="Spremi" next={this.onCurrentStepSubmitted.bind(this)}
          title={stepConfig.title} description={stepConfig.description} />;
      React.render(wizardStep, document.getElementById(this.wizardElementId));
    }catch(e) {
      console.error(e);
      this.showError(e.message);
    }
  }

  /**
   * when current step su submitted in form, and all client side data verifications are passed.
   * This calls "save" url defined in StepConfiguration
   */
  onCurrentStepSubmitted(value) {
    let save = this.currentStep.save;
    if (!save) {
      throw "'save' attribute in wizard step descriptor is mandatory";
    }
    if (!save.method || !save.url) {
      throw "'save.method' and 'save.url' are mandatory.";
    }
    doRequest(save.url, (data)=>{
      console.log("invoked save script: " + save.url + " and got result: ");
      console.log(data);
      this.processResponse(data);
    }, this.showError.bind(this), save.method, value, "text");
  }

  /**
   * processes response from 'save' action
   */
  processResponse(responseData) {
    var descriptor = this.parseDescriptor(responseData);
    let status = descriptor.status;
    if (!status) {
      console.warn(descriptor);
      console.warn("status field is not defined in response! Finishing the wizard by convention.");
      status = "0";
    }
    if (status == "0" || status == "end") {
      console.log("Finishing the wizard");
      this.finishWizard(descriptor.message);
      return;//nothing to do
    }
    if (descriptor.message) {
      alert(descriptor.message);
    }
    let nextStep = descriptor.next;
    if (nextStep) {
      this.loadWizardStep(nextStep);
    }else {
      console.warn("Next step for status: " + status + 
        " does not exists in wizardConfig. If status is '0' or 'end' wizard will be finished. Otherwise expecting 'next' " +
        "field (with configuration for next step) inside response.");
    }
  }

  /**
   * shows the success message and cleans all forms
   * @param lastStepMessage message returned on by last step save method
   */
  finishWizard(lastStepMessage) {
    let message = (lastStepMessage)?lastStepMessage:"Uspješno ste dovršili unos podataka";
    jQuery(this.wizardElementIdSelector).html("<div class='alert alert-success'><i class='glyphicon glyphicon-ok' /> " + message + "</div>");//cleans
  }

  /**
   * shows error when something goes wrong
   */
  showError(errorText) {
    //TODO: replace this in future with react component with reset button?
    let errorHtml = "<div class='alert alert-danger'>" + errorText  + "</div>";
    jQuery(this.wizardElementIdSelector).html(errorHtml);
  }

// end class Wizard (finall bracket follows)
}

export default Wizard;

