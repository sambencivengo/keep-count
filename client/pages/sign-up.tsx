import { Box, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import React from 'react';
import { InputField } from '../components/InputField';
import { colors } from '../theme';

const SignUp: NextPage = () => {
	const [isLoading, setIsLoading] = React.useState(false);

	return (
		<>
			<Heading>Sign Up</Heading>
			<Box
				rounded={'md'}
				h={350}
				w={300}
				border={`3px solid ${colors.darkBlueGrey}`}
			>
				<Text>Sign up form</Text>
				<Formik
					validateOnChange={false}
					validateOnBlur={false}
					initialValues={{ name: '', cost: '' }}
					// validationSchema={} TODO: Schema!
					onSubmit={async (args) => {
						setIsLoading(true);

						const res = await fetch(
							`http://localhost:8000/api/users`,
							{
								method: 'POST',
								headers: {
									'content-type': 'application/json',
								},
								body: JSON.stringify(args),
							}
						);

						const data = await res.json();

						setIsLoading(false);

						if (!res.ok) {
							const errCodeMsg = `(Error Code: ${res.status})`;
							// TODO: use toast for request errors across the app
							setIsLoading(false);

							return;
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField name="username" />
							<InputField name="password" />
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
};
export default SignUp;
