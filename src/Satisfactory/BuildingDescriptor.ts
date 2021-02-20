import {Utils} from '@src/Utils/Utils';
import {Parser} from '@src/Parser/Parser';

export class BuildingDescriptor
{

	public static from(buildingDescriptor: {
		ClassName: string,
		mSubCategories: string,
		mBuildMenuPriority: string,
	}): IBuildingDescriptor
	{
		return {
			className: buildingDescriptor.ClassName,
			categories: Utils.ensureArray(Parser.parseString(buildingDescriptor.mSubCategories)).map(Parser.parseBlueprintClass),
			priority: parseFloat(buildingDescriptor.mBuildMenuPriority),
		};
	}

}

export interface IBuildingDescriptor
{

	className: string;
	categories: string[];
	priority: number;

}
