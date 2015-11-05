(function () {
    return function (t, aumTcomb) {
        return {
            status: "1",
            title: "Register channel account",
            main: {
                title: "Account type",
                formConfig: {
                    model: t.struct({
                        channelAccountId: t.enums({
                            "NEW_ACCOUNT": "New account",
                            "5": "marko.stipanov@gmail.com"
                        })
                    }),
                    options: {
                        hasError: false,
                        error: null,
                        fields: {
                            channelAccountId: {
                                label: "Account",
                                error: "please choose the service you wan't to add"
                            }
                        }
                    }
                },
                data: {
                    channelAccountId: "5"
                },
                save: {
                    method: "GET",
                    url: "/demo/stipe/step2.js"
                }
            }
        };
    }
})();