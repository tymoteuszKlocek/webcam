define([
    'backbone',
    'marionette',
    'text!app/login/login.View.html',
    'app/login/login.Model',
    'app/scanner/scanner.View',
    'app/router',
], function (Bb, Mn, tpl, Model, Scanner, Router) {
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
            logout: '#logout'
        },

        events: {
            'click @ui.submitLogin': 'sendLoginReq',
            'click @ui.submitNewUser': 'createNewAccountReq',
            'click @ui.inputReqType': 'changeView',
            'click @ui.logout': 'logout'
        },

        initialize: function (opt) {
            this.session = opt;
            this.router = 
            console.log('opt in logibn', this.session)
            this.requestType = 'login';
            this.filterChannel = Bb.Radio.channel('filter');
        },

        changeView: function (e) {
            e.preventDefault();
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
            this.model.sendRequest(this.requestType).then(function(resp) {
                self.session.set('sessionID', resp.sessionID);
                self.session.set('userID', resp.userID);
                self.router.navigate('#/tasks/', {trigger: true})
                //self.session.login();
                console.log('i get this', self.session.get('userID'))
                self.filterChannel.request('access ok');
            });
        },

        createNewAccountReq: function(e) {
            e.preventDefault();
            this.model.set('username', this.ui.inputNewUser.val());
            this.model.set('password', this.ui.inputNewPass.val()); // should I hash this now?
            this.model.set('confirmPassword', this.ui.inputConfirmPass.val());
            this.model.set('email', this.ui.inputEmail.val());
            this.model.sendRequest(this.requestType);
        }, 

        logout: function(e) {
            e.preventDefault();
            this.model.logout().then(function(resp) {
                console.log('logout', resp)
            });
        } 

    })
});