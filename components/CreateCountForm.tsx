import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Select,
	Switch,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Count, Group } from '@prisma/client';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React from 'react';
import { CreateCountSchema } from '../schema';
import { colors } from '../theme';
import { InputField } from './InputField';

interface CreateCountFormProps {}

export const CreateCountForm: React.FC<CreateCountFormProps> = ({}) => {
	const toast = useToast();
	const groupHelperText =
		'You have the option to create a group that this count will belong to.';

	const [addToExistingGroup, setAddToExistingGroup] = React.useState(false);
	const [groups, setGroups] = React.useState<Group[] | null>(null);
	const [groupId, setGroupId] = React.useState<string>();
	const toggleAddToExistingGroup = () =>
		setAddToExistingGroup(!addToExistingGroup);

	const fetchGroups = async () => {
		const res = await fetch(`/api/groups`, {
			credentials: 'include',
		});

		if (!res.ok) {
			if (!res.ok) {
				toast({
					description: 'There was a problem fetching groups',
					status: 'error',
					variant: 'solid',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
				return;
			}
		}

		const data = await res.json();

		setGroups(data);
	};

	return (
		<>
			<Heading>New Count</Heading>
			<Box
				w={['300px', '400px', '500px']}
				pb={'5px'}
				py={10}
				p={10}
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
						const queryString = new URLSearchParams({
							groupId: groupId ?? '',
						});
						const res = await fetch(`/api/counts?${queryString}`, {
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

								{addToExistingGroup && groups ? (
									<FormControl>
										<FormLabel htmlFor="existing-group-switch">
											Select group:
										</FormLabel>
										<Select
											onChange={(e) =>
												setGroupId(e.target.value)
											}
											placeholder="Select group..."
										>
											{groups.map((group) => (
												<option
													key={group.id}
													value={group.id}
												>
													{group.title}
												</option>
											))}
										</Select>
										<FormHelperText>
											Assign this count to an existing
											group.
										</FormHelperText>
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
										onChange={() => {
											fetchGroups();
											toggleAddToExistingGroup();
										}}
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
