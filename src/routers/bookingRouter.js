import { Router } from "express";
import {
	getBookings,
	createBooking,
	getBookingById,
	updateBooking,
	deleteBooking,
} from "../services/bookingServices.js";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

export const bookingRouter = new Router();

bookingRouter.get("/", async (req, res) => {
	const { userId } = req.query;
	const prisma = new PrismaClient();
	res.json(await prisma.booking.findMany({ where: { userId } }));
});

bookingRouter.post("/", authMiddleware, async (req, res) => {
	const {
		userId,
		propertyId,
		checkinDate,
		checkoutDate,
		numberOfGuests,
		totalPrice,
		bookingStatus,
	} = req.body;
	if (
		userId &&
		propertyId &&
		checkinDate &&
		checkoutDate &&
		numberOfGuests &&
		totalPrice &&
		bookingStatus
	) {
		await createBooking(
			userId,
			propertyId,
			checkinDate,
			checkoutDate,
			numberOfGuests,
			totalPrice,
			bookingStatus
		);
		res.status(201).json({ message: "Booking created successfully" });
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

bookingRouter.get("/:bookingId", async (req, res) => {
	const { bookingId } = req.params;
	const booking = await getBookingById(bookingId);
	if (booking) {
		res.json(booking);
	} else {
		res.status(404).json({ message: "Booking not found" });
	}
});

bookingRouter.put("/:bookingId", authMiddleware, async (req, res) => {
	const { bookingId } = req.params;
	const {
		checkinDate,
		checkoutDate,
		numberOfGuests,
		totalPrice,
		bookingStatus,
	} = req.body;
	if (
		checkinDate &&
		checkoutDate &&
		numberOfGuests &&
		totalPrice &&
		bookingStatus
	) {
		const booking = await getBookingById(bookingId);
		if (booking) {
			await updateBooking(bookingId, {
				checkinDate,
				checkoutDate,
				numberOfGuests,
				totalPrice,
				bookingStatus,
			});
			res.json({ message: "Booking updated successfully" });
		} else {
			res.status(404).json({ message: "Booking not found" });
		}
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

bookingRouter.delete("/:bookingId", authMiddleware, async (req, res) => {
	const { bookingId } = req.params;
	const booking = await getBookingById(bookingId);
	if (booking) {
		await deleteBooking(bookingId);
		res.json({ message: "Booking deleted successfully" });
	} else {
		res.status(404).json({ message: "Booking not found" });
	}
});
