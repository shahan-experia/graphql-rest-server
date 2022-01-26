/* eslint-disable no-new */

import { executeCommand } from './src/utils/wrapper';
import fs from 'fs';

executeCommand('echo "\\e[1;32m ....stopping current containers.... \\e[0m"');
executeCommand('npm run down');
executeCommand('npm run down:test');

new Promise((resolve) => {
	executeCommand('echo "\\e[1;32m ....running containers for test.... \\e[0m"');
	executeCommand('npm run up:test');

	const env = fs
		.readFileSync('.env', 'utf8')
		.split('\n')
		.reduce((acc, cur) => {
			const [key, value] = cur.split('=');
			if (key) acc = { ...acc, [key]: value };
			return acc;
		}, {});

	const mysqlConfig = env.DATABASE_URL.split('mysql://')[1].split('/')[0];
	const [user, password] = mysqlConfig.split('@')[0].split(':');

	const container = 'graphql-rest-server_mysql_db_1';

	executeCommand(`
			while ! docker exec ${container} mysql --user=${user} --password=${password} -e "SELECT 1" >/dev/null 2>&1;
			do
				printf "."
				sleep 2
			done
			printf "\n"
		`);

	resolve();

	setTimeout(resolve, 5000);
})
	.then(() => {
		executeCommand('echo "\\e[1;32m ....run db migration to upsert tables.... \\e[0m"');
		executeCommand('npm run db:deploy');

		executeCommand('echo "\\e[1;32m ....running test.... \\e[0m"');
		executeCommand('mocha -r esm src/tests/**/*.spec.js --exit');
	})
	.finally(() => {
		executeCommand('npm run down:test', true);
	});
