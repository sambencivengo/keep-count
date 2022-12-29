import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectDb = async () => {
	try {
		await prisma.$connect();
		console.log('Database is connected');
	} catch (error) {
		throw error;
	}
};
