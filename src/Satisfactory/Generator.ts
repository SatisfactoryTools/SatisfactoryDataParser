import {IGeneratorSchema} from '@src/Parser/Schema';
import {Utils} from '@src/Utils/Utils';
import {Parser} from '@src/Parser/Parser';

export class Generator
{

	public static from(generator: {
		ClassName: string,
		mDefaultFuelClasses: string,
		mPowerProduction: string,
		mPowerProductionExponent: string,
		mSupplementalToPowerRatio?: string,
	}): IGeneratorSchema
	{
		return {
			className: generator.ClassName,
			fuel: Utils.ensureArray(Parser.parseString(generator.mDefaultFuelClasses || '()')).map(Parser.parseBlueprintClass),
			powerProduction: parseFloat(generator.mPowerProduction),
			powerProductionExponent: parseFloat(generator.mPowerProductionExponent),
			waterToPowerRatio: parseFloat(generator.mSupplementalToPowerRatio || '0'),
		};
	}

}
