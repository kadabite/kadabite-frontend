module.exports = {
	apps: [
		{
			name: 'next-app',
			script: 'node_modules/.bin/next',
			args: 'start',
			env: {
				NODE_ENV: 'production'
			}
		},
		{
			name: 'consumer',
			script: 'node_modules/.bin/ts-node',
			args: 'email/consumer.ts',
			env: {
				NODE_ENV: 'production'
			}
		}
	]
};