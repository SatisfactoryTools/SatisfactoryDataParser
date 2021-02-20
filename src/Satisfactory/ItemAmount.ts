import {IItemAmountSchema} from '@src/Parser/Schema';
import {Parser} from '@src/Parser/Parser';

export class ItemAmount
{

	public static from(itemAmount: {
		ItemClass: string;
		Amount: string;
	}): IItemAmountSchema
	{
		return {
			item: Parser.parseBlueprintClass(itemAmount.ItemClass),
			amount: parseInt(itemAmount.Amount),
		}
	}

}
