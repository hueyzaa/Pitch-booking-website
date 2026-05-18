import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNotEmptyCustom', async: false })
export class IsNotEmptyCustom implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    if (value || value === 0) {
      return true;
    } else {
      return false;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} không được phép bỏ trống`;
  }
}
