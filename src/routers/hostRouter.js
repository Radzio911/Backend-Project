import { Router } from "express";
import {
	getHosts,
	createHost,
	getHostById,
	updateHost,
	deleteHost,
} from "../services/hostServices.js";
import { authMiddleware } from "../middleware/auth.js";

export const hostRouter = new Router();

hostRouter.get("/", async (req, res) => {
	const { name } = req.query;
	const where = {};
	if (name) where.name = name;
	res.json(await getHosts(where));
});

hostRouter.post("/", authMiddleware, async (req, res) => {
	const {
		username,
		password,
		name,
		email,
		phoneNumber,
		profilePicture,
		aboutMe,
	} = req.body;
	if (
		username &&
		password &&
		name &&
		email &&
		phoneNumber &&
		profilePicture &&
		aboutMe
	) {
		try {
			await createHost(
				username,
				password,
				name,
				email,
				phoneNumber,
				profilePicture,
				aboutMe
			);
			res.status(201).json({ message: "Host created successfully" });
		} catch {
			res.status(400).json({ message: "Bad request" });
		}
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

hostRouter.get("/:hostId", async (req, res) => {
	const { hostId } = req.params;
	const host = await getHostById(hostId);
	if (host) {
		res.json(host);
	} else {
		res.status(404).json({ message: "Host not found" });
	}
});

hostRouter.put("/:hostId", authMiddleware, async (req, res) => {
	const { hostId } = req.params;
	const { username, name, email, phoneNumber, profilePicture, aboutMe } =
		req.body;

	if (username && name && email && phoneNumber && profilePicture && aboutMe) {
		const host = await getHostById(hostId);
		if (host) {
			await updateHost(hostId, {
				username,
				name,
				email,
				phoneNumber,
				profilePicture,
				aboutMe,
			});
			res.json({ message: "Host updated successfully" });
		} else {
			res.status(404).json({ message: "Host not found" });
		}
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

hostRouter.delete("/:hostId", authMiddleware, async (req, res) => {
	const { hostId } = req.params;
	const host = await getHostById(hostId);
	if (host) {
		await deleteHost(hostId);
		res.json({ message: "Host deleted successfully" });
	} else {
		res.status(404).json({ message: "Host not found" });
	}
});
