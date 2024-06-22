import express from "express";
import dotenv from "dotenv";
import { rootRouter } from "./routers/rootRouter.js";
import { userRouter } from "./routers/userRouter.js";
import { bookingRouter } from "./routers/bookingRouter.js";
import { hostRouter } from "./routers/hostRouter.js";
import { reviewRouter } from "./routers/reviewRouter.js";
import { amenityRouter } from "./routers/amenityRouter.js";
import { propertyRouter } from "./routers/propertyRouter.js";
import { log } from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import Sentry from "@sentry/node";

dotenv.config();

const app = express();

export const initSentry = () => {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		integrations: [
			new Sentry.Integrations.Http({
				tracing: true,
			}),
			new Sentry.Integrations.Express({
				app,
			}),
		],
		tracesSampleRate: 1.0,
	});
};

initSentry();

app.use(express.json());

app.use(log);

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use("/", rootRouter);

app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/hosts", hostRouter);
app.use("/reviews", reviewRouter);
app.use("/amenities", amenityRouter);
app.use("/properties", propertyRouter);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
