import {IMinerSchema} from '@src/Parser/Schema';
import {Parser} from '@src/Parser/Parser';
import {Utils} from '@src/Utils/Utils';

export class ResourceExtractor
{

	public static from(resourceExtractor: {
		ClassName: string,
		mAllowedResources: string,
		mAllowedResourceForms: string,
		mItemsPerCycle: string,
		mExtractCycleTime: string,
	}): IMinerSchema
	{
		const allowedResourceForms = Parser.parseString(resourceExtractor.mAllowedResourceForms);
		let allowLiquids = false;
		let allowSolids = false;

		for (const form of allowedResourceForms) {
			if (form === 'RF_LIQUID') {
				allowLiquids = true;
			} else if (form === 'RF_SOLID') {
				allowSolids = true;
			}
		}

		const minerSchema: IMinerSchema = {
			className: resourceExtractor.ClassName,
			allowedResources: [],
			itemsPerCycle: parseFloat(resourceExtractor.mItemsPerCycle),
			extractCycleTime: parseFloat(resourceExtractor.mExtractCycleTime),
			allowLiquids: allowLiquids,
			allowSolids: allowSolids,
		};
		const allowedResources = Parser.parseString(resourceExtractor.mAllowedResources);

		if (allowedResources !== null) {
			minerSchema.allowedResources = Utils.ensureArray(allowedResources).map(Parser.parseBlueprintClass);
		}

		return minerSchema;
	}

}
