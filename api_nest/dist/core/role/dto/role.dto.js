"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleDto = exports.CreateRoleDto = void 0;
const is_not_empty_validator_1 = require("../../validators/is-not-empty.validator");
const mapped_types_1 = require("@nestjs/mapped-types");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateRoleDto {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "ten_vai_tro", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "ma_vai_tro", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Object)
], CreateRoleDto.prototype, "phan_quyen", void 0);
exports.CreateRoleDto = CreateRoleDto;
class UpdateRoleDto extends (0, mapped_types_1.PartialType)(CreateRoleDto) {
}
exports.UpdateRoleDto = UpdateRoleDto;
//# sourceMappingURL=role.dto.js.map