(function(){return function(t, aumTcomb) {

var response = {
	status : "2",
	message : "Please fill value greater than 11",
	next : {
	    title : "Verifikacija pin-a",
	    description: "Kako bi omogućili pristup, na vaš broj telefona poslan vam je pin. Molim da ga ovdje unesete.",
	    data : {},
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
return response;
}})();