import { Router } from "express";
import {
	getUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
} from "../services/userServices.js";
import { authMiddleware } from "../middleware/auth.js";

export const userRouter = new Router();

userRouter.get("/", async (req, res) => {
	const { username, email } = req.query;
	const where = {};
	if (username) where.username = username;
	if (email) where.email = email;
	res.json(await getUsers(where));
});

userRouter.post("/", authMiddleware, async (req, res) => {
	const { username, password, name, email, phoneNumber, profilePicture } =
		req.body;
	if (username && password && name && email && phoneNumber && profilePicture) {
		try {
			await createUser(
				username,
				password,
				name,
				email,
				phoneNumber,
				profilePicture
			);
			res.status(201).json({ message: "User created successfully" });
		} catch {
			res.status(400).json({ message: "Bad request" });
		}
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

userRouter.get("/:userId", async (req, res) => {
	const { userId } = req.params;
	const user = await getUserById(userId);
	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ message: "User not found" });
	}
});

userRouter.put("/:userId", authMiddleware, async (req, res) => {
	const { userId } = req.params;
	const { username, name, email, phoneNumber, profilePicture } = req.body;
	if (username && name && email && phoneNumber && profilePicture) {
		const user = await getUserById(userId);
		if (user) {
			await updateUser(userId, {
				username,
				name,
				email,
				phoneNumber,
				profilePicture,
			});
			res.json({ message: "User updated successfully" });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

userRouter.delete("/:userId", authMiddleware, async (req, res) => {
	const { userId } = req.params;
	const user = await getUserById(userId);
	if (user) {
		await deleteUser(userId);
		res.json({ message: "User deleted successfully" });
	} else {
		res.status(404).json({ message: "User not found" });
	}
});
