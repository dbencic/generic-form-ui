(function(){return function(t) {
  var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  var Email = t.subtype(t.Str, function (address) {
    return emailCheck.test(address);
  }, "Email");


  var AccountTypes = t.enums({
      "1" : "Basic",
      "2" : "Normal",
      "3" : "Advanced"
  });

  var GreaterThan12 = t.subtype(t.Num, function(value) {
    return value > 12;
  });

  var step1FormConfig = {
    
    model : t.struct({
      name: t.Str,
      surname: t.Str,
      email: t.maybe(Email),
      age: GreaterThan12,
      accountType: AccountTypes
    }),

    options : {
      fields: {
        name: {
          label: "Ime",
          error: "molim unesite ime"
        },
        surname: {
          label: "Prezime"
        },
        age: {
          label: "Starost",
          error: "Morate biti stariji od 12 godina"
        },
        email: {
          label: "E-mail",
          type: "email",
          error: "Neispravan format email adrese"
        }
      }
    }
  };

  var step1Config = {
    title: "Unos osobnih podataka",
    formConfig : step1FormConfig,
    data : {
      name : "Drag",
      surname: "Benc",
      dateOfBirth: new Date(2000, 10, 12),
      accountType: "2"
    },
    save : {
      buttonLabel : "Dalje",
      method: "POST",
      url: "/save/step1",
      requestContentType: "application/json; charset=utf-8",
      expectedSaveDurationSeconds : 15
//      requestContentType: "application/x-www-form-urlencoded; charset=UTF-8"
    },
    messageWhenSaving: "Spremam vaše osobne podatke..."
  };

  var wizardConfig = {
    buttonLabel: "Spremi",
    messageWhenSaving: "Spremam podatke na sever, molim pričekajte...",
    main : step1Config
  };

  return wizardConfig;
}})();
