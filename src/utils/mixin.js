export const setLocalStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.localStorage.setItem(key, val);
};

export const getLocalStorage = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key);
};

export const removeLocalStorage = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
};

export const setSessionStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, val);
};

export const getSessionStorage = (key) => {
  if (!key) return;
  return window.sessionStorage.getItem(key);
};

export const removeSessionStorage = (key) => {
  if (!key) return;
  window.sessionStorage.removeItem(key);
};

export const search = (key) => {
  if (!key) return;
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  let url = window.location.hash == '' ? window.location.search : window.location.hash.substring(window.location.hash.indexOf('?'));
  let r = url.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
/*
 * 時間戳轉时间格式
 * */
export const getDate = (time) => {
  let theTime = time.toString();
  if (theTime.length === 10) {
    theTime = theTime * 1000
  }
  let now = new Date(theTime),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
};
/*
 * 校验手机号
 * */
export const checkMobile = (mobile) => {
  if (mobile === '') {
    return false;
  }
  let mobileReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (mobileReg.test(mobile)) {
    return true;
  } else {
    return false;
  }
};
/*
 * 校验密码
 * */
export const checkPwd = (pwd) => {
  if (pwd.length < 6) {
    return false;
  }
  let pwdReg = /^[\w]{6,12}$/
  if (pwdReg.test(pwd)) {
    return true
  } else {
    return false
  }
}


/* 
  获取每年的天数
*/
export const getDayCountOfYear = function(year) {
  const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  return isLeapYear ? 366 : 365;
};
/* 
  获取每月的第一天星期几
*/
export const getFirstDayOfMonth = function(date) {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};
/* 
  获取每月的天数
*/
export const getDayCountOfMonth = function(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }
  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }
  return 31;
};
//修改日期
export const modifyDate = function(date, y, m, d) {
  return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};

export const changeYearMonthAndClampDate = function(date, year, month) {
  // clamp date to the number of days in `year`, `month`
  // eg: (2010-1-31, 2010, 2) => 2010-2-28
  const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
  return modifyDate(date, year, month, monthDate);
};
/* 
  获取上一年
*/
export const prevYear = function(date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year - amount, month);
};
/* 
  获取下一年
*/
export const nextYear = function(date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year + amount, month);
};

export const prevMonth = function(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 0
    ? changeYearMonthAndClampDate(date, year - 1, 11)
    : changeYearMonthAndClampDate(date, year, month - 1);
};

export const nextMonth = function(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 11
    ? changeYearMonthAndClampDate(date, year + 1, 0)
    : changeYearMonthAndClampDate(date, year, month + 1);
};

