import Reflux from 'reflux';
import API from '../API.js';
import History from '../components/globalComponents/History.js';

const UserActions = Reflux.createActions([
    'login',
    'logout',
    'loginSuccess',
    'loginFailed',
    'getUserData',
    'updateUserData'
]);

class UserStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = UserActions;
        this.state = {
            authenticated: false,
            failed: false,
            user: undefined
        };
    }

    onLogin(user, password, remember) {
        API.POST("account", "login", {
            "username": user,
            "password": password,
            "remember": remember
        }).then(res => {
            UserActions.loginSuccess(res.data, res.data["authenticated"]);
        })
    }

    onGetUserData() {
        API.GET("account", "personalAccountDetails")
            .then(res => {
                this.setState({
                    authenticated: res.data["authenticated"],
                    user: res.data
                });
                this.trigger();
            })
    }

    onUpdateUserData() {
        let userData = {
            "first_name": this.state.user.first_name,
            "last_name": this.state.user.last_name,
        };

        if(this.state.user.password !== undefined)
            userData["password"] = this.state.user.password;

        API.PATCH("account", "personalAccountDetails", userData).then(res => {
                this.setState({
                    authenticated: res.data["authenticated"],
                    user: res.data
                });
                History.push('/');
            })
    }

    onLogout() {
        API.GET("account", "logout")
            .then(res => {
                this.setState({authenticated: res.data["authenticated"]});
                History.push('/');
                 window.location.reload();
            })
    }

    onLoginSuccess(data, authenticated) {
        if (authenticated === false) {
            UserActions.loginFailed();
        } else {
            this.setState({
                authenticated: authenticated,
                failed: !authenticated,
                user: data
            });
            History.push('/admittedpatients');
        }
        this.trigger();
    }

    onLoginFailed() {
        this.setState({failed: true});
        this.trigger();
    }
}

export {UserStore, UserActions};