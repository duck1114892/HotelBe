import { Controller, Post, Req } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from './mailer.service';
import { Public } from 'src/auth/decorator/customsize';

@Controller('mail')
export class MailController {
    constructor(
        private mailerService: MailerService,
        private mailService: MailService,
    ) { }

    // Hàm chuyển đổi ngày tháng năm
    formatDate(date: Date): string {
        const ngay = date.getDate();
        const thang = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const nam = date.getFullYear();
        return `${ngay}/${thang}/${nam}`;
    }
    @Public()
    @Post()
    async handleTestEmail(@Req() req) {
        try {
            const data = req.body;
            console.log(data);

            // Chuyển đổi ngày tháng năm
            const checkInDate = this.formatDate(new Date(data.checkIn));
            const checkOutDate = this.formatDate(new Date(data.checkOut));

            await this.mailerService.sendMail({
                to: data?.email,
                from: '"Support Team" <support@example.com>',
                subject: 'Phòng Của Bạn Đã Được Duyệt',
                template: "templates",
                context: {
                    receiver: "Check",
                    data: {
                        name: data.name.toString(),
                        roomName: data.roomName.toString(),
                        img: data.img,
                        checkIn: checkInDate,
                        checkOut: checkOutDate
                    }
                }
            });

            return { message: 'Email sent successfully' };
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}
