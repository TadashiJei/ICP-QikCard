import { body, validationResult, Result, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? err.path : err.type,
        message: err.msg,
        value: err.value,
      })),
    });
    return;
  }
  next();
};

// Event validation rules
export const validateEvent = [
  body('title')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .optional()
    .isString()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('location')
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage('Location must be less than 200 characters'),
  body('maxParticipants')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Max participants must be a positive integer'),
  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'LIVE', 'COMPLETED', 'CANCELLED'])
    .withMessage('Status must be one of: DRAFT, PUBLISHED, LIVE, COMPLETED, CANCELLED'),
];

// Participant validation rules
export const validateParticipant = [
  body('eventId')
    .isString()
    .isUUID()
    .withMessage('Event ID must be a valid UUID'),
  body('name')
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email must be a valid email address'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Phone must be a valid phone number'),
  body('walletAddress')
    .optional()
    .isEthereumAddress()
    .withMessage('Wallet address must be a valid Ethereum address'),
];

// Device validation rules
export const validateDevice = [
  body('deviceId')
    .isString()
    .isLength({ min: 3, max: 50 })
    .withMessage('Device ID must be between 3 and 50 characters'),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),
  body('eventId')
    .optional()
    .isString()
    .isUUID()
    .withMessage('Event ID must be a valid UUID'),
  body('status')
    .optional()
    .isIn(['ACTIVE', 'INACTIVE', 'MAINTENANCE'])
    .withMessage('Status must be one of: ACTIVE, INACTIVE, MAINTENANCE'),
];

// User validation rules
export const validateUser = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email must be a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
];

// Pagination validation
export const validatePagination = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

// ID validation
export const validateId = [
  body('id')
    .isString()
    .isUUID()
    .withMessage('ID must be a valid UUID'),
];
