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
import { Count } from '@prisma/client';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import router from 'next/router';
import React from 'react';
import { JsxEmit } from 'typescript';
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
					initialValues={{ title: '', groupTitle: '' }}
					validationSchema={CreateCountSchema.uiSchema}
					onSubmit={async (args) => {
						const res = await fetch(`${baseUrl}api/counts`, {
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify(args),
							credentials: 'include',
						});

						if (!res.ok) {
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

						const data: Count = await res.json();

						toast({
							description: `New ${data.title} count created!`,
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
										name="groupTitle"
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
