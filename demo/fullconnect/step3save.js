(function(){return function(t, aumTcomb) {

var Listings = t.enums({
      "1" : "Apartment Blue 2 + 2",
      "2" : "Apartment Green 2 + 2",
      "3" : "Apartment 2 + 2",
  });

var response = {
	status : "2",
	message : "Pin uspješno verificiran!",
	next : {
	    title : "Povezivanje smještaje jedinice Apartman 2 + 2 sa jedinicom unesenom u Air BnB",
	    description: "Ovo je poslijednji korak, potreban kako bismo znali sa kojim 'listingom' sinkronizirati podatke.",
	    data : {listings : "3"},
	    formConfig : {
	      model : t.struct({
	        listings: Listings
	      }),
	      options: {
	        fields: {
	        	listings : {
	        		label: "Air BnB Listing"
	        	}
	        }
	      }
	    },
	    save : {
	      method: "GET",
	      url: "demo/fullconnect/complete.js"
	    }
  }
}
return response;
}})();