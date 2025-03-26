import { z } from "zod";
import { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput =
  | Prisma.JsonValue
  | null
  | "JsonNull"
  | "DbNull"
  | Prisma.NullTypes.DbNull
  | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === "DbNull") {
    return Prisma.DbNull;
  }
  if (v === "JsonNull") {
    return Prisma.JsonNull;
  }
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ]),
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal("DbNull"), z.literal("JsonNull")])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ]),
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "email",
  "password",
  "resetToken",
  "createdAt",
  "updatedAt",
  "phoneNumber",
  "bio",
]);

export const FileScalarFieldEnumSchema = z.enum([
  "id",
  "createdAt",
  "updatedAt",
  "name",
  "path",
  "text",
  "tags",
  "views",
  "userId",
]);

export const ErrorLogsScalarFieldEnumSchema = z.enum([
  "id",
  "status",
  "message",
  "method",
  "url",
  "loggedUser",
  "name",
  "stack",
  "details",
  "createdAt",
  "updatedAt",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  password: z.string().nullable(),
  resetToken: z.string().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  phoneNumber: z.string().nullable(),
  bio: z.string().nullable(),
});

export type user = z.infer<typeof userSchema>;

/////////////////////////////////////////
// FILE SCHEMA
/////////////////////////////////////////

export const fileSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  name: z.string().nullable(),
  path: z.string().nullable(),
  text: z.string().nullable(),
  tags: z.string().nullable(),
  views: z.number().nullable(),
  userId: z.string().nullable(),
});

export type file = z.infer<typeof fileSchema>;

/////////////////////////////////////////
// ERROR LOGS SCHEMA
/////////////////////////////////////////

export const errorLogsSchema = z.object({
  id: z.string(),
  status: z.string().nullable(),
  message: z.string().nullable(),
  method: z.string().nullable(),
  url: z.string().nullable(),
  loggedUser: z.string().nullable(),
  name: z.string().nullable(),
  stack: z.string().nullable(),
  details: JsonValueSchema.nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type errorLogs = z.infer<typeof errorLogsSchema>;
