import React, { Component } from "react";
import WizardStep from "./lib/wizardStep.js";
import jQuery from "jquery";
import aumTcomb from "aum-tcomb-form-lib";
import t from "tcomb-form";
import clone from "clone";

/**
 * utility function
 */
function doRequest(url, onSuccess, 
    onError = function(errorText) {
      alert(errorText);
    },
    requestMethod="GET", requestData, responseDataType = "json",
    requestContentType = "application/json; charset=utf-8"/*"application/x-www-form-urlencoded; charset=UTF-8"*/) {
  if (!onSuccess) {
    throw "onSuccess must be defined";
  }
  
  jQuery.ajax({
    dataType : responseDataType,
    method : requestMethod,
    data: requestData,
    contentType: requestContentType,
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
 * @param data to be evaluated
 */
function parseDescriptor(data) {
  if (!data || data == null) {
    console.warn("Descriptor to be parsed to JS is null");
    return undefined;
  }
  let configFactory = eval(data);
  let descriptor = configFactory(t, aumTcomb);
  return descriptor;
}


/**
 * Class that encapsulates wizard, related sequence of web forms, functionality
 */
class UiFormController extends Component{

  /**
   *
   */
  constructor() {
    super();
    this.state = {};
  }

  /**
   * starts the wizard
   */
  componentWillMount() {
    let descriptorURL = this.props.descriptorURL;
    if (!descriptorURL) {
      throw "descriptorURL should be suplied";
    }
    doRequest(descriptorURL, (data)=>{
      console.log("got wizard descriptor from " + descriptorURL + " : " + data);
      let descriptor = parseDescriptor(data);
      console.log(descriptor);
//      this.addWizardTitle(descriptor);
      this.setState({currentStep: descriptor.main, options: descriptor.main.formConfig.options, value: descriptor.main.data});
    }, this.onError, undefined, undefined, "text");
  }

  /**
   * when step is loaded creates form
   */
  render() {
    if (this.state.errorMessage) {//loading wizard for the first time probably
      return <div className='alert alert-danger'> {this.state.errorMessage} </div>;
    }
    if (this.state.responseStatus == "0" || this.state.responseStatus == "end") {//finishes the wizard
      let message = (this.state.message||"Uspješno ste dovršili unos podataka");
      return <div className="alert alert-success"><i className="glyphicon glyphicon-ok" dangerouslySetInnerHTML={{__html: message}} /></div>;//cleans
    }
    if (!this.state.currentStep) {//loading wizard for the first time probably
      return <div className='alert alert-info'> Loading data...</div>;
    }
    let stepConfig = this.state.currentStep;
    let formDescriptor = stepConfig.formConfig;
    console.log("rendering step:");
    console.log(stepConfig);
    return <WizardStep model={formDescriptor.model} options={this.state.options} 
      value={this.state.value} buttonLabel="Spremi" next={this.onCurrentStepSubmitted.bind(this)}
        title={stepConfig.title} description={stepConfig.description} />;
    
    
  }

  /**
   * when current step su submitted in form, and all client side data verifications are passed.
   * This calls "save" url defined in StepConfiguration
   */
  onCurrentStepSubmitted(value) {
    let state = this.state;
    state.value = value;
    this.setState(state);
    let save = this.state.currentStep.save;
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
    }, (errorMessage)=>this.setState({errorMessage: errorMessage}), save.method, JSON.stringify(value), "text");
  }

  /**
   * processes response from 'save' action
   */
  processResponse(responseData) {
    let descriptor = parseDescriptor(responseData);
    let status = descriptor.status;
    if (!status) {
      console.warn(descriptor);
      console.warn("status field is not defined in response! Finishing the wizard by convention.");
      status = "0";
    }
    let nextState = {responseStatus: status, 
        message: descriptor.message,
        validationErrors: descriptor.validationErrors,
        value: this.state.value,
        currentStep: jQuery.isEmptyObject(descriptor.validationErrors)?descriptor.next:this.state.currentStep
     };
    if (status == "0" || status == "end") {
      console.log("Finishing the wizard");
      this.setState(nextState);
      return;//nothing to do
    }
    if (descriptor.message && descriptor.message != "") {
      alert(descriptor.message);
    }
    this.mergeAsyncErrorsAndSetOptions(nextState);
    this.setState(nextState);
  }

  /**
   * async errors are expected to be something like:
   * {username : "name allready taken", age : "You must be over 18"}
   */
  mergeAsyncErrorsAndSetOptions(state) {
    let asyncSaveErrors = state.validationErrors;
    let initialOptions = state.currentStep.formConfig.options;
    if (jQuery.isEmptyObject(asyncSaveErrors)) {
      state.options = initialOptions;
      return;
    }
    console.log("Logging async save error");  
    console.log(asyncSaveErrors);
    /*creates new options*/
    let newOptions = clone(initialOptions);
    for (let errorField in asyncSaveErrors) {
      let fieldConfig = newOptions.fields[errorField];
      if (!fieldConfig) {
        fieldConfig = {};
        newOptions.fields[errorField] = fieldConfig;
      }
      fieldConfig.hasError = true;
      fieldConfig.error = asyncSaveErrors[errorField];
    }
    console.log("Async errors set in options");
    console.log(newOptions);
    state.options = newOptions;
  }

  /**
   *
   */
  loadNextStep(nextStep) {
    if (nextStep) {
      this.loadWizardStep(nextStep);
    }else {
      console.warn("Next step for status: " + status + 
        " does not exists in wizardConfig. If status is '0' or 'end' wizard will be finished. Otherwise expecting 'next' " +
        "field (with configuration for next step) inside response.");
    }
  }

// end class WizardController (finall bracket follows)
}

UiFormController.propTypes = {
  descriptorURL : React.PropTypes.string.isRequired
}

export default UiFormController;

