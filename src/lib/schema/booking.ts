import { z } from 'zod';

export const clientInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  emergencyContact: z.string().min(2, "Emergency contact is required"),
});

export const medicalInfoSchema = z.object({
  surgeryDate: z.string().min(1, "Surgery date is required"),
  surgeryType: z.string().min(2, "Surgery type is required"),
  surgeon: z.string().min(2, "Dr. / Surgeon name is required"),
  facility: z.string().min(2, "Facility is required"),
  serviceAddress: z.string().optional(),
  allergies: z.string().optional(),
  notes: z.string().optional(),
});

export const bookingFormSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  clientInfo: clientInfoSchema,
  medicalInfo: medicalInfoSchema,
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export type BookingStatus = "Pending Deposit" | "Deposit Verified";

export type Booking = BookingFormData & {
  id: string;
  referenceCode: string;
  status: BookingStatus;
  createdAt: number;
  updatedAt: number | null;
};
