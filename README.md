# SatisfactoryDataParser
Parses included Docs.json file to a documented JSON structure.

## Installation

Install all the needed libraries using `yarn install` command.

## Usage

Create directory `data` and put the `Docs.json` file from game there (found at `CommunityResources/Docs.json`). Then run `yarn parse`.
This will create a file called `data.json` with all the data, as well as `output` directory with data split to separate files.

## Schema

JSON schema can be found in `schema.json`. You can also check `src/Parser/Schema.ts` file for Typescript schema definitions.
