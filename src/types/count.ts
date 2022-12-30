import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Count {
	@Field(() => ID)
	id: string;

	@Field()
	email: string;

	@Field()
	value: number;

	@Field()
	title: string;
}
