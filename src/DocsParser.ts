import {IDataSchema, IItemSchema} from '@src/Parser/Schema';
import {ItemDescriptor} from '@src/Satisfactory/ItemDescriptor';
import {Recipe} from '@src/Satisfactory/Recipe';
import {ResourceDescriptor} from '@src/Satisfactory/ResourceDescriptor';
import {Building} from '@src/Satisfactory/Building';
import {ResourceExtractor} from '@src/Satisfactory/ResourceExtractor';
import {Generator} from '@src/Satisfactory/Generator';
import {BuildingDescriptor} from '@src/Satisfactory/BuildingDescriptor';
import {Schematic} from '@src/Satisfactory/Schematic';
import {Utils} from '@src/Utils/Utils';

export class DocsParser
{

	public static parseDocsString(docsString: string): IDataSchema
	{
		const docs = JSON.parse(docsString);
		const schema: IDataSchema = {
			recipes: {},
			items: {},
			schematics: {},
			generators: {},
			resources: {},
			miners: {},
			buildings: {},
		};
		const biomass: IItemSchema[] = [];
		const extraInfo: any[] = [];

		for (const definitions of docs) {
			switch (definitions.NativeClass) {
				case 'Class\'/Script/FactoryGame.FGItemDescriptor\'':
				case 'Class\'/Script/FactoryGame.FGEquipmentDescriptor\'':
				case 'Class\'/Script/FactoryGame.FGConsumableDescriptor\'':
				case 'Class\'/Script/FactoryGame.FGItemDescriptorNuclearFuel\'':
					for (const def of definitions.Classes) {
						const item = ItemDescriptor.from(def)
						if (item) {
							schema.items[item.className] = item;
						}
					}
					break;
				case 'Class\'/Script/FactoryGame.FGRecipe\'':
					for (const def of definitions.Classes) {
						const recipe = Recipe.from(def);
						if (recipe) {
							schema.recipes[recipe.className] = recipe;
						}
					}
					break;
				case 'Class\'/Script/FactoryGame.FGResourceDescriptor\'':
					for (const def of definitions.Classes) {
						const item = ItemDescriptor.from(def)
						if (item) {
							schema.items[item.className] = item;
						}
					}
					for (const def of definitions.Classes) {
						const resource = ResourceDescriptor.from(def);
						schema.resources[resource.item] = resource;
					}
					break;
				case 'Class\'/Script/FactoryGame.FGItemDescriptorBiomass\'':
					for (const def of definitions.Classes) {
						const item = ItemDescriptor.from(def)
						if (item) {
							schema.items[item.className] = item;
							biomass.push(item);
						}
					}
					break;
				case 'Class\'/Script/FactoryGame.FGBuildablePole\'':
				case 'Class\'/Script/FactoryGame.FGBuildableConveyorBelt\'':
				case 'Class\'/Script/FactoryGame.FGBuildableWire\'':
				case 'Class\'/Script/FactoryGame.FGBuildablePowerPole\'':
				case 'Class\'/Script/FactoryGame.FGBuildableTradingPost\'':
				case 'Class\'/Script/FactoryGame.FGBuildableSpaceElevator\'':
				case 'Class\'/Script/FactoryGame.FGBuildableManufacturer\'':
				case 'Class\'/Script/FactoryGame.FGBuildableStorage\'':
				case 'Class\'/Script/FactoryGame.FGBuildable\'':
				case 'Class\'/Script/FactoryGame.FGBuildableWall\'':
				case 'Class\'/Script/FactoryGame.FGBuildableStair\'':
				case 'Class\'/Script/FactoryGame.FGBuildableConveyorLift\'':
				case 'Class\'/Script/FactoryGame.FGBuildablePipelineSupport\'':
				case 'Class\'/Script/FactoryGame.FGBuildablePipeline\'':
				case 'Class\'/Script/FactoryGame.FGBuildablePipelineJunction\'':
				case 'Class\'/Script/FactoryGame.FGBuildablePipelinePump\'':
				case 'Class\'/Script/FactoryGame.FGBuildablePipeReservoir\'':
				case 'Class\'/Script/FactoryGame.FGBuildableTrainPlatformCargo\'':
				case 'Class\'/Script/FactoryGame.FGBuildableRailroadStation\'':
				case 'Class\'/Script/FactoryGame.FGBuildableRailroadTrack\'':
				case 'Class\'/Script/FactoryGame.FGBuildableFoundation\'':
				case 'Class\'/Script/FactoryGame.FGBuildableFactory\'':
				case 'Class\'/Script/FactoryGame.FGBuildableAttachmentMerger\'':
				case 'Class\'/Script/FactoryGame.FGBuildableAttachmentSplitter\'':
				case 'Class\'/Script/FactoryGame.FGBuildableResourceSink\'':
				case 'Class\'/Script/FactoryGame.FGBuildableResourceSinkShop\'':
				case 'Class\'/Script/FactoryGame.FGConveyorPoleStackable\'':
				case 'Class\'/Script/FactoryGame.FGBuildableDockingStation\'':
				case 'Class\'/Script/FactoryGame.FGPipeHyperStart\'':
				case 'Class\'/Script/FactoryGame.FGBuildablePipeHyper\'':
				case 'Class\'/Script/FactoryGame.FGBuildableTrainPlatformEmpty\'':
				case 'Class\'/Script/FactoryGame.FGBuildableSplitterSmart\'':
				case 'Class\'/Script/FactoryGame.FGBuildableWalkway\'':
				case 'Class\'/Script/FactoryGame.FGVehicleDescriptor\'':
				case 'Class\'/Script/FactoryGame.FGBuildableRadarTower\'':
					for (const def of definitions.Classes) {
						const building = Building.from(def, true);
						if (building) {
							schema.buildings[building.className] = building;
						}
					}
					break;
				case 'Class\'/Script/FactoryGame.FGBuildableResourceExtractor\'':
					for (const def of definitions.Classes) {
						const building = Building.from(def, true);
						if (building) {
							schema.buildings[building.className] = building;
						}
					}
					for (const def of definitions.Classes) {
						const miner = ResourceExtractor.from(def);
						schema.miners[miner.className] = miner;
					}
					break;
				case 'Class\'/Script/FactoryGame.FGBuildableGeneratorFuel\'':
				case 'Class\'/Script/FactoryGame.FGBuildableGeneratorNuclear\'':
				case 'Class\'/Script/FactoryGame.FGBuildableGeneratorGeoThermal\'':
					for (const def of definitions.Classes) {
						const building = Building.from(def, true);
						if (building) {
							schema.buildings[building.className] = building;
						}
					}
					for (const def of definitions.Classes) {
						const generator = Generator.from(def);
						schema.generators[generator.className] = generator;
					}
					break;
				case 'Class\'/Script/FactoryGame.FGBuildingDescriptor\'':
					for (const def of definitions.Classes) {
						extraInfo.push(BuildingDescriptor.from(def));
					}
					break;
				case 'Class\'/Script/FactoryGame.FGSchematic\'':
					for (const def of definitions.Classes) {
						const schematic = Schematic.from(def);
						if (schematic) {
							schema.schematics[schematic.className] = schematic;
						}
					}
					break;
			}
		}

		// add missing vehicles
		const vehicleMapping: {
			key: string,
			name: string,
			description: string,
		}[] = [
			{
				key: 'Desc_Truck_C',
				name: 'Truck',
				description: '48 slot inventory. Has a built in Craft Bench. Can be automated to pick up and deliver resources at Truck Stations. Nicknamed the Unit by FICSIT pioneers because of its massive frame.',
			},
			{
				key: 'Desc_Tractor_C',
				name: 'Tractor',
				description: '25 slot inventory. Has a built in Craft Bench. Can be automated to pick up and deliver resources at Truck Stations. Nicknamed the Sugarcube by FICSIT pioneers.',
			},
			{
				key: 'Desc_FreightWagon_C',
				name: 'Freight Car',
				description: 'The Freight Car is used to transport large quantity of resources from one place to another. Resources are loaded or unloaded at Freight Platforms.\nMust be build on Railway.',
			},
			{
				key: 'Desc_Locomotive_C',
				name: 'Electric Locomotive',
				description: 'This locomotive is used to move Freight Cars from station to station.\nRequires 25-110MW of Power to drive.\nMust be built on railway.\nNamed \'Leif\' by FISCIT pioneers because of its reliability.',
			},
			{
				key: 'Desc_Explorer_C',
				name: 'Explorer',
				description: '24 slot inventory. Has a built in craft bench. Fast and nimble exploration vehicle. Tuned for really rough terrain and can climb almost vertical surfaces.',
			},
			{
				key: 'Desc_CyberWagon_C',
				name: 'Cyber Wagon',
				description: 'Absolutely indestructible.\nNeeds no further introduction.',
			},
		];

		for (const item of vehicleMapping) {
			schema.buildings[item.key].name = item.name;
			schema.buildings[item.key].description = item.description;
		}

		// add extra info to buildings
		for (const info of extraInfo) {
			for (const key in schema.buildings) {
				if (info.className === schema.buildings[key].className) {
					schema.buildings[key].buildMenuPriority = info.priority;
					schema.buildings[key].categories = info.categories;
					break;
				}
			}
		}

		// add biomass stuff to biomass burner
		for (const key in schema.generators) {
			const index = schema.generators[key].fuel.indexOf('FGItemDescriptorBiomass');
			if (index !== -1) {
				schema.generators[key].fuel.splice(index, 1);
				schema.generators[key].fuel.push(...biomass.map((bio) => {
					return bio.className;
				}));
			}
		}

		// convert liquid requirements to m3
		for (const key in schema.recipes) {
			const recipe = schema.recipes[key];

			for (const ingredient of recipe.ingredients) {
				if (!schema.items[ingredient.item]) {
					throw new Error('Invalid item ' + ingredient.item);
				}
				if (schema.items[ingredient.item].liquid) {
					ingredient.amount /= 1000;
				}
			}
			for (const product of recipe.products) {
				if (!schema.items[product.item]) {
					continue;
				}
				if (schema.items[product.item].liquid) {
					product.amount /= 1000;
				}
			}
		}

		// attach extractable resources instead of keeping empty array with "everything allowed"
		for (const minerKey in schema.miners) {
			if (schema.miners[minerKey].allowedResources.length > 0) {
				continue;
			}

			const allowedResources = [] as string[];
			for (const resourceKey in schema.resources) {
				if (!schema.items[resourceKey]) {
					throw new Error(`Item of resource type "${resourceKey}" was not found.`);
				}

				const item = schema.items[resourceKey];

				if (item.liquid === schema.miners[minerKey].allowLiquids) {
					allowedResources.push(resourceKey);
				}
			}

			allowedResources.sort();
			schema.miners[minerKey].allowedResources = allowedResources;
		}

		// sort by class name
		for (const key in schema) {
			if (schema.hasOwnProperty(key)) {
				schema[key as keyof IDataSchema] = Utils.sortByKeys(schema[key as keyof IDataSchema]);
			}
		}

		return schema;
	}

}
