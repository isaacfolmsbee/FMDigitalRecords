import axios from 'axios';

const url = 'api/courses/';

export async function getCourses() {
	const response = await axios.get(url);

	return response.data;
}

export async function queryCourses(query: string) {
	const response = await axios.get(url + query);

	return response.data;
}