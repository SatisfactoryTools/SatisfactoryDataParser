import {ItemAmount} from '@src/Satisfactory/ItemAmount';
import {Utils} from '@src/Utils/Utils';
import {Parser} from '@src/Parser/Parser';
import {IRecipeSchema} from '@src/Parser/Schema';

export class Recipe
{

	public static from(recipe: {
		ClassName: string;
		mDisplayName: string;
		mIngredients: string;
		mProduct: string;
		mManufactoringDuration: string;
		mManualManufacturingMultiplier: string;
		mProducedIn: string;
	}): IRecipeSchema|null
	{
		const ignoredProducts = [
			'Desc_Truck_C',
			'Desc_FreightWagon_C',
			'Desc_Locomotive_C',
			'Desc_Tractor_C',
			'Desc_Explorer_C',
			'Desc_CyberWagon_C',
		];

		const ignoredRecipes = [
			'Recipe_JumpPadTilted_C',
			'Recipe_JumpPad_C',
		];

		if (ignoredRecipes.indexOf(recipe.ClassName) !== -1) {
			return null;
		}

		const producedIn = Utils.ensureArray(Parser.parseString(recipe.mProducedIn)).map(Parser.parseBlueprintClass).map((className: string) => {
			return className.replace('Build_', 'Desc_');
		});

		const products = Utils.ensureArray(Parser.parseString(recipe.mProduct)).map(ItemAmount.from);

		for (const product of products) {
			if (ignoredProducts.indexOf(product.item) !== -1) {
				return null;
			}
		}

		// ignore converter recipes
		if (producedIn.indexOf('Desc_Converter_C') !== -1) {
			return null;
		}

		let forBuildGun = false;
		let inMachine = false;
		let inWorkshop = false;
		let inHand = false;
		const machines = [];
		for (const producer of producedIn) {
			if (producer === 'BP_BuildGun_C' || producer === 'FGBuildGun') {
				forBuildGun = true;
			} else if (producer === 'BP_WorkshopComponent_C') {
				inWorkshop = true;
			} else if (producer === 'BP_WorkBenchComponent_C' || producer === 'FGBuildableAutomatedWorkBench' || producer === 'Desc_AutomatedWorkBench_C') {
				inHand = true;
			} else {
				inMachine = true;
				machines.push(producer);
			}
		}

		let alternate = recipe.mDisplayName.indexOf('Alternate: ') !== -1;

		if (recipe.ClassName === 'Recipe_Alternate_Turbofuel_C') {
			alternate = true;
		}

		return {
			name: recipe.mDisplayName,
			className: recipe.ClassName,
			alternate: alternate,
			time: parseFloat(recipe.mManufactoringDuration),
			manualTimeMultiplier: parseFloat(recipe.mManualManufacturingMultiplier),
			ingredients: Utils.ensureArray(Parser.parseString(recipe.mIngredients)).map(ItemAmount.from),
			forBuildGun: forBuildGun,
			inMachine: inMachine,
			inHand: inHand,
			inWorkshop: inWorkshop,
			products: products,
			producedIn: machines,
		};
	}

}
