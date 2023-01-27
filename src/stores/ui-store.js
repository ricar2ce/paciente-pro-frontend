import { defineStore } from 'pinia';
import {Notify} from "quasar";

const apiUrl = process.env.API_URL;
const loginUrl = process.env.AUTH_LOGIN_URL;

export const useUIStore = defineStore('counter', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    dark: false,
    returnUrl: '/'
  }),
  persist: true,
  getters: {
    getIsAuthenticated: (state) => this.state.isAuthenticated,
    getUser: (state) => this.state.user,
    getToken: (state) => this.state.token,
    getLoading: (state) => this.state.loading,
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    async login(username, password) {
      this.loading = true;
      try {
        fetch(apiUrl+loginUrl, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            identifier: username,
            password: password
          })
        }).then(response => {
          response.json().then(data => {
            this.user = data.user;
            this.token = data.jwt;
            this.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(data.user.username));
            localStorage.setItem('token', JSON.stringify(data.jwt));
            this.loading = false;
            this.router.push(this.returnUrl || '/');
          })
        });
      } catch (error) {
        this.loading = false;
        console.error('error ==>', error);
        Notify.create({
          message: error.message,
          color: 'negative',
          position: 'top',
          timeout: 2500
        });
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
      this.router.push('/login').then();
    },
  },
});
