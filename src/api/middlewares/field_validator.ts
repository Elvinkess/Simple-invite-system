import {Request,Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export class Validator {
  signValidation = [

    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address'),
    body('role')
      .notEmpty()
      .withMessage('Role is required')
      .isIn(['tenant', 'houseowner'])
      .withMessage('Role must be either tenant or houseowner'),
    
  ];

   validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array().map(error => error.msg) }); // Respond with error messages
      return;
    }
    next();
  };
  
}
