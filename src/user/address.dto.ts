import { IsString } from 'class-validator'

class createAddressDto{
    @IsString()
    public street :string;
    @IsString()
    public city: string ;
    @IsString()
    public country: string ;
}

export default createAddressDto