(function() {

    function validURL(str) {
        var a = document.createElement('a')
        a.href = str
        return (a.host && a.host != window.location.host)
    }

    function validKeywords(str) {
        console.log(str.split(',').length >= 2)
        return str.split(',').length >= 2
    }

    function validateHuman(honeypot) {
        if (honeypot) { //if hidden form filled up
            console.log('Robot Detected!')
            return true
        } else {
            console.log('Welcome Human!')
        }
    }

    // get all data in form and return object
    function getFormData() {
        var form = document.getElementById('gform')
        var elements = form.elements

        var fields = Object.keys(elements).filter(function(k) {
            return (elements[k].name !== 'honeypot')
        }).map(function(k) {
            if (elements[k].name !== undefined) {
                return elements[k].name
                // special case for Edge's html collection
            } else if (elements[k].length > 0) {
                return elements[k].item(0).name
            }
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item
        })

        var formData = {}
        fields.forEach(function(name) {
            var element = elements[name]

            // singular form elements just have one value
            formData[name] = element.value

            // when our element has multiple items, get their values
            if (element.length) {
                var data = []
                for (var i = 0; i < element.length; i++) {
                    var item = element.item(i)
                    if (item.checked || item.selected) {
                        data.push(item.value)
                    }
                }
                formData[name] = data.join(', ')
            }
        })

        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields)
        formData.formGoogleSheetName = form.dataset.sheet || 'responses' // default sheet name
        formData.formGoogleSendEmail = form.dataset.email || '' // no email by default

        console.log(formData)
        return formData
    }

    function handleFormSubmit(event) { // handles form submit without any jquery
        event.preventDefault() // we are submitting via xhr below
        var data = getFormData() // get the values submitted in the form

        // OPTION: Remove this comment to enable SPAM prevention, see README.md
        if (validateHuman(data.honeypot)) { //if form is filled, form will not be submitted
            return false
        }

        function invalidHelper(id) {
            var invalidData = document.getElementById(id)
            var invalidDataHelp = document.getElementById(id + '-help')
            if (invalidData && invalidDataHelp) {
                invalidData.style.border = '0.1rem solid red'
                invalidDataHelp.style.color = 'red'
                return false
            }
        }


        function undoInvalidHelp(id) {
            var invalidData = document.getElementById(id)
            var invalidDataHelp = document.getElementById(id + '-help')
            if (invalidData && invalidDataHelp) {
                invalidData.style.border = '0.1rem solid black'
                invalidDataHelp.style.color = 'black'
                return false
            }
        }
        console.log('data', data)
        console.log(data['First Name'])
        undoInvalidHelp('first-name')
        undoInvalidHelp('surname')
        undoInvalidHelp('location')
        undoInvalidHelp('github')
        undoInvalidHelp('twitter')
        undoInvalidHelp('orcid')
        undoInvalidHelp('google-scholar')
        undoInvalidHelp('website')
        undoInvalidHelp('keywords')


        if (!data['First Name']) {
            invalidHelper('first-name')
        } else if (!data.Surname) {
            invalidHelper('surname')
        } else if (!data.Location) {
            invalidHelper('location')
        } else if (!data.Keywords || !validKeywords(data.Keywords)) {
            invalidHelper('keywords')
        } else if (data.GitHub && !validURL(data.GitHub)) {
            invalidHelper('github')
        } else if (data.Twitter && !validURL(data.Twitter)) {
            invalidHelper('twitter')
        } else if (data.ORCiD && !validURL(data.ORCiD)) {
            invalidHelper('orcid')
        } else if (data['Google Scholar'] && !validURL(data['Google Scholar'])) {
            invalidHelper('google-scholar')
        } else if (!data.Website || !validURL(data.Website)) {
            invalidHelper('website')
        } else {
            disableAllButtons(event.target)
            var url = event.target.action //
            var xhr = new XMLHttpRequest()
            xhr.open('POST', url)
            // xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.onreadystatechange = function() {
                console.log(xhr.status, xhr.statusText)
                console.log(xhr.responseText)
                document.getElementById('gform').style.display = 'none' // hide form
                var thankYouMessage = document.getElementById('thankyou_message')
                if (thankYouMessage) {
                    thankYouMessage.style.display = 'block'
                }
                return
            }
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }).join('&')
            xhr.send(encoded)
        }
    }

    function loaded() {
        console.log('Contact form submission handler loaded successfully.')
        // bind to the submit event of our form
        var form = document.getElementById('gform')
        form.addEventListener('submit', handleFormSubmit, false)
    }
    document.addEventListener('DOMContentLoaded', loaded, false)

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll('button')
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true
        }
    }
})()
