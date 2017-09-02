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
            newAccountForm: '#new-account-form'
        },

        events: {
            'click @ui.submitLogin': 'sendLoginReq',
            'click @ui.submitNewUser': 'createNewAccountReq',
            'click @ui.inputReqType': 'changeView'
        },

        initialize: function () {
            this.auth = Auth;
            this.requestType = 'login';
            this.accessChannel = Bb.Radio.channel('access');
        },

        changeView: function (e) {

            e.preventDefault();
            this.detachChildView('info');
            if (this.ui.newAccountForm.hasClass('hide')) {
                this.ui.loginForm.addClass('hide');
                this.ui.newAccountForm.removeClass('hide');
                this.requestType = 'create-user';
            } else {
                this.ui.newAccountForm.addClass('hide');
                this.ui.loginForm.removeClass('hide');
                this.requestType = 'login';
            }
        },

        sendLoginReq: function (e) {

            e.preventDefault();
            var self = this;

            this.model.set('username', this.ui.inputUser.val());
            this.model.set('password', this.ui.inputPass.val()); // should I hash this now?
            this.model.sendRequest(this.requestType).then(function (resp) {
                if (resp.success === true) {
                    self.auth.set('logged', resp.success);
                    self.accessChannel.trigger('access:allowed');
                } else {
                    self.showChildView('info', new Info({ text: resp.error }));
                }
            });
        },

        createNewAccountReq: function (e) {

            e.preventDefault();

            var self = this;

            this.model.set('username', this.ui.inputNewUser.val());
            this.model.set('password', this.ui.inputNewPass.val()); // should I hash this now?
            this.model.set('confirmPassword', this.ui.inputConfirmPass.val());
            this.model.set('email', this.ui.inputEmail.val());

            this.model.sendRequest(this.requestType).then(function (resp) {

                if (resp.success === true) {
                    self.detachChildView('info');
                    self.ui.newAccountForm.addClass('hide');
                    self.ui.loginForm.removeClass('hide');
                    self.requestType = 'login';
                } else {
                    if (typeof resp.error === "object") {
                        var msg = 'Errors: ';
                        _.each(resp.error, function (val, key) {
                            msg += val.msg + '! ';
                        });
                        resp.error = msg;
                    }
                    self.showChildView('info', new Info({ text: resp.error }));
                }
            });
        }

    });
});