import React, { Component } from "react";
import aumTcomb from "aum-tcomb-form-lib";
import t from "tcomb-form";
import jQuery from "jquery";

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
  }

  render() {

	    return (
	      <div>
          {this.getTitle()}
          {this.getDescription()}
	        <Form type={this.props.model} ref="form" value={this.props.value} options={this.props.options} />
	        <button {...this.getButtonAttributes()}>{this.getButtonLabel()}</button>
	      </div>
	    );
  	}

    /**
     * if client validation is OK, ivokes form processing
     */
  	_onClick() {
	    var value = this.refs.form.getValue();
	    // getValue returns null if validation failed
	    if (value) {
        console.log(value);
        if (this.props.next) this.props.next(value);
	    }
  	}

    /**
     * returns button atributes
     */
    getButtonAttributes() {
      let buttonAttrs = {
        onClick : this._onClick.bind(this),
        className : "btn btn-primary"
      };
      if (this.props.saving) {
        buttonAttrs.disabled="true";
      }
      return buttonAttrs;
    }

    /**
     * returns wizard step title
     */
    getTitle() {
      let title = "";
      if (this.props.title) {
        title = <h2>{this.props.title}</h2>;
      }
      return title;
    }

    /**
     * returns wizard step description
     */
    getDescription() {
      let description = "";
      if (this.props.description) {
        description = <div className="alert alert-info">{this.props.description}</div>;
      }
      return description;
    }

    /**
     * returns text to be shown on button
     */
    getButtonLabel() {
      let buttonlabel = (this.props.buttonLabel || "Spremi");
      if (this.props.saving) {
        buttonlabel = (this.props.savingButtonLabel || "Spremam vaše podatke na server, molim pričekajte....");
      }
      return buttonlabel;
    }

//end class WizardStep
}

WizardStep.propTypes = {
  model : React.PropTypes.func.isRequired,
  next: React.PropTypes.func.isRequired,
  value : React.PropTypes.object,
  options: React.PropTypes.object,
  buttonLabel: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  saving: React.PropTypes.boolean,
  savingButtonLabel: React.PropTypes.string,
}

export default WizardStep;