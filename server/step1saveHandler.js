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
	
	response.render("step1saveResponse.ejs", {
		validationErrors: validationErrors,
		message: message
	});
}