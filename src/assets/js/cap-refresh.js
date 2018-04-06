function capt() {
  alert("Captcha works!!!");
  jQuery("#captch").empty();
  jQuery("<app-captcha>Loading captcha</app-captcha>").appendTo("#captch");
}
