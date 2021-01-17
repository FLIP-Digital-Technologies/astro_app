import axios from 'axios'
import { API_BASE_URL } from '../../configs/AppConfig'
import history from '../history'
import { AUTH_TOKEN, KEY } from '../constants'
import { notification } from 'antd';
import "antd/dist/antd.css";

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})
const key = KEY;

// Config
const ENTRY_ROUTE = '/auth/login'
const TOKEN_PAYLOAD_KEY = 'Authorization'
const PUBLIC_REQUEST_KEY = 'public-request'

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN)
	config.headers["Access-Control-Allow-Origin"] = "*";
	config.headers["Access-Control-Allow-Method"] = "*";

  if (jwtToken) {
    config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
  }

  if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
		history.push(ENTRY_ROUTE)
		window.location.reload();
  }

  return config
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
  Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use( (response) => {
	return response.data
}, (error) => {

	let notificationParam = {
		message: '',
		key
	}
	console.log(error.response)
	// Remove token and redirect 
	if (error.response.status === 400 || error.response.status === 403) {
		notificationParam.message = 'Authentication Fail'
		notificationParam.description = 'Please login again'
		localStorage.removeItem(AUTH_TOKEN)
		// history.push(ENTRY_ROUTE)
		window.location.reload();
	} else if (error.response.status === 404) {
		notificationParam.message = 'Not Found';
		notificationParam.description = error.response.data.message;
	} else if (error.response.status === 500) {
		notificationParam.message = 'Internal Server Error'
		notificationParam.description = error.response.data.message;
	} else if (error.response.status === 508) {
		notificationParam.message = 'Time Out'
		notificationParam.description = error.response.data.message;
	} else {
		notificationParam.message = error.response.data.message;
	}

	notification.error(notificationParam)

	return Promise.reject(error);
});

export default service