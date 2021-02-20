export class Utils
{

	public static ensureArray(item: any): any[]
	{
		return Array.isArray(item) ? item : [item];
	}

	public static sortByKeys(object: {[key: string]: any}): {[key: string]: any}
	{
		const sorted: {[key: string]: any} = {};
		Object.keys(object).sort().forEach((key: string) => {
			sorted[key] = object[key];
		});
		return sorted;
	}

	public static stackSizeFromEnum(size: string): number
	{
		switch (size) {
			case 'SS_ONE':
				return 1;
			case 'SS_SMALL':
				return 50;
			case 'SS_MEDIUM':
				return 100;
			case 'SS_BIG':
				return 200;
			case 'SS_HUGE':
				return 500;
			case 'SS_FLUID':
				return 50000;
			default:
				throw new Error('Invalid stack size ' + size);
		}
	}

}
