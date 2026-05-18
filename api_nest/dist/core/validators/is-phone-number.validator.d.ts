import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsPhoneNumber implements ValidatorConstraintInterface {
    validate(text: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
