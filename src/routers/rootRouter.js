import { Router } from "express";
import { sign } from "../utils.js";
import { PrismaClient } from "@prisma/client";

export const rootRouter = new Router();

rootRouter.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const prisma = new PrismaClient();

	const user = await prisma.user.findFirst({
		where: { username, password },
	});

	if (!user) {
		return res.status(401).json({ message: "Invalid credentials!" });
	}

	const token = sign({ userId: user.id });

	res.status(200).json({ message: "Successfully logged in!", token });
});
