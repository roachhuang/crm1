    
    sc.onApiLoad(){
        gapi.load('auth', {'callback': onAuthApiLoad});
        gapi.load('picker');
    };
    sc.onAuthApiLoad(){
        window.gapi.auth.authorize({
            'client_id': '',
            'scope': ['https://www.googleapis.com/auth/drive']  // this tells google we want access to the users' g drive
        }, handleAuthResult);   // call after the user authenticates
    };
    sc.handleAuthResult(result){
        if (result && !result.error){
            sc.oauthToken = result.access_token;
            createPicker();
        }
    };
    //  called after successfully authenicating
    sc.createPicker(){
        var picker = new google.picker.PickerBuilder()   // build a new picker obj                
            .setOAuthToken(oauthToken)
            .setDeveloperKey('XXX')
            .addView(new google.picker.DocsUploadView())
            .addView(new google.picker.DocsView())
            .setCallback(pickerCallback)    // when the uploaded file is selected
            .enableFeature(goolge.picker.Feature.MULTISELECT_ENABLED)
            // .enableFeature(goolge.picker.Feature.HIDDEN_NAV)
            .build();
        picker.setVisible(true);    // render the picker modal
    };

    sc.pickerCallback(data){
        if (data.action == google.picker.Action.PICKED){    // only handle file selected event
            alert('URL: ' + data.docs[0].url);
            alert('NAME:' + data.docs[0].name);
        }
        else if (data.action == google.picker.Action.CANCEL){    // only handle file selected event
            alert('URL: ' + data.docs[0].url);
        }
    }