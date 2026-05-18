import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsNotContainSpecialCharacterForUser implements ValidatorConstraintInterface {
    validate(value: any): boolean | Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
