import axios from 'axios';

const url = 'api/faculty/';

export async function getFaculty() {
	const response = await axios.get(url);

	return response.data;
}

export async function queryFaculty(query: string) {
	const response = await axios.get(url + query);

	return response.data;
}

export async function postFacultyRecord(query: {
	lastName: string;
	firstName: string;
	middleInitial: string;
	suffix: string;
	role: string;
	department: string;
	academicYear: string;
}, JWT: string) {
	
	console.log({
		lastName: query.lastName,
		firstName: query.firstName,
		middleInitial: query.middleInitial,
		suffix: query.suffix,
		role: query.role,
		department: query.department,
		academicYear: query.academicYear,
	});
	const response = await axios.post(
		url,
		{
			lastName: query.lastName || undefined,
			firstName: query.firstName || undefined,
			middleInitial: query.middleInitial || undefined,
			suffix: query.suffix || undefined,
			role: query.role || undefined,
			department: query.department || undefined,
			academicYear: query.academicYear || undefined,
		},
		{
			headers: {
				authtoken: JWT,
			},
		}
	);

	return response.data;
}
