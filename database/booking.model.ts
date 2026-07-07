import mongoose, { Document, Schema, Types } from "mongoose";
import  Event  from "./event.model";

// Interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking schema definition
const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
  },
  { timestamps: true }
);

// Create index on eventId for faster queries
bookingSchema.index({ eventId: 1 });

// Pre-save hook to validate that the referenced event exists
bookingSchema.pre("save", async function (next) {
  if (this.isModified("eventId") || this.isNew) {
    try {
      const eventExists = await Event.findById(this.eventId);
      if (!eventExists) {
        // @ts-ignore
        return next(
            new Error(`Event with ID ${this.eventId} does not exist`)
        );
      }
    } catch (error) {
      // @ts-ignore
      return next(
          new Error(
              `Error validating event: ${error instanceof Error ? error.message : "Unknown error"}`
          )
      );
    }
  }

  // @ts-ignore
  next();
});

// Create or retrieve the Booking model
const Booking =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
