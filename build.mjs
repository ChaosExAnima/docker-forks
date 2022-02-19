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

async function getEnvVars() {
	const rawEnv = await fs.readFile( path.resolve( process.env.PWD, '.env' ), { encoding: 'UTF-8' } );
	const envMap = new Map();
	for ( const env of rawEnv.split( '\n' ) ) {
		const [ key, value ] = env.trim().split( '=', 2 );
		if ( ! key || ! value ) {
			continue;
		}
		envMap.set( key, value );
	}
	return envMap;
}

/** @type string */
const [ image ] = argv._.slice( 1 );
/** @type string */
const tag = argv.tag ?? 'latest';
/** @type string[] */
const images = ( await globby( './**/Dockerfile' ) )
	.map( str => String( str ).trim().slice( 0, -11 ) );

if ( ! image || ! images.includes( image ) ) {
	showHelpAndExit();
}

/** @type Map<string, string> */
const envs = await getEnvVars();
const owner = envs.get( 'OWNER' );
if ( ! owner ) {
	console.log( 'Owner not set.' );
	process.exit( 1 );
}

console.log( chalk.bold( `Building image ${image}... 🔨` ) );
await $`docker build -f ${ image }/Dockerfile . -t ${ owner }/${ image }:${ tag }`;

const push = argv.push === 'true';
if ( ! push ) {
	console.log( chalk.bold( 'Thatʼs all, folks! 👋' ) );
	process.exit();
}

console.log( chalk.bold( 'Pushing to Docker Hub...  ⬆🌥' ) );
await $`docker push ${ owner }/${ image }:${ tag }`;

console.log( chalk.bold( '💥🎤💧' ) );
