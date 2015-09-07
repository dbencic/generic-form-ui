(function(){return function(t, aumTcomb) {

var stepConfig = {
	status : "2",
	message : "Please fill value greater than 11",
	data : {},
	next : {
	    title : "Verifikacija pin-a",
	    description: "Kako bi omogućili pristup, na vaš broj telefona poslan vam je pin. Molim da ga ovdje unesete.",
	    formConfig : {
	      model : t.struct({
	        pin: t.Str
	      }),
	      options: {
	        pin: {label: "Pin"}
	      }
	    },
	    save : {
	      method: "GET",
	      url: "demo/pinsave.js"
	    }
  }
}
return stepConfig;
}})();