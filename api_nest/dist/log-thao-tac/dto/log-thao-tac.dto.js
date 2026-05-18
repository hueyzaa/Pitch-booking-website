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
exports.UpdateLogThaoTacDto = exports.CreateLogThaoTacDto = void 0;
const class_validator_1 = require("class-validator");
class CreateLogThaoTacDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLogThaoTacDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['GET', 'POST', 'PATCH', 'DELETE']),
    __metadata("design:type", String)
], CreateLogThaoTacDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsIn)([null, 0, 1, 2, 3, 4, 5]),
    __metadata("design:type", Number)
], CreateLogThaoTacDto.prototype, "log_type", void 0);
__decorate([
    (0, class_validator_1.IsIn)([null, 0, 1, 2, 3]),
    __metadata("design:type", String)
], CreateLogThaoTacDto.prototype, "severity", void 0);
exports.CreateLogThaoTacDto = CreateLogThaoTacDto;
class UpdateLogThaoTacDto {
}
exports.UpdateLogThaoTacDto = UpdateLogThaoTacDto;
//# sourceMappingURL=log-thao-tac.dto.js.map