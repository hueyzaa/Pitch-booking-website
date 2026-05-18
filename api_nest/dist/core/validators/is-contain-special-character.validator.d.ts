import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsNotContainSpecialCharacter implements ValidatorConstraintInterface {
    validate(value: any): boolean | Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
