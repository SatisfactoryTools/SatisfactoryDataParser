import {IColorSchema} from '@src/Parser/Schema';

export class Color
{

	public static from(color: {R: string, G: string, B: string, A: string}, convert: boolean = false): IColorSchema
	{
		const multiplier = convert ? 255 : 1;
		return {
			r: parseInt('' + parseFloat(color.R) * multiplier),
			g: parseInt('' + parseFloat(color.G) * multiplier),
			b: parseInt('' + parseFloat(color.B) * multiplier),
			a: parseFloat(color.A),
		};
	}

}
