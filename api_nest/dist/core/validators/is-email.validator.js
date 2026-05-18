"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmailCustom = void 0;
const class_validator_1 = require("class-validator");
let IsEmailCustom = class IsEmailCustom {
    validate(text) {
        if (text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            return true;
        }
        else {
            return false;
        }
    }
    defaultMessage(args) {
        return `${args.property} phải là địa chỉ Email`;
    }
};
IsEmailCustom = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsEmailCustom', async: false })
], IsEmailCustom);
exports.IsEmailCustom = IsEmailCustom;
//# sourceMappingURL=is-email.validator.js.map