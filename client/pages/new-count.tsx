import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Select,
	Switch,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import router from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { baseUrl } from '../constants';
import { CreateCountSchema } from '../schema';
import { colors } from '../theme';

const NewCount: NextPage = () => {
	const toast = useToast();
	const groupHelperText =
		'You have the option to create a group that this count will belong to.';
	const [addToExistingGroup, setAddToExistingGroup] = React.useState(false);

	const toggleAddToExistingGroup = () =>
		setAddToExistingGroup(!addToExistingGroup);

	console.log(addToExistingGroup);

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
					initialValues={{ title: '' }}
					validationSchema={CreateCountSchema.uiSchema}
					onSubmit={async (args) => {
						console.log(args);

						const success = await fetch(`${baseUrl}api/counts`, {
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify(args),
							credentials: 'include',
						});
						console.log(success);

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
						toast({
							description: 'New count created!',
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
									label="Title"
									name="title"
									isRequired={true}
								/>

								{addToExistingGroup ? (
									<FormControl>
										<FormLabel htmlFor="existing-group-switch">
											Select group:
										</FormLabel>
										<Select placeholder="Select option">
											<option value="option1">
												Option 1
											</option>
											<option value="option2">
												Option 2
											</option>
											<option value="option3">
												Option 3
											</option>
										</Select>
									</FormControl>
								) : (
									<InputField
										label="Group"
										name="group"
										helperText={groupHelperText}
									/>
								)}
								<FormControl display="flex" alignItems="center">
									<FormLabel htmlFor="existing-group-switch">
										Add to existing group?
									</FormLabel>
									<Switch
										onChange={toggleAddToExistingGroup}
										id="existing-group-switch"
									/>
								</FormControl>

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
