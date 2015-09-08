(function(){return function(t, aumTcomb) {
  var ChannelAccountOptions = t.enums({
      "1" : "Koristi moj račun 'mmirkovic'",
      "2" : "Želim koristiti novi račun"
  });

  var step1FormConfig = {
    
    model : t.struct({
      channelAccountOptions: ChannelAccountOptions
    }),

    options : {
      //legend: "Molimo odaberite jednu od ponuđenih opcija",
      hasError:false,
      fields: {
        channelAccountOptions: {
          label: "Odaberite Air BnB račun preko kojeg se želite povezati Apartman A2+2 (Kuća Perica)",
          error: "molim odaberite račun"
        }
      }
    }
  }

  var step1Config = {
    title: "Odabir računa",
    formConfig : step1FormConfig,
    data : {
      channelAccountStatus : "2"
    },
    save : {
      method: "GET",
      url: "demo/fullconnect/step1save.js"
    }
  }

  var wizardConfig = {
    title : "Spajanje smještajne jedinice Apartman A2+2 (Kuća Perica) na Air BnB",
    description : "Kako biste se spojili sa kanalom Air BnB morate imati prethodno otvoren račun te, Apartman A2+2 već unesen.",
    main : step1Config
  }

  return wizardConfig;
}})();