var express = require('express');
var router = express.Router();

const BASE_PATH = 'apply/v23/wt-alt-formats-3';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/apply/v23';



// Do you need an alternative format?
router.post('/guard', function (req, res) {
  const answer = req.body.altFormatNeeds;

  if (answer === 'yes-alt-formats') {
    res.redirect(`${ABS_BASE_PATH}/phone-contact-preference`);
  } else {
    res.redirect(`${NEXT_PATH}/condition`);
  }
});



// What do you need instead of a phone call?
router.post('/phone-contact-preference', function (req, res) {
  const answer = req.body.phoneContactPreference;

  if (answer === 'relay-uk') {
    res.redirect(`${ABS_BASE_PATH}/contact-phone-af-relay`);
  } else if (answer === 'textphone') {
    res.redirect(`${ABS_BASE_PATH}/contact-phone-af-textphone`);
  } else if (answer === 'email-af-phone') {
    res.redirect(`${ABS_BASE_PATH}/letters-contact-preference`);
  }else {
    res.redirect(`${ABS_BASE_PATH}/letters-contact-preference`);
  }
});




// What do you need instead of a standard letter?
router.post('/letters-contact-preference', function (req, res) {
  let data = req.session.data;
  let answer;

  if (data['lettersContactPreference']) {
    answer = data['lettersContactPreference'];
  } else {
    answer = [];
  };

  answer = [].concat(answer);
  console.log(answer, typeof answer);

  if (answer.includes('audio')) {
    res.redirect(`${ABS_BASE_PATH}/audio`);
  } else if (answer.includes('braille')) {
    res.redirect(`${ABS_BASE_PATH}/braille`);
  } else if (answer.includes('coloured-paper')) {
    res.redirect(`${ABS_BASE_PATH}/coloured-paper`);
  } else if (answer.includes('coloured-paper-large-print')) {
    res.redirect(`${ABS_BASE_PATH}/coloured-paper`);
  } else if (answer.includes('email-af')) {
    res.redirect(`${NEXT_PATH}/condition`);
  } else if (answer.includes('large-print')) {
    res.redirect(`${ABS_BASE_PATH}/large-print`);
  } else {
    res.redirect(`${NEXT_PATH}/condition`);
  }

});

/*
// What is your email address? Reasonable ajdustment email
router.post('/before/email', function (req, res) {
  const emailAddress = req.session.data['emailaddress'];
 
  console.log('emailAddress: ' + emailAddress);
 
  res.locals.emailAddress = emailAddress;
});
*/

module.exports = router;
