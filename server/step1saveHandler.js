module.exports = function(request, response) {

	var validationErrors = {};
	console.log(request.body);
	var body = request.body;
	if (body.name.length <= 5) {
		validationErrors["name"] = "Please select name longer that 5 chars";
	}
	if (body.surname.length <= 4) {
		validationErrors["surname"] = "Please use surname name longer that 4 chars";
	}
	var message = "";
	var keys = Object.keys(validationErrors);
	if (keys.length > 0) {
		message = "Provjerom na serveru ustanovljena je neispravnost pojedinih polja. Molimo ispravite parametre označene crveno.";
	}
	
	//simulira zadršku na serveru kako bi simulirao save message
	this.setTimeout(function() {
		response.render("step1saveResponse.ejs", {
			validationErrors: validationErrors,
			message: message
		})
		}, 1000);
}
