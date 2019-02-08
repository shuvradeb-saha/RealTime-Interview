$(document).ready(function () {
    const url = "https://api.judge0.com/submissions"

    function getExampleRef() {
        var ref = firebase.database().ref();
        var hash = window.location.hash.replace(/#/g, '');
        if (hash) {
            ref = ref.child(hash);
        } else {
            ref = ref.push(); // generate unique location.
            window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
        }
        if (typeof console !== 'undefined') {
            console.log('Firebase data: ', ref.toString());
        }
        return ref;
    }

    var config = {
        apiKey: "AIzaSyDIj1NLnXxGN9h_3aoE1TMSvBcsyiMTD8o",
        authDomain: "test-1aa2a.firebaseapp.com",
        databaseURL: "https://test-1aa2a.firebaseio.com",
        projectId: "test-1aa2a"
    };
    firebase.initializeApp(config);

    var firepadRef = getExampleRef();

    var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
        lineNumbers: true,
        styleActiveLine: true,
        styleActiveSelected: true,
        mode: 'javascript',
        matchTags: {
            bothTags: true
        },
        extraKeys: {
            "Ctrl-J": "toMatchingTag"
        }

    });

    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        userid: "hellos",
        defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
    });
    var whatMessage;

    $('#submit').click(function () {
        console.log(firepad.getText())
        console.log(btoa(firepad.getText()))
        $.ajax({
            type: "POST",
            url: url + "?base64_encoded=true",
            data: {
                "source_code": btoa(firepad.getText()),
                "language_id": 29,
                "expected_output": "SGVsbG8gV29ybGQ=",
                "stdin": "kjdksajd"
            },
            success: function (json) {
                setTimeout(function () {
                    console.log(firepad.getText())
                    console.log(json.token)
                    getResult(json.token)
                    console.log("What " + whatMessage)
                    // while (breakFunction(whatMessage) == true) {

                    //     // await sleep(1000)
                    //     res = getResult(json.token)
                    // }
                }, 2000)

            },


        })
    });




    function getResult(token) {
        const getUrl = url + "/" + token;
        $.ajax({
            type: "GET",
            url: getUrl,
            success: function (json) {
                console.log('Res: ' + json.status.description)
                whatMessage = json.status.description;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }

        })


    }
});