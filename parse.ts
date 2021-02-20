import fs from 'fs';
import path from 'path';
import {DocsParser} from '@src/DocsParser';
import {IDataSchema} from '@src/Parser/Schema';

export {DocsParser} from '@src/DocsParser';
export {Parser} from '@src/Parser/Parser';
export * from '@src/Parser/Schema';

const docs = fs.readFileSync(path.join(__dirname, 'data', 'Docs.json')).toString();
const schema = DocsParser.parseDocsString(docs);
fs.writeFileSync(path.join(__dirname, 'data', 'data.json'), JSON.stringify(schema, null, '\t') + '\n');

function writeData(data: {[key: string]: {}}, name: string)
{
	for (const key in data) {
		const dir = path.join(__dirname, 'data', 'output', name);
		fs.mkdirSync(dir, {recursive: true});
		fs.writeFileSync(path.join(dir, key + '.json'), JSON.stringify(data[key], null, '\t'));
	}
}

for (const key in schema) {
	if (schema.hasOwnProperty(key)) {
		writeData(schema[key as keyof IDataSchema], key);
	}
}
