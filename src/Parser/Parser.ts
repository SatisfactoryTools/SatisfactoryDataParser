export class Parser
{

	public static readonly OPENING_BRACE = 'openingBrace';
	public static readonly CLOSING_BRACE = 'closingBrace';
	public static readonly STRING = 'string';
	public static readonly EQUAL_SIGN = 'equal';
	public static readonly SEPARATOR = 'separator';
	public static readonly UNKNOWN = 'unknown';

	public static parseBlueprintClass(blueprint: string): string
	{
		if (blueprint === null) {
			return '';
		}
		let match = blueprint.match(/"(.*?)"/);
		if (!match) {
			match = ['', blueprint];
		}
		if (match) {
			const parts = match[1].split('.');
			return parts[parts.length - 1];
		}
		return 'Undefined';
	}

	public static parseString(text: string): any
	{
		const parsers: {[index: string]: RegExp} = {};
		parsers[Parser.OPENING_BRACE] = /\(/;
		parsers[Parser.CLOSING_BRACE] = /\)/;
		parsers[Parser.STRING] = /[a-zA-Z0-9:\\/.'"_\-]+/;
		parsers[Parser.EQUAL_SIGN] = /=/;
		parsers[Parser.SEPARATOR] = /,/;

		return Parser.parseTokens(Parser.tokenize(text, parsers, Parser.UNKNOWN), 0).result;
	}

	private static parseTokens(tokens: IToken[], currentIndex: number): {result: any, currentIndex: number}
	{
		let result: any = null;
		let index = currentIndex;
		for (; index < tokens.length; index++) {
			switch (tokens[index].type) {
				case Parser.OPENING_BRACE:
					if (result === null) {
						result = [];
					} else if (Array.isArray(result) || Parser.isObject(result)) {
						const parsed = this.parseTokens(tokens, index + 1);
						if (Array.isArray(result)) {
							result.push(parsed.result);
						} else {
							result[result.length] = parsed.result;
						}
						index = parsed.currentIndex - 1;
					}
					break;
				case Parser.CLOSING_BRACE:
					return {
						result: result,
						currentIndex: index + 1,
					};
				case Parser.STRING:
					if (tokens[index + 1] && tokens[index + 1].type === Parser.EQUAL_SIGN) {
						if (result === null) {
							result = {};
						} else if (Array.isArray(result)) {
							if (result.length) {
								throw new Error('Mixed array and object');
							}
							result = {};
						}

						const key = tokens[index].token;
						if (!tokens[index + 2] || tokens[index + 2].type !== Parser.STRING) {
							throw new Error(tokens[index + 2] ? 'Expected string, got ' + tokens[index + 2].token : 'Unexpected end of input');
						}
						result[key] = tokens[index + 2].token;
						index += 2;
					} else {
						if (result === null) {
							result = tokens[index].token;
						} else {
							if (typeof result === 'string') {
								result = [result];
							} else if (!Array.isArray(result)) {
								throw new Error('Mixed array and object');
							}
							result.push(tokens[index].token);
						}
					}

					if (!(!tokens[index + 1] || tokens[index + 1].type === Parser.SEPARATOR || tokens[index + 1].type === Parser.CLOSING_BRACE)) {
						throw new Error('Expected separator, closing brace or end of input, got ' + tokens[index + 1].token);
					}
			}
		}
		return {
			result: result,
			currentIndex: index,
		};
	}

	private static tokenize(text: string, parsers: {[index: string]: RegExp}, defaultToken?: any): IToken[]
	{
		let matchIndex;
		let result;
		let token;
		const tokens = [];
		while (text) {
			token = null;
			matchIndex = text.length;
			for (const key in parsers) {
				if (parsers.hasOwnProperty(key)) {
					result = parsers[key].exec(text);
					if (result && (result.index < matchIndex)) {
						token = {
							token: result[0],
							type: key,
							matches: result.slice(1),
						};
						matchIndex = result.index;
					}
				}
			}
			if (matchIndex) {
				tokens.push({
					token: text.substr(0, matchIndex),
					type: defaultToken || 'unknown',
				});
			}
			if (token) {
				tokens.push(token);
			}
			text = text.substr(matchIndex + (token ? token.token.length : 0));
		}
		return tokens;
	}

	private static isObject(object: any): boolean
	{
		return typeof object === 'object' && object !== null;
	}

}

interface IToken
{
	token: string;
	type: string;
	matches?: any;
}
