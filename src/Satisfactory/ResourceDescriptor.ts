import {IResourceSchema} from '@src/Parser/Schema';
import {Color} from '@src/Satisfactory/Color';
import {Parser} from '@src/Parser/Parser';

export class ResourceDescriptor
{

	public static from(descriptor: {
		ClassName: string,
		mDecalSize: string,
		mPingColor: string,
		mCollectSpeedMultiplier: string,
		mManualMiningAudioName: string,
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
	}): IResourceSchema
	{
		return {
			item: descriptor.ClassName,
			pingColor: Color.from(Parser.parseString(descriptor.mPingColor), true),
			speed: parseFloat(descriptor.mCollectSpeedMultiplier),
		};
	}

}
