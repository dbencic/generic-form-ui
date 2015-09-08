(function(){return function(t, aumTcomb) {

return {
	status : "1",
	next : {
	    title : "Unos podataka za login",
	    description: "Kako bi vas povezali sa Air BnB, unesite pristupne podatke. Garantiramo privatnost vaših podataka.",
	    data : {},
	    formConfig : {
	      model : t.struct({
	        username: t.Str,
	        password: t.Str
	      }),
	      options: {
	        pin: {
	        	username: {
	        		label: "Korisničko ime"
	        	}
	        },
	        password: {
	        	name: {
	        		label: "Lozinka"
	        	},
	        	type: "password"
	        }
	      }
	    },
	    save : {
	      method: "GET",
	      url: "demo/fullconnect/step2save.js"
	    }
  }
}

}})();