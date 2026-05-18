import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNotContainSpecialCharacter', async: false })
export class IsNotContainSpecialCharacter
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean | Promise<boolean> {
    const regEx = new RegExp(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s]/gm);
    if (value.match(regEx)) {
      return false;
    } else {
      return true;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} không được phép chứa ký tự đặc biệt`;
  }
}
