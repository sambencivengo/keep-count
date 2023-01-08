import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { colors } from '../theme';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label?: string;
	isRequired?: true;
};

export const InputField: React.FC<InputFieldProps> = ({
	isRequired = false,
	label,
	size: _,
	...props
}) => {
	const [field, { error }] = useField(props);
	return (
		<FormControl isRequired={isRequired} isInvalid={!!error}>
			{label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
			<Input variant={'filled'} {...field} {...props} id={field.name} />
			{error && (
				<FormErrorMessage color={colors.deepRed}>
					{error}
				</FormErrorMessage>
			)}
		</FormControl>
	);
};
