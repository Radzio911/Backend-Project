import { Router } from "express";
import {
	getReviews,
	createReview,
	getReviewById,
	updateReview,
	deleteReview,
} from "../services/reviewServices.js";
import { authMiddleware } from "../middleware/auth.js";

export const reviewRouter = new Router();

reviewRouter.get("/", async (req, res) => {
	res.json(await getReviews());
});

reviewRouter.post("/", authMiddleware, async (req, res) => {
	const { userId, propertyId, rating, comment } = req.body;
	if (userId && propertyId && rating && comment) {
		await createReview(userId, propertyId, rating, comment);
		res.status(201).json({ message: "Review created successfully" });
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

reviewRouter.get("/:reviewId", async (req, res) => {
	const { reviewId } = req.params;
	const review = await getReviewById(reviewId);
	if (review) {
		res.json(review);
	} else {
		res.status(404).json({ message: "Review not found" });
	}
});

reviewRouter.put("/:reviewId", authMiddleware, async (req, res) => {
	const { reviewId } = req.params;
	const { rating, comment } = req.body;
	if (rating && comment) {
		const review = await getReviewById(reviewId);
		if (review) {
			await updateReview(reviewId, {
				rating,
				comment,
			});
			res.json({ message: "Review updated successfully" });
		} else {
			res.status(404).json({ message: "Review not found" });
		}
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

reviewRouter.delete("/:reviewId", authMiddleware, async (req, res) => {
	const { reviewId } = req.params;
	const review = await getReviewById(reviewId);
	if (review) {
		await deleteReview(reviewId);
		res.json({ message: "Review deleted successfully" });
	} else {
		res.status(404).json({ message: "Review not found" });
	}
});
