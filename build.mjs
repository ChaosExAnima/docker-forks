#!/usr/bin/env zx

import path from 'path';

/** @param {Array<string, string[]>} strings */
function multiline( ...strings ) {
	console.log( strings.flat().join( '\n' ) );
}

function showHelpAndExit() {
	multiline(
		'Images available:',
		images.map( image => ` - ${image}` ),
	);
	process.exit();
}

/** @type string */
let [ image ] = argv._.slice( 1 );
/** @type string[] */
let images = [];
const composePath = path.resolve( __dirname, 'docker-compose.yml' );
try {
	/** @type string */
	const composeFile = fs.readFileSync( composePath, 'utf-8' );
	if ( ! composeFile ) {
		throw new Error();
	}
	/** @type {services: {[key: string]: unknown}} */
	const compose = YAML.parse( composeFile );
	images = Object.keys( compose.services );
} catch (err) {
	console.log( `Could not find Compose file at ${ composePath }? 😕` );
	process.exit( 1 );
}

if ( ! images.includes( image ) && image !== 'all' ) {
	showHelpAndExit();
}

if ( image === 'all' ) {
	image = '';
}

await $`docker context use default`.quiet();

console.log( chalk.bold( `Building image ${ image }... 🔨` ) );
await $`docker compose -f ${ composePath } build ${ image }`;

const push = argv.push === 'true';
if ( ! push ) {
	console.log( chalk.bold( 'That\'s all, folks! 👋' ) );
	process.exit();
}

console.log( chalk.bold( 'Pushing to Docker Hub... ⬆🌥' ) );
await $`docker compose -f ${ composePath } push ${ image }`;

console.log( chalk.bold( '💥🎤💧' ) );
