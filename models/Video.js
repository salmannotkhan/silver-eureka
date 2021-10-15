import mongoose from "mongoose";
import { schemaOptions } from "./User.js";
const { Schema } = mongoose;

const reactionSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		body: String,
	},
	schemaOptions,
);

const videoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		tags: [String],
		videoUrl: {
			type: String,
			required: true,
		},
		views: [reactionSchema],
		likes: [reactionSchema],
		dislikes: [reactionSchema],
		comments: [reactionSchema],
		audioLanguage: {
			type: String,
			required: true,
		},
		isLive: {
			type: Boolean,
			default: false,
		},
		uploadedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		isPremium: {
			type: Boolean,
			default: false,
		},
	},
	schemaOptions,
);

videoSchema.virtual("totalLikes").get(function () {
	return this.likes.length;
});

videoSchema.virtual("totalDislikes").get(function () {
	return this.dislikes.length;
});

videoSchema.virtual("totalViews").get(function () {
	return this.views.length;
});

const Video = mongoose.model("video", videoSchema);
export default Video;
