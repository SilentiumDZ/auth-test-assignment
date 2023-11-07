import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'test',
    entities: [
        'src/entities/*.ts',
    ],
    migrations: ['src/migrations/*.ts'],
});
