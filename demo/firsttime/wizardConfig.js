(function(){return function(t, aumTcomb) {
  var ChannelAccountStatus = t.enums({
      "0" : "-- Odaberite --",
      "1" : "Već imam otvoren račun i unesene objekte",
      "2" : "Nemam račun na airbnb.com"
  });

  var step1FormConfig = {
    
    model : t.struct({
      channelAccountStatus: ChannelAccountStatus
    }),

    options : {
      //legend: "Molimo odaberite jednu od ponuđenih opcija",
      hasError:false,
      fields: {
        channelAccountStatus: {
          label: "Status računa na airbnb.com",
          error: "molim odaberite status računa"
        }
      }
    }
  }

  var step1Config = {
    title: "Status računa",
    formConfig : step1FormConfig,
    data : {
      channelAccountStatus : "2"
    },
    save : {
      method: "GET",
      url: "demo/firsttime/step1save.js"
    }
  }

  var wizardConfig = {
    title : "Podaci vašeg računa",
    main : step1Config
  }

  return wizardConfig;
}})();