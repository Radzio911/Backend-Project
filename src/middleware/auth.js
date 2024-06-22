import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization;
	const secretKey = process.env.JWT_SECRET_KEY || "my-secret-key";

	if (!token) {
		console.log("======================");
		console.log("======================");
		console.log("======================");
		console.log("======================");
		console.log("======================");
		console.log("======================");
		console.log("======================");
	}

	if (!token) {
		return res
			.status(401)
			.json({ message: "You cannot access this operation without a token!" });
	}

	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token provided!" });
		}

		req.user = decoded;
		next();
	});
};