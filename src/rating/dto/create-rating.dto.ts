import { IsNotEmpty } from "class-validator"

export class CreateRatingDto {
    @IsNotEmpty({ message: "không được bỏ trống hotelId" })
    hotelId: string
    @IsNotEmpty({ message: "không được bỏ trống rating" })
    rating: number
    @IsNotEmpty({ message: "không được bỏ trống comment" })
    comment: string
}
