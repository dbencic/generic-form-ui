import React, { Component } from "react";
import aumTcomb from "aum-tcomb-form-lib";
import t from "tcomb-form";
import jQuery from "jquery";

var Form = t.form.Form;

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

export default WizardStep;