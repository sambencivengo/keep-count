import * as yup from 'yup';

const schema = yup.object({
	title: yup
		.string()
		.max(255, 'Title cannot be longer than 255 characters')
		.required('A title is required')
		.trim(),
});

export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
