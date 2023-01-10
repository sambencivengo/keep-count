import {
	Box,
	Button,
	Heading,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import router from 'next/router';
import { InputField } from '../components/InputField';
import { baseUrl } from '../constants';
import { CreateUserSchema } from '../schema';
import { colors } from '../theme';

const NewCount: NextPage = () => {
	const toast = useToast();
	const groupHelperText =
		'You have the option to create a group that this count will belong to.';

	return (
		<>
			<Heading>New Count</Heading>
			<Box
				maxW={'500px'}
				pb={'5px'}
				p={20}
				px={[5, 10, 20]}
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
						const success = await fetch(`${baseUrl}api/counts`, {
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify(args),
							credentials: 'include',
						});
						toast({
							description: 'New count created!',
							status: 'success',
							variant: 'solid',
							duration: 4000,
							isClosable: true,
							position: 'top',
						});

						router.push('/');

						if (!success) {
							toast({
								description:
									'There was a problem creating a new count',
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
									label="Title"
									name="title"
									isRequired={true}
								/>
								<InputField
									label="Group"
									name="group"
									helperText={groupHelperText}
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

export default NewCount;
