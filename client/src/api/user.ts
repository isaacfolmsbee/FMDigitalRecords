import axios from 'axios';

const url = 'api/user/';

export async function register(username: string, password: string) {
	const response = await axios.post(url, {
		username,
		password,
	});

	return response.data;
}

export async function login(username: string, password: string) {
	const response = await axios.post(url + 'login', {
		username,
		password,
	});

	return response;
}