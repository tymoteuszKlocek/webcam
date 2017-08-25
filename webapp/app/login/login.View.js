define([
    'marionette',
    'text!app/login/login.View.html',
    'app/login/login.Model',
], function (Mn, tpl, Model) {
    'use strict';

    var model = new Model();

    return Mn.View.extend({

        model: model,

        template: _.template(tpl),

        className: 'card',
        
        ui: {
            submitLogin: '#submit-login',
            submitNewUser: '#submit-new-user',
            inputUser: '#input-username',
            inputPass: '#input-password',
            inputNewUser: '#input-new-username',
            inputNewPass: '#input-new-password',
            inputConfirmPass: '#input-confirm-password',
            inputEmail: '#email',
            inputReqType: '#input-request-type',
            loginForm: '#login-form',
            newAccountForm: '#new-account-form',
        },

        events: {
            'click @ui.submitLogin': 'sendLoginReq',
            'click @ui.submitNewUser': 'createNewAccountReq',
            'click @ui.inputReqType': 'changeView'
        },

        initialize: function () {
            this.requestType = 'login';
        },

        changeView: function () {
            if (this.ui.newAccountForm.hasClass('hide')) {
                this.ui.loginForm.addClass('hide');
                this.ui.newAccountForm.removeClass('hide');
                this.requestType = 'create-user';
            } else {
                this.ui.newAccountForm.addClass('hide');
                this.ui.loginForm.removeClass('hide');
                this.requestType = 'login';
            }
            console.log('change view', this.requestType)
        },

        sendLoginReq: function () {
            this.model.set('username', this.ui.inputUser.val());
            this.model.set('password', this.ui.inputPass.val()); // should I hash this now?
            this.model.sendRequest(this.requestType);
        },

        createNewAccountReq: function() {
            this.model.set('username', this.ui.inputNewUser.val());
            this.model.set('password', this.ui.inputNewPass.val()); // should I hash this now?
            this.model.set('confirmPassword', this.ui.inputConfirmPass.val());
            this.model.set('email', this.ui.inputEmail.val());
            this.model.sendRequest(this.requestType);
        }

    })
});