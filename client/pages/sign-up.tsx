import { Box, Button, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import React from 'react';
import { InputField } from '../components/InputField';
import { baseUrl } from '../constants';
import { CreateUserSchema } from '../schema';
import { colors } from '../theme';
import { useUser } from '../components/UserProvider';

const SignUp: NextPage = () => {
	const toast = useToast();
	const { signUp, isLoading } = useUser();
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
						const success = await signUp(args);

						toast({
							description: 'Sign up successful!',
							status: 'success',
							variant: 'solid',
							duration: 4000,
							isClosable: true,
							position: 'top',
						});

						if (!success) {
							toast({
								description: 'There was a problem signing up',
								status: 'error',
								variant: 'solid',
								duration: 4000,
								isClosable: true,
								position: 'top',
							});
							return;
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<VStack spacing={10}>
								<InputField
									label="Username"
									name="username"
									isRequired={true}
								/>
								<InputField
									type="password"
									label="Password"
									name="password"
									isRequired={true}
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
