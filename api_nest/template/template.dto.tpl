import { IsNotEmpty } from 'class-validator';

export class Create[ModuleName]Dto {

  //[dtoString]
  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class Update[ModuleName]Dto {

  //[dtoString]
  nguoi_cap_nhat?: number;
}
