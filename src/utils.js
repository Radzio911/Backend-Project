import jwt from "jsonwebtoken";
import winston from "winston";

export const sign = (data) => {
	return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

export const verify = (token, callback = () => {}) => {
	jwt.verify(token, process.env.JWT_SECRET_KEY, callback);
};

export const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	defaultMeta: { service: "bookstore-api" },
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		})
	);
}
