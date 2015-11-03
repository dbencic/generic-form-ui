(function(){return function(t, aumTcomb) {
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
      email: t.maybe(aumTcomb.types.Email),
      age: GreaterThan12,
      dateOfBirth: t.Dat,
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
        },
        dateOfBirth: {
          factory: aumTcomb.form.DateComponent,
          label: "Datum rođenja",
          type: "date",
          className: "pero"
        }
      }
    }
  }

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
  }

  var wizardConfig = {
    buttonLabel: "Dalje",
    main : step1Config
  }

  return wizardConfig;
}})();