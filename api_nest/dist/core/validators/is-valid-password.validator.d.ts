import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsValidPassword implements ValidatorConstraintInterface {
    validate(value: any): boolean | Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
