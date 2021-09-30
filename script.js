function reverseStr(str){
  var charList = str.split('');
  var reverseCharList = charList.reverse();
  var reversedStr = reverseCharList.join('');
  return reversedStr;
}

function isPalindrome(str){
  var reversedString = reverseStr(str);
  return str === reversedString;
}

// console.log(isPalindrome('racecar'));
// console.log(isPalindrome('momo'));

function convertDateToString(date){
  var dateStr = {day:'', month:'', year:''};
 
  if(date.day < 10){
    dateStr.day = '0' + date.day;
  }
  else {
    dateStr.day = date.day.toString();
  }

   if(date.month < 10){
    dateStr.month = '0' + date.month;
  }
  else {
    dateStr.month = date.month.toString();
  }
  
  dateStr.year = date.year.toString();
  return dateStr;
}

 var date = {day:4, month:11, year: 2020};
// var date = {
//   day:11, 
//   month:2,
//   year: 2020 };
// console.log(convertDateToString(date));

function getDateInAllFormats(date){
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

var dateString = convertDateToString(date);
// console.log(getDateInAllFormats(dateString));

function checkPalindromeForAllDateFormats(date){
  var listOfDateFormats = getDateInAllFormats(date);

  var palindromeList = [];

  for (var i = 0; i < listOfDateFormats.length; i++) {
    var result = isPalindrome(listOfDateFormats[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

console.log(checkPalindromeForAllDateFormats(dateString));

function isLeapYear(year) {

  if (year % 400 === 0)
    return true;

  if (year % 100 === 0)
    return false;

  if (year % 4 === 0)
    return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  }
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
}


function getNextPalindromeDate(date) {

  var nextDate = getNextDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = convertDateToString(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

console.log(getNextPalindromeDate(date));

var bdayInput = document.querySelector('#bday-input');
var showBtn = document.querySelector('#show-btn');
var resultDiv = document.querySelector('#result');

function clickHandler(e) {
  var bdayString = bdayInput.value;
  if(bdayString !== ''){
    console.log(bdayString);
  }

var bdayString = bdayInput.value;

  if (bdayString !== '') {
    var date = bdayString.split('-');
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };

    var dateStr = convertDateToString(date);
    var list = checkPalindromeForAllDateFormats(dateStr);
    var isDatePalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isDatePalindrome = true;
        break;
      }
    }

    if (!isDatePalindrome) {
      const [ctr1, nextDate] = getNextPalindromeDate(date);

        resultDiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
      

    } else {
      resultDiv.innerText = 'Yay! Your birthday is palindrome!';
    }
  }
}

showBtn.addEventListener('click', clickHandler);

