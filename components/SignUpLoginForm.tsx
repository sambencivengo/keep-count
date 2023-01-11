import {
	Heading,
	VStack,
	Button,
	Box,
	useToast,
	Center,
	useColorModeValue,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React from 'react';
import { InputField } from './InputField';
import { useUser } from './UserProvider';
import { CreateUserSchema } from '../schema';
import { colors } from '../theme';
import Link from 'next/link';

interface SignUpLoginFormProps {
	formPurpose: 'signUp' | 'login';
}

export const SignUpLoginForm: React.FC<SignUpLoginFormProps> = ({
	formPurpose,
}) => {
	const { signUp, login } = useUser();
	const toast = useToast();

	return (
		<>
			<Heading>{formPurpose === 'login' ? 'Log In' : 'Sign Up'}</Heading>
			<Box
				pb="5px"
				w={['300px', '400px', '500px']}
				pt={20}
				px={10}
				rounded={'md'}
				border={`3px solid ${useColorModeValue(
					colors.darkBlueGrey,
					colors.lightGrey
				)}`}
			>
				<Formik
					validateOnChange={false}
					validateOnBlur={false}
					initialValues={{ username: '', password: '' }}
					validationSchema={CreateUserSchema.uiSchema}
					onSubmit={async (args) => {
						const success =
							formPurpose === 'login'
								? await login(args)
								: await signUp(args);

						if (!success) {
							toast({
								description: `There was a problem ${
									formPurpose === 'login'
										? 'logging in'
										: 'signing up'
								}`, // TODO: change with function
								status: 'error',
								variant: 'solid',
								duration: 4000,
								isClosable: true,
								position: 'top',
							});
							return;
						}

						toast({
							description: `${
								formPurpose === 'login' ? 'Log in' : 'Sign up'
							} successful!`,
							status: 'success',
							variant: 'solid',
							duration: 4000,
							isClosable: true,
							position: 'top',
						});

						router.push('/');
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
				<Center mt="50px">
					<Link
						href={formPurpose === 'login' ? '/sign-up' : '/login'}
					>
						{formPurpose === 'login'
							? 'Need to sign up?'
							: 'Already have an account?'}
					</Link>
				</Center>
			</Box>
		</>
	);
};
