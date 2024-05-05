"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('/api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('English Education Platform API')
        .setDescription('The English Education Platform API description')
        .setVersion('1.0')
        .addServer('http://localhost:3003/', 'Local environment')
        .addTag('engedu-platform')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    const configService = app.get(config_1.ConfigService);
    const corsOrigin = configService.get('LOCAL_MODE') === 'true'
        ? '*'
        : configService.get('CLIENT_URL');
    app.enableCors({
        origin: corsOrigin,
    });
    const port = configService.get('PORT') || 3003;
    await app.listen(port, '0.0.0.0', () => {
        console.log(`App is running on port ${port}...`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map