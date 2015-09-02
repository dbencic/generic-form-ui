let AccountTypes = t.enums({
    "1" : "Basic",
    "2" : "Normal",
    "3" : "Advanced"
});

let step1FormConfig = {
  
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
    // you can use strings or JSX
    error: <i>Provjerite vrijednosti parametara</i>,
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

let step1Config = {
  title: "Unos osobnih podataka",
  formConfig : step1FormConfig,
  data : "personInstance.json",
  save : {
    method: "GET",
    url: "step1save.json"
  },

  responseRouting: {
    "2" : "verifyPin"
  }
}

let verifyPinConfig = {
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
    url: "pinsave.json"
  },

  responseRouting: {
  }
}

let wizardConfig = {
  start : step1Config,
  verifyPin : verifyPinConfig
}