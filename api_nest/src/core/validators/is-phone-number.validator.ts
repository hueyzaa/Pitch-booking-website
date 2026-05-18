import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPhoneNumber', async: false })
export class IsPhoneNumber implements ValidatorConstraintInterface {
  validate(text: string) {
    // Nếu không có giá trị, trả về true (có thể đổi thành false nếu bắt buộc)
    if (!text) return true;

    // Số trong nước: bắt đầu bằng 0, độ dài 10-12 ký tự
    if (text.startsWith('0')) {
      return text.length >= 10 && text.length <= 12;
    }

    // Số nước ngoài: không ràng buộc gì cả
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} phải là số điện thoại hợp lệ: trong nước 10-12 ký tự và bắt đầu bằng 0, nước ngoài không ràng buộc`;
  }
}
