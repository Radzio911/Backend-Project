import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export const getBookings = async (where) => {
	return await prisma.booking.findMany({ where });
};

export const createBooking = async (
	userId,
	propertyId,
	checkinDate,
	checkoutDate,
	numberOfGuests,
	totalPrice,
	bookingStatus
) => {
	await prisma.booking.create({
		data: {
			userId,
			propertyId,
			checkinDate,
			checkoutDate,
			numberOfGuests,
			totalPrice,
			bookingStatus,
			id: v4(),
		},
	});
};

export const getBookingById = async (id) => {
	return await prisma.booking.findFirst({ where: { id } });
};

export const updateBooking = async (id, data) => {
	await prisma.booking.updateMany({ where: { id }, data });
};

export const deleteBooking = async (id) => {
	await prisma.booking.deleteMany({ where: { id } });
};
