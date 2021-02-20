export interface IDataSchema
{

	items: {[key: string]: IItemSchema};
	recipes: {[key: string]: IRecipeSchema};
	schematics: {[key: string]: ISchematicSchema};
	generators: {[key: string]: IGeneratorSchema};
	resources: {[key: string]: IResourceSchema};
	miners: {[key: string]: IMinerSchema};
	buildings: {[key: string]: IBuildingSchema};

}

export interface IItemSchema
{

	name: string;
	sinkPoints: number;
	description: string;
	className: string;
	stackSize: number;
	energyValue: number;
	radioactiveDecay: number;
	liquid: boolean;
	fluidColor: IColorSchema;

}

export interface IRecipeSchema
{

	name: string;
	className: string;
	alternate: boolean;
	time: number;
	inHand: boolean;
	forBuildGun: boolean;
	inWorkshop: boolean;
	inMachine: boolean;
	manualTimeMultiplier: number;
	ingredients: IItemAmountSchema[];
	products: IItemAmountSchema[];
	producedIn: string[];

}

export interface ISchematicSchema
{

	className: string;
	type: string;
	name: string;
	cost: IItemAmountSchema[];
	unlock: ISchematicUnlockSchema;
	requiredSchematics: string[];
	tier: number;
	time: number;
	mam: boolean;
	alternate: boolean;

}

export interface ISchematicUnlockSchema
{

	recipes: string[];
	scannerResources: string[];
	inventorySlots: number;

}

export interface IGeneratorSchema
{

	className: string;
	fuel: string[];
	powerProduction: number;
	powerProductionExponent: number;
	waterToPowerRatio: number;

}

export interface IResourceSchema
{

	item: string;
	pingColor: IColorSchema;
	speed: number;

}

export interface IMinerSchema
{

	className: string;
	allowedResources: string[];
	allowLiquids: boolean;
	allowSolids: boolean;
	itemsPerCycle: number;
	extractCycleTime: number;

}

export interface IBuildingSchema
{

	name: string;
	description: string;
	className: string;
	categories: string[];
	buildMenuPriority: number;
	metadata: IBuildingMetadataSchema;
	size: ISizeSchema;

}

export interface IManufacturerSchema extends IBuildingSchema
{

	metadata: IManufacturerMetadataSchema;

}

export interface IBuildingMetadataSchema
{

	beltSpeed?: number;
	firstPieceCostMultiplier?: number;
	lengthPerCost?: number;
	maxLength?: number;
	storageSize?: number;
	powerConsumption?: number;
	powerConsumptionExponent?: number;
	manufacturingSpeed?: number;
	inventorySize?: number;
	flowLimit?: number;
	maxPressure?: number;
	storageCapacity?: number;

}

export interface IManufacturerMetadataSchema extends IBuildingMetadataSchema
{

	powerConsumption: number;
	powerConsumptionExponent: number;
	manufacturingSpeed: number;

}

export interface IColorSchema
{

	r: number;
	g: number;
	b: number;
	a: number;

}

export interface IItemAmountSchema
{

	item: string;
	amount: number;

}

export interface ISizeSchema
{

	width: number;
	length: number;
	height: number;

}
