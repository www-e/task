import { z } from 'zod';

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  name: /^[a-zA-Z\s]{2,50}$/,
} as const;

// Announcement validation schema
export const createAnnouncementSchema = z.object({
  author: z.string()
    .min(2, 'Author name must be at least 2 characters')
    .max(50, 'Author name must not exceed 50 characters')
    .regex(VALIDATION_PATTERNS.name, 'Author name contains invalid characters'),
  subject: z.string()
    .min(3, 'Subject must be at least 3 characters')
    .max(100, 'Subject must not exceed 100 characters'),
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(1000, 'Content must not exceed 1000 characters'),
  avatarUrl: z.string()
    .regex(VALIDATION_PATTERNS.url, 'Avatar URL must be a valid URL')
    .optional(),
}).strict();

export const updateAnnouncementSchema = createAnnouncementSchema.partial();

// Quiz validation schema
export const createQuizSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  course: z.string()
    .min(2, 'Course name must be at least 2 characters')
    .max(50, 'Course name must not exceed 50 characters'),
  topic: z.string()
    .min(2, 'Topic must be at least 2 characters')
    .max(100, 'Topic must not exceed 100 characters'),
  dueDate: z.string()
    .datetime('Due date must be a valid ISO 8601 date')
    .refine((date) => new Date(date) > new Date(), 'Due date must be in the future'),
  type: z.enum(['quiz', 'assignment']),
  isCompleted: z.boolean().optional(),
}).strict();

export const updateQuizSchema = createQuizSchema.partial();

// Generic validation functions
export const validateRequest = <T>(schema: z.ZodSchema<T>) => {
  return (req: any, res: any, next: any) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.issues.map((issue: any) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({ error: 'Validation error' });
    }
  };
};

// Type exports for use in route handlers
export type CreateAnnouncementData = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncementData = z.infer<typeof updateAnnouncementSchema>;
export type CreateQuizData = z.infer<typeof createQuizSchema>;
export type UpdateQuizData = z.infer<typeof updateQuizSchema>;