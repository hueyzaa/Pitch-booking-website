import { NguoiDung } from 'src/database/entities/auth/nguoi-dung.entity';
import { VaiTro } from 'src/database/entities/auth/vai-tro.entity';
import { Repository } from 'typeorm';
export declare class SeedService {
    private readonly roleRepository;
    private readonly userRepository;
    private readonly logger;
    constructor(roleRepository: Repository<VaiTro>, userRepository: Repository<NguoiDung>);
    seedRoles(): Promise<void>;
    seedUsers(): Promise<void>;
    genHashedPassword(pass: string): Promise<string>;
}
