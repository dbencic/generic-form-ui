import React, { Component } from "react";
import aumTcomb from "aum-tcomb-form-lib";
import t from "tcomb-form";
import jQuery from "jquery";

/***************************************************************
/*********************** start code ****************************
***************************************************************/

var Form = t.form.Form;

var wizardElementId = "wizard-content";
var wizardElementIdSelector = "#" + wizardElementId;


/*let personInstance = {
  name : "Dragan",
  surname: "Bencic",
  dateOfBirth: new Date(),
  accountType: "2"
};*/


/**
 * React class.
 * @param model : model to be edited by this form
 * @param value : edited value (should corespond to passed model)
 * @param options: form options (further describes form)
 * @param next : function to call next when form is compiled correctly
 */
class WizardStep extends Component {

	render() {
      let title = "";
      if (this.props.title) {
        title = <h2>{this.props.title}</h2>;
      }
      let description = "";
      if (this.props.description) {
        description = <div className="alert alert-info">{this.props.description}</div>;
      }
	    return (
	      <div>
          {title}
          {description}
	        <Form type={this.props.model} ref="form" value={this.props.value} options={this.props.options} />
	        <button onClick={this._onClick.bind(this)}>{this.props.buttonLabel || "Save"}</button>
	      </div>
	    );
  	}

  	_onClick() {
	    var value = this.refs.form.getValue();
	    // getValue returns null if validation failed
	    if (value) {
        console.log(value);
        if (this.props.next) this.props.next(value);
	    }
  	}
//end class WizardStep
}


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
      console.log("got descriptor from " + descriptorURL + " : " + data);
      let configFactory = eval(data);
      this.descriptor = configFactory(t, aumTcomb);
      console.log(this.descriptor);
      this.loadWizardStep(this.descriptor.start);
    }, this.onError, undefined, undefined, "text");

  }

  /**
   * Loads data to be edited by the step and then proceedes with form creation
   */
  loadWizardStep(stepToLoad) {
    console.log("loading wizard step:");
    console.log(stepToLoad);
    this.currentStep = stepToLoad;
    jQuery(this.wizardElementIdSelector).html("<div class='alert alert-info'> Loading data...</div>");//cleans
    if (stepToLoad.data) {
      doRequest(stepToLoad.data, (data)=>{
        this.createForm(stepToLoad, data);
      }, this.showError);
    }else {
      this.createForm(stepToLoad);
    }
  }

  /**
   * when step is loaded creates form
   * @param stepConfig configuration of the step
   * @param data data to be edited by form. Can be undefined
   */
  createForm(stepConfig, data) {
    let formDescriptor = stepConfig.formConfig;
    jQuery(this.wizardElementIdSelector).html("");
    try {
      let wizardStep = <WizardStep model={formDescriptor.model} options={formDescriptor.options} 
        value={data} buttonLabel="Spremi" next={this.onCurrentStepSubmitted.bind(this)}
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
      console.log(data);
      this.processResponse(data);
    }, this.showError, save.method, value);
  }

  /**
   * processes response from 'save' action
   */
  processResponse(responseData) {
    if (responseData.message) {
      alert(responseData.message);
    }
    let status = responseData.status;
    if (!status) {
      console.warn(responseData);
      console.warn("status field is not defined in response! Finishing the wizard by convention.");
      status = "0";
    }
    if (status == "0" || status == "end") {
      console.log("Finishing the wizard");
      //finishTheWizard(); //TODO: implement this
      return;//nothing to do
    }
    let responseRouting = this.currentStep.responseRouting;
    if (!responseRouting) {
      console.warn("Current step descriptor's responseRouting is not defined. Aborting response processing.");
      return;
    }
    var nextStepName = responseRouting[status];
    console.log("Next step name from responseRouting by status: " + nextStepName);
    if (nextStepName) {
      let nextStep = this.descriptor[nextStepName];
      if (nextStep) {
        this.loadWizardStep(nextStep);
      }else {
        console.warn("Next step: " + nextStepName + " for status: " + status + 
          " does not exists in wizardConfig. Make sure that wizardConfig contains member: " + nextStepName);
      }
    }else {
      console.warn("Next step for status: " + status + " is not declared. Nothing to do.");
    }
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

let wizard = new Wizard("wizardConfig.js", undefined);
