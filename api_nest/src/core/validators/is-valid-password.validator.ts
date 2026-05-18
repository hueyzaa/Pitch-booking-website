import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidPassword', async: false })
export class IsValidPassword implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    if (!value) return true;
    const regEx = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm,
    );
    if (value.match(regEx)) {
      return true;
    } else {
      return false;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} phải chứa ít nhất 8 ký tự trong đó bao gồm: Ít nhất một ký tự hoa, Ít nhất một ký tự thường, Ít nhất một chữ số, Ít nhất một ký tự đặc biệt`;
  }
}
