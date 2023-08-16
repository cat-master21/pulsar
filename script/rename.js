console.log("Starting the binary renaming script...");

const fs = require('fs');

const prefix = process.argv[2];

const pulsarVersion = require('../package.json').version

if (pulsarVersion.endsWith('-dev')) {
        console.log(`Based on the version string in package.json (${pulsarVersion}),`);
	console.log('we are not preparing a Regular release, so not renaming any binaries.');
	console.log('Exiting the binary renaming script.');
} else {

	// Warn about required prefix as first argument.
	// If prefix was not provided, print warning and do nothing else, exiting "cleanly" with status 0.
	if (typeof prefix !== "string" || prefix.length === 0) {
		console.log("A prefix is required. Pass the desired prefix as the first argument to this script.");
		console.log('Example usage: "node script/rename.js Windows"');
		console.log('or: "node script/rename.js ARM.Linux"');
		console.log("Exiting the binary renaming script.");
	} else {
		console.log(`Prefix is: ${prefix}`);

		// Rename files under ./binaries/* that haven't already been renamed
		const fileNames = fs.readdirSync('./binaries');

		fileNames.forEach((file) => {
			console.log(`Existing filename is: ${file}`);

			// We use 'starting with "p" or "P"' as the heuristic
			// for whether or not the file has already been renamed (and thus prefixed) before.
			if (file.startsWith('p') || file.startsWith('P')) {
				let dest = `${prefix}.${file}`
				// Replace any spaces with periods in the resulting filenames
				dest = dest.replace(/ /g,".");
				console.log(`Renaming file from "${file}" to "${dest}"`);
				fs.renameSync(`./binaries/${file}`, `./binaries/${dest}`);
			} else {
				console.log('Filename does not start with "p" or "P". Skipping...');
			};
		});
	};
};
