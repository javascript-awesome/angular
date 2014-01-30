# Forms

* <a href='#simple'>Simple form</a>
* <a href='#validation'>Validation</a>

Controls (input, select, textarea) are ways for a user to enter data. A Form is a collection of controls for the purpose of grouping related controls together.
Form and controls provide validation services, so that the user can be notified of invalid input. 

### <a name='#simple'>Simple form</a>

The key directive in understanding two-way data-binding is ngModel. The ngModel directive provides the two-way data-binding by synchronizing the model to the view, as well as view to the model. 

Since the role of forms in client-side Angular applications is different than in classical roundtrip apps, it is desirable for the browser not to translate the form submission into a full page reload that sends the data to the server. Instead some javascript logic should be triggered to handle the form submission in an application-specific way.

For this reason, Angular prevents the default action (form submission to the server) unless the <form> element has an action attribute specified.

You can use one of the following two ways to specify what javascript method should be called when a form is submitted:

* ngSubmit directive on the form element
* ngClick directive on the first button or input field of type submit (input[type=submit])

To prevent double execution of the handler, use only one of the ngSubmit or ngClick directives. This is because of the following form submission rules in the HTML specification:

* If a form has only one input field then hitting enter in this field triggers form submit (ngSubmit)
* if a form has 2+ input fields and no buttons or input[type=submit] then hitting enter doesn't trigger submit
* if a form has one or more input fields and one or more buttons or input[type=submit] then hitting enter in any of the input fields will trigger the click handler on the first button or input[type=submit] (ngClick) and a submit handler on the enclosing form (ngSubmit)

#### Parameters
* <b>Name</b> of the form. If specified, the form controller will be published into related scope, under this name.

#### Sample

    <form novalidate class="simple-form">
      Name: <input type="text" ng-model="user.name" /><br />
      E-mail: <input type="email" ng-model="user.email" /><br />
      Gender: <input type="radio" ng-model="user.gender" value="male" />male
      <input type="radio" ng-model="user.gender" value="female" />female<br />
      <button ng-click="reset()">RESET</button>
      <button ng-click="update(user)">SAVE</button>
    </form>

So

* <b>novalidate</b> - is used to disable browser's native form validation;
* <b>user</b> - main form model with fields: name, email, gender;
* <b>reset() & update(user)</b> - is methods for form actions, you should put it into relative controller.


### <a name='#validation'>Validation</a>

In Angular forms can be nested. This means that the outer form is valid when all of the child forms are valid as well. However, browsers do not allow nesting of <form> elements, so Angular provides the ngForm directive which behaves identically to <form> but can be nested. 

Form properties:
* <b>myForm.myInput.$valid</b> - is set "true" if element "myInput" is valid
* <b>myForm.myInput.$error</b> - show all "myInput"'s errors
* <b>myForm.$invalid</b> - is set "true" if the form is invalid
* <b>myForm.$error.required</b> - show false if all required fields are filled

#### Sample

    <form name="form" class="css-form" novalidate>
       Name: <input type="text" ng-model="user.name" name="uName" required /><br />
       E-mail: <input type="email" ng-model="user.email" name="uEmail" required/><br />
       <div ng-show="form.uEmail.$dirty && form.uEmail.$invalid">Invalid:
         <span ng-show="form.uEmail.$error.required">Tell us your email.</span>
         <span ng-show="form.uEmail.$error.email">This is not a valid email.</span>
       </div>
       Gender: <input type="radio" ng-model="user.gender" value="male" />male
       <input type="radio" ng-model="user.gender" value="female" />female
       <button ng-click="reset()">RESET</button>
       <button ng-click="update(user)" ng-disabled="form.$invalid">SAVE</button>
    </form>

So

* <b>form.$invalid</b> - we use form name to check is all her components valid;
* <b>name="uName" & name="uEmail"</b> - we put name to components in case to check separatly their valid like: 
```
<div ng-show="form.uEmail.$dirty && form.uEmail.$invalid">Invalid:
   <span ng-show="form.uEmail.$error.required">Tell us your email.</span>
   <span ng-show="form.uEmail.$error.email">This is not a valid email.</span>
</div>
```
### For deatils info look at:

* http://docs.angularjs.org/guide/forms
* http://docs.angularjs.org/api/ng.directive:form



