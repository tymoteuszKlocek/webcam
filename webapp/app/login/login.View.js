define([
    'backbone',
    'marionette',
    'text!app/login/login.View.html',
    'app/login/login.Model',
    'app/auth',
    'app/common/info/info.View'
], function (Bb, Mn, tpl, Model, Auth, Info) {
    'use strict';

    return Mn.View.extend({

        model: new Model(),

        template: _.template(tpl),

        className: 'card',

        regions: {
            info: '#info'
        },

        ui: {
            submitLogin: 'input[name=submit-login]',
            submitNewUser: 'input[name=submit-register]',
            inputUser: 'input[name=username]',
            inputPass: 'input[name=password]',
            inputNewUser: 'input[name=new-username]',
            inputNewPass: 'input[name=new-password]',
            inputConfirmPass: 'input[name=confirm-password]',
            inputEmail: 'input[name=email]',
            inputRegister: 'input[name=inputregister]',
            inputLogin: 'input[name=input-login]',
            loginForm: '.login-form',
            newAccountForm: '.new-account-form'
        },

        events: {
            'click @ui.submitLogin': 'sendLoginReq',
            'click @ui.submitNewUser': 'createNewAccountReq',
            'click @ui.inputRegister': 'changeToRegisterForm',
            'click @ui.inputLogin': 'changeToLoginForm'
        },

        initialize: function () {
            var self = this;

            this.auth = Auth;
            this.accessChannel = Bb.Radio.channel('access');

            this.model.refreshAccess().then(function (resp) {
                if (resp.success === true) {
                    self.auth.set('logged', resp.success);
                    self.auth.set('username', resp.username);
                    self.accessChannel.trigger('access:allowed');
                }
            });
        },

        changeToRegisterForm: function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.detachChildView('info');

            this.ui.loginForm.addClass('hide');
            this.ui.newAccountForm.removeClass('hide');
        },

        changeToLoginForm: function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.detachChildView('info');
            this.ui.newAccountForm.addClass('hide');
            this.ui.loginForm.removeClass('hide');
        },

        sendLoginReq: function (e) {

            e.preventDefault();
            e.stopPropagation();
            var self = this;

            this.model.set('username', this.ui.inputUser.val());
            this.model.set('password', this.ui.inputPass.val()); // should I hash this now?
            this.model.login().then(function (resp) {
                if (resp.success === true) {
                    self.auth.set('logged', resp.success);
                    self.auth.set('username', resp.username);
                    self.accessChannel.trigger('access:allowed');
                } else {
                    self.showChildView('info', new Info({ text: resp.error }));
                }
            });
        },

        createNewAccountReq: function (e) {

            e.preventDefault();
            e.stopPropagation();
            var self = this;

            this.model.set('username', this.ui.inputNewUser.val());
            this.model.set('password', this.ui.inputNewPass.val()); // should I hash this now?
            this.model.set('confirmPassword', this.ui.inputConfirmPass.val());
            this.model.set('email', this.ui.inputEmail.val());

            this.model.register().then(function (resp) {

                if (resp.success === true) {
                    self.detachChildView('info');
                    self.ui.newAccountForm.addClass('hide');
                    self.ui.loginForm.removeClass('hide');
                } else {
                    var msg = 'Errors: ';
                    if (typeof resp.error === 'object') {
                        
                        _.each(resp.error, function (val) {
                            msg += val.msg + '! ';
                        });
                        resp.error = msg;
                    }
                    self.showChildView('info', new Info({ text: resp.error }));
                }
            });
        }

        // for LOGOUT please see: webcam\webapp\app\nav\nav.View.js

    });
});