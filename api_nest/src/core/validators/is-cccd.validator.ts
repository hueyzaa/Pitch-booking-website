import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsCCCD', async: false })
export class IsCCCD implements ValidatorConstraintInterface {
  validate(text: string) {
    // Kiểm tra nếu không có giá trị
    if (!text) return false;

    // Kiểm tra CCCD có đúng 12 chữ số
    return /^\d{12}$/.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} phải là số CCCD hợp lệ gồm đúng 12 chữ số`;
  }
}
