const Joi = require('@hapi/joi');

const userValidationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.alphanum": "Username must contain only letters and numbers.",
      "string.min": "Username must be at least 3 characters long.",
      "string.max": "Username cannot exceed 30 characters.",
      "any.required": "Username is required."
    }),

  

    email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required."
    }),

  password: Joi.string()
    .min(8)
    .max(100)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 100 characters.",
      "any.required": "Password is required."
    }),

  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      "any.only": "Passwords must match.",
      "any.required": "Repeat password is required."
    }),

  profilePicture: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": "Profile picture must be a valid URL."
    }),

  preferences: Joi.object({
    autoSaveMashups: Joi.boolean().default(false),
    preferredFileFormat: Joi.string()
      .valid('mp3', 'wav', 'mp4')
      .default('mp3'),
    cloudStorageLink: Joi.string()
      .uri()
      .optional()
      .messages({
        "string.uri": "Cloud storage link must be a valid URL."
      })
  }).optional(),

  privacySettings: Joi.object({
    isAccountPrivate: Joi.boolean().default(false),
    emailVerificationEnabled: Joi.boolean().default(true),
    recentActivityLog: Joi.array().items(
      Joi.object({
        action: Joi.string().required(),
        timestamp: Joi.date().required()
      })
    ).optional()
  }).optional(),

  communitySettings: Joi.object({
    commentsEnabled: Joi.boolean().default(true),
    collaborationInvitations: Joi.boolean().default(true),
    mashupVisibility: Joi.string()
      .valid('public', 'private')
      .default('public')
  }).optional(),

  projects: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Validates MongoDB ObjectId format
    .optional()
}).options({ abortEarly: false }); // Validate all fields before returning errors


const loginValidationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.alphanum": "Username must contain only letters and numbers.",
      "string.min": "Username must be at least 3 characters long.",
      "string.max": "Username cannot exceed 30 characters.",
      "any.required": "Username is required."
    }),

  password: Joi.string()
    .min(8)
    .max(100)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 100 characters.",
      "any.required": "Password is required."
    })
}).options({ abortEarly: false }); // Validate all fields before returning errors

module.exports = { userValidationSchema, loginValidationSchema };

