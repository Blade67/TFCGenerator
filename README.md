# TFCGenerator

###### _Texture Generator for the TerraFirmaCraft Minecraft Mod. This tool may work for other mods._

## Usage

###### Prerequisites: [NodeJS](https://nodejs.org/en/)<br>

After cloning the repo:

```sh
$ npm install
$ npm run example
```

Or:

```sh
$ node . --chest --chest-large-trapped -t oak
```

## Arguments

```sh
--chest                                             # Enables the Chest genarator
--chest-large                                       # Enables the Large Chest genarator
--chest-trapped                                     # Enables the Trapped Chest genarator
--chest-large-trapped, --chest-trapped-large        # Enables the Large Trapped Chest genarator

-t, --type <String[]>                               # Specifies the material type (ie. oak)
```

###### Be sure to provide the required sheet and log textures! This tool assumes them to have the same name.

## To-do

#### Features

-   [ ] `--chest-all` flag to generate all types at once
-   [ ] Wildcard `*` (all) selector for materials

#### Generators

-   [ ] Boats
-   [ ] Bookshelves
-   [ ] Beds
-   [ ] Crafting Tables
-   [ ] Chiseled variants
