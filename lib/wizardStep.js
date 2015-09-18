import React, { Component } from "react";
import aumTcomb from "aum-tcomb-form-lib";
import t from "tcomb-form";
import jQuery from "jquery";
import eventEmitter from "./event-emitter-factory";
import clone from "clone";

var Form = t.form.Form;

/**
 * React class. This is to be used as top level react component
 * @param model : model to be edited by this form
 * @param value : edited value (should corespond to passed model)
 * @param options: form options (further describes form)
 * @param next : function to call next when form is compiled correctly
 */
class WizardStep extends Component {

  constructor() {
    super();
    this.state = {};
    eventEmitter.on("asyncSaveErrors", (asyncSaveErrors)=>this.setAsyncErrors(asyncSaveErrors));
  }

  /**
   * async errors are expected to be something like:
   * {username : "name allready taken", age : "You must be over 18"}
   */
  setAsyncErrors(asyncSaveErrors) {
    if (!asyncSaveErrors) return;
    console.log(asyncSaveErrors);
    /*creates new options*/
    let newOptions = clone(this.state.options);
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
    this.setState({value: this.state.value, options: newOptions});
  }

  /**
   * saves the props in state
   */
  componentWillMount() {
    this.setState({value: this.props.value, options: this.props.options});
  }

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
	        <Form type={this.props.model} ref="form" value={this.state.value} options={this.state.options} />
	        <button onClick={this._onClick.bind(this)}>{this.props.buttonLabel || "Save"}</button>
	      </div>
	    );
  	}

  	_onClick() {
	    var value = this.refs.form.getValue();
	    // getValue returns null if validation failed
	    if (value) {
        this.setState({value: value, options: this.state.options});
        console.log(value);
        if (this.props.next) this.props.next(value);
	    }
  	}


//end class WizardStep
}

WizardStep.propTypes = {
  model : React.PropTypes.func.isRequired,
  value : React.PropTypes.object,
  options: React.PropTypes.object,
  buttonLabel: React.PropTypes.string
}

export default WizardStep;