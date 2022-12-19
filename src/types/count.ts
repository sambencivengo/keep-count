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

// model Count {
//   id        Int      @id @default(autoincrement())
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   title     String   @db.VarChar(255)
//   value   Int        @default(0)
//   user    User     @relation(fields: [userId], references: [id])
//   userId  Int
//   group    Group?     @relation(fields: [groupId], references: [id])
//   groupId  Int?
// }
