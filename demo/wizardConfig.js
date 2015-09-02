(function(){return function(t, aumTcomb) {
  var AccountTypes = t.enums({
      "1" : "Basic",
      "2" : "Normal",
      "3" : "Advanced"
  });

  var step1FormConfig = {
    
    model : t.struct({
      name: t.Str,
      surname: t.Str,
      email: t.maybe(aumTcomb.types.Email),
      age: aumTcomb.types.Positive,
      dateOfBirth: t.Dat,
      accountType: AccountTypes
    }),

    options : {
      hasError:false,
      fields: {
        name: {
          label: "Ime",
          error: "molim unesite ime"
        },
        surname: {
          label: "Prezime"
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
      name : "Dragan",
      surname: "Bencic",
      dateOfBirth: new Date(2000, 10, 12),
      accountType: "2"
    },
    save : {
      method: "GET",
      url: "demo/step1save.json"
    },

    responseRouting: {
      "2" : "verifyPin"
    }
  }

  var verifyPinConfig = {
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
      url: "demo/pinsave.json"
    },

    responseRouting: {
    }
  }

  var wizardConfig = {
    start : step1Config,
    verifyPin : verifyPinConfig
  }

  return wizardConfig;
}})();