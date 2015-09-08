(function(){return function(t, aumTcomb) {

var response = {
	status : "2",
	message : "Autentifikacija uspjela!",
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
	      url: "demo/fullconnect/step3save.js"
	    }
  }
}
return response;
}})();