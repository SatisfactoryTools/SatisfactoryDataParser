import {ISchematicSchema, ISchematicUnlockSchema} from '@src/Parser/Schema';
import {Parser} from '@src/Parser/Parser';
import {Utils} from '@src/Utils/Utils';
import {ItemAmount} from '@src/Satisfactory/ItemAmount';

export class Schematic
{

	public static from(schematic: {
		ClassName: string,
		mType: string,
		mTechTier: string,
		mDisplayName: string,
		mCost: string,
		mUnlocks: {
			mRecipes?: string;
			mResourcesToAddToScanner?: string;
			mNumInventorySlotsToUnlock?: string;
		}[],
		mSchematicDependencies: {
			Class?: string;
			mSchematics?: string;
			mRequireAllSchematicsToBePurchased?: string;
		}[],
		mTimeToComplete: string
	}): ISchematicSchema|null
	{
		if (schematic.mType === 'EST_ResourceSink' || schematic.mType === 'EST_Custom') {
			return null;
		}

		const requiredSchematics: string[] = [];
		const unlockData: ISchematicUnlockSchema = {
			inventorySlots: 0,
			recipes: [],
			scannerResources: [],
		};

		for (const unlock of schematic.mUnlocks) {
			if (unlock.mNumInventorySlotsToUnlock) {
				unlockData.inventorySlots += parseInt(unlock.mNumInventorySlotsToUnlock);
			}
			if (unlock.mRecipes) {
				unlockData.recipes.push(...Utils.ensureArray(Parser.parseString(unlock.mRecipes)).map(Parser.parseBlueprintClass));
			}
			if (unlock.mResourcesToAddToScanner) {
				unlockData.scannerResources.push(...Utils.ensureArray(Parser.parseString(unlock.mResourcesToAddToScanner)).map(Parser.parseBlueprintClass));
			}
		}

		for (const requirement of schematic.mSchematicDependencies) {
			if (requirement.Class === 'BP_SchematicPurchasedDependency_C' && requirement.mSchematics) {
				requiredSchematics.push(...Utils.ensureArray(Parser.parseString(requirement.mSchematics)).map(Parser.parseBlueprintClass));
			}
		}

		const cost = schematic.mCost ? Utils.ensureArray(Parser.parseString(schematic.mCost)).map(ItemAmount.from) : [];

		return {
			className: schematic.ClassName,
			name: schematic.mDisplayName,
			tier: parseInt(schematic.mTechTier),
			cost: cost,
			unlock: unlockData,
			requiredSchematics: requiredSchematics,
			type: schematic.mType,
			time: parseFloat(schematic.mTimeToComplete),
			alternate: false,
			mam: false,
		};
	}

}
