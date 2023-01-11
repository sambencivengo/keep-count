import * as yup from 'yup';

const schema = yup.object({
	username: yup
		.string()
		.min(5, 'Username must be at least 5 characters long')
		.max(15, 'Username cannot be longer than 20 characters')
		.required('A username is required')
		.trim(),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.required('A password is required')
		.trim(),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();
