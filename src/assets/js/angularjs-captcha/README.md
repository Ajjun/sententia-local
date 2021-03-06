## BotDetect Captcha AngularJS Module (JavaScript / Angular 1.x)

### Quick guide:

##### 1) Captcha AngularJS Module Installation
```sh
npm install angularjs-captcha --save
```
##### 2) Include Captcha AngularJS Module in Your Web App
```html
<script src="node_modules/angularjs-captcha/dist/angularjs-captcha.min.js"></script>
```
##### 3) Add Captcha AngularJS Module to Your AngularJS Module
```javascript
var app = angular.module('app', ['BotDetectCaptcha']);

app.config(function(captchaSettingsProvider) {
  ...
  
  captchaSettingsProvider.setSettings({
    captchaEndpoint: '/botdetect-java-captcha-api-path-at-server-side/botdetectcaptcha'
  });
});
```

##### 4) Display Captcha In AngularJS Template
```html
<botdetect-captcha styleName="exampleCaptcha"></botdetect-captcha>
```

##### 5) Validate Captcha on the Client-side
```html
<input 
  type="text" 
  id="captchaCode"
  name="captchaCode"
  ng-model="captchaCode" 
  correct-captcha
>
```
##### 6) Validate Captcha on the Server-side
The client-side Captcha validation is just a usability improvement. Captcha protects some action on a server-side, and therefore Captcha validation has to be there as well.

Server-side Captcha validation with [Java Captcha](https://captcha.com/java-captcha.html) looks in this way:
```java
// validate captcha
SimpleCaptcha captcha = SimpleCaptcha.load(request);
boolean isHuman = captcha.validate(captchaCode, captchaId);
```
### Docs:
 
[AngularJS CAPTCHA Integration Guide](https://captcha.com/angular-captcha.html#angularjs)

### Code Examples: 
1. [Basic AngularJS CAPTCHA Example](https://captcha.com/doc/angular/examples/angular-basic-captcha-example.html#angularjs)

2. [AngularJS CAPTCHA Form Example](https://captcha.com/doc/angular/examples/angular-form-captcha-example.html#angularjs)


### Dependencies:
Captcha AngularJS module uses Captcha library for Captcha image and Captcha sound generation. At the moment challenges are generated in Java backend with [BotDetect Java Captcha library](https://captcha.com/java-captcha.html), but BotDetect PHP and BotDetect ASP.NET are going to work with Captcha AngularJS module soon as well.


### Technical Support:

Through [contact form on captcha.com](https://captcha.com/contact.html).
