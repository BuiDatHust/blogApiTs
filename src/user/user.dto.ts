import { IsOptional, IsString, ValidateNested } from "class-validator";
import createAddressDto from "./address.dto";

class createUserDto {
    
    @IsString()
    public firstname: string ;

    @IsString()
    public lastname: string ;

    @IsString()
    public password: string ;

    @IsString()
    public email: string ;

    @IsOptional()
    @ValidateNested()
    public address?: createAddressDto;

}

export default createUserDto;