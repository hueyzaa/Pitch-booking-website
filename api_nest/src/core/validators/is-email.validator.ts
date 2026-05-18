import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsEmailCustom', async: false })
export class IsEmailCustom implements ValidatorConstraintInterface {
  validate(text: string) {
    if (text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return true;
    } else {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} phải là địa chỉ Email`;
  }
}
