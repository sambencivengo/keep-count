import { Box, Button, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import React from 'react';
import { InputField } from '../components/InputField';
import { baseUrl } from '../constants';
import { CreateUserSchema } from '../schema';
import { colors } from '../theme';

const SignUp: NextPage = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const toast = useToast();
	return (
		<>
			<Heading>Sign Up</Heading>
			<Box
				p={20}
				rounded={'md'}
				border={`3px solid ${colors.darkBlueGrey}`}
			>
				<Formik
					validateOnChange={false}
					validateOnBlur={false}
					initialValues={{ username: '', password: '' }}
					validationSchema={CreateUserSchema.uiSchema}
					onSubmit={async (args) => {
						setIsLoading(true);

						console.log(args);

						const res = await fetch(`${baseUrl}api/users`, {
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify(args),
						});

						await res.json();
						setIsLoading(false);
						toast({
							description: 'Sign up successful!',
							status: 'success',
							variant: 'solid',
							duration: 4000,
							isClosable: true,
							position: 'top',
						});

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
							<VStack spacing={10}>
								<InputField label="Username" name="username" />
								<InputField
									type="password"
									label="Password"
									name="password"
								/>
								<Button isLoading={isSubmitting} type="submit">
									Submit
								</Button>
							</VStack>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
};
export default SignUp;
