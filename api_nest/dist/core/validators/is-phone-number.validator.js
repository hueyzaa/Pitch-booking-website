"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPhoneNumber = void 0;
const class_validator_1 = require("class-validator");
let IsPhoneNumber = class IsPhoneNumber {
    validate(text) {
        if (!text)
            return true;
        if (text.startsWith('0')) {
            return text.length >= 10 && text.length <= 12;
        }
        return true;
    }
    defaultMessage(args) {
        return `${args.property} phải là số điện thoại hợp lệ: trong nước 10-12 ký tự và bắt đầu bằng 0, nước ngoài không ràng buộc`;
    }
};
IsPhoneNumber = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isPhoneNumber', async: false })
], IsPhoneNumber);
exports.IsPhoneNumber = IsPhoneNumber;
//# sourceMappingURL=is-phone-number.validator.js.map