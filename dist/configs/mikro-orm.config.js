"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmConfig = void 0;
const MikroOrmConfig = () => {
    return {
        debug: process.env.LOCAL_MODE === 'true',
        allowGlobalContext: true,
        entities: ['dist/entities/*.entity.js'],
        entitiesTs: ['src/entities/*.entity.ts'],
        type: 'mysql',
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        driverOptions: {
            ssl: {
                rejectUnauthorized: false,
                ca: process.env.SSL_CA,
            },
        },
        port: parseInt(process.env.DB_PORT || '3306', 10),
        migrations: {
            snapshot: true,
            tableName: 'migrations',
            path: 'dist/database/migrations',
            pathTs: 'src/database/migrations',
        },
        seeder: {
            path: 'dist/database/seeders',
            pathTs: 'src/database/seeders',
            defaultSeeder: 'DatabaseSeeder',
            emit: 'ts',
            fileName: (className) => className,
        },
    };
};
exports.MikroOrmConfig = MikroOrmConfig;
exports.default = exports.MikroOrmConfig;
//# sourceMappingURL=mikro-orm.config.js.map