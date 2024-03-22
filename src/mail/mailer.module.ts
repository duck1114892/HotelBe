import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailController } from "./mail.controller";
import { MailService } from "./mailer.service";
import { join } from "path";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: 'smtp.gmail.com',
                    secure: false,
                    auth: {
                        user: 'chuvjt25835@gmail.com',
                        pass: 'nldv vbgj cdhk cznw',
                    },
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
                preview: true
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [MailController],
    providers: [MailService],
})
export class MailModule { }