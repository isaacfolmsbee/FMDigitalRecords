import axios from 'axios';

const url = 'api/faculty/';

export async function getFaculty() {
	const response = await axios.get(url);

	return response.data;
}
