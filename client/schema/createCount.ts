import * as yup from 'yup';

const schema = yup.object({
	title: yup
		.string()
		.max(255, 'Title cannot be longer than 255 characters')
		.required('A title is required')
		.trim(),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();
