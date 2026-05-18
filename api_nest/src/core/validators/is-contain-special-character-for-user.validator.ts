import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'IsNotContainSpecialCharacterForUser',
  async: false,
})
export class IsNotContainSpecialCharacterForUser
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean | Promise<boolean> {
    const regEx = new RegExp(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/\s]/gm);
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
