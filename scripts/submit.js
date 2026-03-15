const contactForm = document.querySelector("#contact-form");
$(".form-status .success, .form-status .error").hide();
$.validator.addMethod('pattern', function (value, element, param) {
  return this.optional(element) || value.match(param);
}, 'This value doesn\'t match the acceptable pattern.');

$("#contact-form").validate({
  submitHandler: function (form) {

    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) return;

    (function () {
      emailjs.init('3cJAxWF0djjsGN5Uw');
    })();

    // sending/fetching data from the server
    emailjs.sendForm('contact_service', 'contact_form_2026', form)
      .then(function () {
        // console.log('SUCCESS!');
        $(".form-status .error").hide();
        $(".form-status .success").fadeIn();
        $(form).remove();
      }, function (error) {
        // console.log('FAILED...', error);
        $(".form-status .error").show();
      });

    return false;
  },
  errorPlacement: function (error, element) {
    if (element.is("#g-recaptcha-response")) {
      error.appendTo($(".g-recaptcha").parent()); // Append to the parent label/div
    } else {
      error.insertAfter(element); // Use default placement for other elements
    }
  },
  ignore: ".ignore",
  rules: {
    phone: {
      pattern: '^[(]?[0-9]{3}[)]?[ ,-]?[0-9]{3}[ ,-]?[0-9]{4}$'
    },
    'g-recaptcha-response': {
      required: true
    }
  },
  messages: {
    name: 'Enter your name.',
    email: {
      required: 'Enter your email address.',
      email: 'Enter a valid email address.'
    },
    phone: {
      pattern: 'Enter a valid phone number.'
    },
    reason: {
      required: "Select a reason for contacting."
    },
    message: {
      required: "Enter your message."
    },
    'g-recaptcha-response': {
      required: "Complete reCAPTCHA before submitting."
    }
  }
});