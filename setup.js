/* eslint-disable no-new */

const cp = require('child_process');
const fs = require('fs');

const args = process.argv.slice(2);
const setupWithDocker = !!args.find((a) => a.toLowerCase() === 'docker');
const forceReInstall = !!args.find((a) => a.toLowerCase() === '-f');

const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	underscore: '\x1b[4m',
	blink: '\x1b[5m',
	reverse: '\x1b[7m',
	hidden: '\x1b[8m',

	fg: {
		black: '\x1b[30m',
		red: '\x1b[31m',
		green: '\x1b[32m',
		yellow: '\x1b[33m',
		blue: '\x1b[34m',
		magenta: '\x1b[35m',
		cyan: '\x1b[36m',
		white: '\x1b[37m',
		crimson: '\x1b[38m', // Scarlet
	},

	bg: {
		black: '\x1b[40m',
		red: '\x1b[41m',
		green: '\x1b[42m',
		yellow: '\x1b[43m',
		blue: '\x1b[44m',
		magenta: '\x1b[45m',
		cyan: '\x1b[46m',
		white: '\x1b[47m',
		crimson: '\x1b[48m',
	},
};

const colorSchema = [colors.bg.blue, colors.fg.white];

if (!fs.existsSync('./node_modules') || forceReInstall) {
	console.log(...colorSchema, 'Installing NPM packages....', colors.reset);
	executeCommand('npm install');
}

let env;
if (fs.existsSync('.env')) {
	env = fs
		.readFileSync('.env', 'utf8')
		.split('\n')
		.reduce((acc, cur) => {
			const [key, value] = cur.split('=');
			if (key) acc = { ...acc, [key]: value };
			return acc;
		}, {});

	if (!('DATABASE_URL' in env)) {
		console.log(
			...colorSchema,
			'DATABASE_URL is missing, please delete the env and re-run the command',
			colors.reset,
		);

		process.exit(1);
	}

	if (env.DATABASE_URL.indexOf('<') !== -1) {
		console.log(
			...colorSchema,
			'DATABASE_URL has got undefined values either of user, password, host, port, db',
			colors.reset,
		);

		process.exit(1);
	}

	new Promise((resolve) => {
		if (!setupWithDocker) resolve();

		console.log(...colorSchema, 'Dockerize in process for the server....', colors.reset);
		executeCommand('docker-compose up -d');

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
	}).then(() => {
		console.log(...colorSchema, 'running db migration to upsert tables....', colors.reset);
		executeCommand('npm run db:deploy');

		executeCommand('echo "\\e[1;32m Setup Finished \\e[0m"', true);
	});
} else {
	console.log(...colorSchema, 'Please fill the ENV file and re-run the command....', colors.reset);

	executeCommand('cp .env.example .env', true);
}

function executeCommand(cmd, exit = false) {
	const result = cp.spawnSync(cmd, { cwd: process.cwd(), stdio: 'inherit', shell: true });

	if (result.status || exit) process.exit(result.status);
	else return true;
}
