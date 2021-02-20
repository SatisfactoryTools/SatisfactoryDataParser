import {IItemSchema} from '@src/Parser/Schema';
import {Utils} from '@src/Utils/Utils';
import {Color} from '@src/Satisfactory/Color';
import {Parser} from '@src/Parser/Parser';

export class ItemDescriptor
{

	public static from(item: {
		ClassName: string,
		mDisplayName: string,
		mDescription: string,
		mStackSize: string,
		mCanBeDiscarded: string,
		mRememberPickUp: string,
		mEnergyValue: string,
		mRadioactiveDecay: string,
		mResourceSinkPoints: string,
		mForm: string,
		mFluidDensity: string,
		mFluidViscosity: string,
		mFluidFriction: string,
		mFluidColor: string,
		mPersistentBigIcon: string,
	}): IItemSchema|null
	{
		if (item.mPersistentBigIcon !== 'None') {
			return {
				className: item.ClassName,
				name: item.mDisplayName,
				sinkPoints: parseInt(item.mResourceSinkPoints),
				description: item.mDescription.replace(/\r\n/ig, '\n'),
				stackSize: Utils.stackSizeFromEnum(item.mStackSize),
				energyValue: parseFloat(item.mEnergyValue),
				radioactiveDecay: parseFloat(item.mRadioactiveDecay),
				liquid: item.mForm === 'RF_LIQUID',
				fluidColor: Color.from(Parser.parseString(item.mFluidColor)),
			};
		}
		return null;
	}

}
