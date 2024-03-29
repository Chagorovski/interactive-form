// Global varible(s)
const $otherTitle =  $("#other-title");
const $designField = $('#design');
const $colorField = $('#color');
const $colorLabel = $('#colors-js-puns label');
const $totalActivityLabel = $('<span></span>').css('color','darkred');
var $activityCheckbox = $('input[type=checkbox]');

$('#name').focus();

$otherTitle.css('display', 'none'); 

$("#title").change(function() {  
    if ($('#title').val() == "other") {   
        $otherTitle.slideDown(900);
    } else {
        $otherTitle.slideUp();
    }
  }
);

// Updating the color field 
$colorField.hide();
$colorLabel.hide();
$('#design option:first').attr('hidden',true);

// Listen for changes
$designField.change(() => {
    $colorField.prepend(new Option("Please select a Theme","select-color"));
    if ($designField.val() === 'js puns')  {
        $colorField.show();
        $colorLabel.show();
        $("#color option[value='cornflowerblue']").prop('selected', true);
        $("#color option[value='select-color']").hide();
        $("#color option[value='tomato']").hide();
        $("#color option[value='steelblue']").hide();
        $("#color option[value='dimgrey']").hide();
        $("#color option[value='cornflowerblue']").show(); 
        $("#color option[value='darkslategrey']").show();
        $("#color option[value='gold']").show();
    }else if ($designField.val() === 'heart js') {
        $colorField.show();
        $colorLabel.show();
        $("#color option[value='tomato']").prop('selected', true);
        $("#color option[value='select-color']").hide();
        $("#color option[value='cornflowerblue']").hide(); 
        $("#color option[value='darkslategrey']").hide();
        $("#color option[value='gold']").hide();
        $("#color option[value='tomato']").show();
        $("#color option[value='steelblue']").show();
        $("#color option[value='dimgrey']").show();
    } else {
        $colorField.show();
        $colorLabel.show();
        $("#color option[value='select-color']").prop('selected', true);
        $("#color option[value='tomato']").hide();
        $("#color option[value='steelblue']").hide();
        $("#color option[value='dimgrey']").hide();
        $("#color option[value='cornflowerblue']").hide(); 
        $("#color option[value='darkslategrey']").hide();
        $("#color option[value='gold']").hide();
    }
});

//  Register for Activities- section
$('.activities').append($totalActivityLabel);
let $totalActivityCost = 0;

// Calculating the the selected activities
$('.activities').change((event) => {
    let $clickedInputElement = $(event.target);
    let $getDataCosts = $clickedInputElement.attr('data-cost');
    let $stringToNumber = $getDataCosts.replace(/\D/g,'');
    
    if ($clickedInputElement.is(':checked')) {
        let calculate = parseInt($stringToNumber,10);   
        $totalActivityCost = $totalActivityCost + calculate;
        $totalActivityLabel.show();
    } else {
        let calculate = parseInt($stringToNumber,10);
        $totalActivityCost = $totalActivityCost - calculate;  
        $totalActivityLabel.show();
    };
// Adding the total price <span> and hidding when the cost is 0
    $totalActivityLabel.text('Total: $' + $totalActivityCost);

    if ($totalActivityLabel.text() === 'Total: $0') {
        $totalActivityLabel.hide();
    };
    let $dayAndTime = $clickedInputElement.attr('data-day-and-time');
    
// Disabling conflicting activities
    $('.activities input').each(function() {
      const $justClickedActivity = $(this);
      if ($justClickedActivity.attr('data-day-and-time') === $dayAndTime && $clickedInputElement != $justClickedActivity ) {
        if ($clickedInputElement.prop('checked') === true) {
            $justClickedActivity.attr('disabled',true);
            $clickedInputElement.attr('disabled',false);
        } else {
            $justClickedActivity.attr('disabled',false);
            $clickedInputElement.attr('disabled',false);
        }
      }
    })
});

// Payment Section
const $hideSelectPayment = $('option[value="select method"]').hide();
const $paymentInfo = $('#payment');
const $crediCard = $('option[value="Credit Card"]');
const $payPal = $('#paypal').hide();
const $bitCoin = $('#bitcoin').hide();
$crediCard.attr('selected',true);

$paymentInfo.change(() => {
  if($paymentInfo.val() === 'Credit Card') {
      $crediCard.attr('selected',true);
      $('#credit-card').show();
      $payPal.hide();
      $bitCoin.hide();
  }else if ($paymentInfo.val() === 'PayPal') {
      $('option[value="PayPal"]').attr('selected',true);
      $('#credit-card').hide();
      $payPal.show();
      $bitCoin.hide();
  }else if ($paymentInfo.val() === 'Bitcoin') {
      $('option[value="Bitcoin"]').attr('selected',true);
      $('#credit-card').hide();
      $payPal.hide();
      $bitCoin.show();
  }
});

// Form Validation and Validation Messages
var $nameErrorMsg = $('<label></label>').css('color','red');
var $emailErrorMsg = $('<label></label>').css('color','red');
var $activityErrorMsg = $('<label></label>').css('color','red');
var $ccErrorMsg = $('<label></label>').css('color','red');
var $zipErrorMsg = $('<label></label>').css('color','red');
var $cvvErrorMsg = $('<label></label>').css('color','red');

$nameErrorMsg.hide();
$emailErrorMsg.hide();
$activityErrorMsg.hide();
$ccErrorMsg.hide();
$zipErrorMsg.hide();
$cvvErrorMsg.hide();

// Performing focusout on the inputs and validating with validateSubmit() function
$('#name').keyup(function () {
  validateSubmit(/^[a-zA-Z]*$/, $('#name'),$nameErrorMsg,"Name field can't be blank","Name should contain only Characters");
});
$('#mail').keyup(function () {
  validateSubmit(/^\S+@\S+\.\S+$/, $('#mail'),$emailErrorMsg,"Email field is blank","Invalid Email Format");
});
$('#cc-num').keyup(function () {
  validateSubmit(/^[0-9]{13,16}$/, $('#cc-num'),$ccErrorMsg,"Insert Card Number","Insert minimum 13 numbers");
});
$('#zip').keyup(function () {
  if ($crediCard.prop('selected')) {
      validateSubmit(/^[0-9]{5}$/, $('#zip'),$zipErrorMsg,"Insert Zip Code","Insert 5 digits");
  }
});
$('#cvv').keyup(function () {
  if ($crediCard.prop('selected')) {
      validateSubmit(/^[0-9]{3}$/, $('#cvv'),$cvvErrorMsg,"Insert CVV Code","Insert 3 digits");
  }
});

// Activity validation if user don't check any field
function validateActivity () {
  $('.activities').append($activityErrorMsg);

  if ($activityCheckbox.is(':checked') === 0) {
      $activityErrorMsg.hide();
      return true;
  } else {
      $activityErrorMsg.html('You have to choose at least one activity');
      $activityErrorMsg.show();
      return false;
  }
};

$activityCheckbox.click(function () {
    $activityErrorMsg.hide();
})

// Validate main function
function validateSubmit (regex,selectItem,selectError,errorMsgElif,errorMsgElse) {
  var pattern = regex;
  var tested = selectItem.val();
  selectItem.after(selectError);

  if (pattern.test(tested) && tested !== '') {
      selectError.hide();
      selectItem.css("border-bottom","2px solid #34F458");
      return true;
  } else if (tested === ''){
      selectError.html(errorMsgElif);
      selectError.show();
      selectItem.css("border-bottom","2px solid #F90A0A");
      return false;
  } else {
      selectError.html(errorMsgElse);
      selectError.show();
      selectItem.css("border-bottom","2px solid #F90A0A");
      return false;
  }
};

// Form validaiton for right inputs
$('form').submit(function (e){
 
  if (!validateSubmit(/^[a-zA-Z]*$/, $('#name'),$nameErrorMsg,"Name field can't be blank","Name should contain only Characters")) {
      e.preventDefault();
  } else {
      $nameErrorMsg.hide();
  };

  if (!validateSubmit(/^\S+@\S+\.\S+$/, $('#mail'),$emailErrorMsg,"Email field is blank","Invalid Email Format")) {
      e.preventDefault();
  } else {
      $emailErrorMsg.hide();
  };

  if ($('.activities input[type=checkbox]:checked').length === 0) {
      e.preventDefault();
      validateActivity ();
  } else {
      $activityErrorMsg.hide();
  };

  if ($paymentInfo.val() === 'Credit Card') {
    if (!validateSubmit(/^[0-9]{13,16}$/, $('#cc-num'),$ccErrorMsg,"Insert Card Number","Insert minimum 13 numbers")){
      e.preventDefault();
    } else {
      $ccErrorMsg.hide();
    };
    if (!validateSubmit(/^[0-9]{5}$/, $('#zip'),$zipErrorMsg,"Insert Zip Code","Insert 5 digits")) {
      e.preventDefault();
    } else {
      $zipErrorMsg.hide();
    };
    if (!validateSubmit(/^[0-9]{3}$/, $('#cvv'),$cvvErrorMsg,"Insert CVV Code","Insert 3 digits")) {
      e.preventDefault();
    } else {
      $cvvErrorMsg.hide();
    };  
  } else if ($paymentInfo.val() === 'PayPal') {
      $('#bitcoin').attr('required',false);
  } else if ($paymentInfo.val() === 'Bitcoin') {
      $('#paypal').attr('required',false);
  };
});
