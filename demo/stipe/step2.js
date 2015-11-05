(function () {
    return function (t, aumTcomb) {
        var PropertyEnum = t.enums({
            "FACEBOOK": "Facebook", 
        "GOOGLE": "Google"
        });
        return {
            status: "1",
            next: {
                //
                title: "Enter channel credentials",
                formConfig: {
                    model: t.struct({
                        username: t.String,
                        password: t.String
                        ,oauth: t.maybe(PropertyEnum)
                    }),
                    options: {
                        //legend: "Molimo odaberite jednu od ponudjenih opcija",
                        hasError: false,
                    error: "null",
                    fields: {
                        username: {
                            label: "Username",
                            error: "enter airbnb.com username"
                        },
                        password: {
                            label: "Password",
                            type: "password",
                            error: "enter airbnb.com password"
                        }
                        , oauth: {
                            label: "OAuth",
                            error: "enter OAuth type"
                        }
                    }
                }
            }, data: {
                username: "marko.stipanov@gmail.com",
                password: "**********#########********#######******#####****###**#",
                oauth: "FACEBOOK"
            },
            save: {
                method: "POST",
                url: "/channel-manager/api/channel-account/5/listing/373/setup/wizard.js?step=3"
            }
        }
    }
    }
})();