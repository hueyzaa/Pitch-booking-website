import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsCCCD implements ValidatorConstraintInterface {
    validate(text: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
