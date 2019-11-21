import { combineReducers } from 'redux'
import SimplexNoise from 'simplex-noise'

import {
	CHANGE_PAGE
} from '../actions/actions'

import HILL_ICON from '../res/icons/HILL_ICON.png'
import MOUNTAIN_ICON from '../res/icons/MOUNTAIN_ICON.png'
import FOREST_ICON from '../res/icons/FOREST_ICON.png'
import RIVER_ICON from '../res/icons/RIVER_ICON.png'
import SETTLEMENT_ICON from '../res/icons/SETTLEMENT_ICON.png'

const simplexElevation = new SimplexNoise()
const simplexRainfall = new SimplexNoise()

const GRASS = 'GRASS'
const OCEAN = 'OCEAN'
const DESERT = 'DESERT'
const SNOW = 'SNOW'

const NOISE_DIVISOR = 8
const WORLD_HEIGHT = 50
const WORLD_WIDTH = 50

const SEA_LEVEL = 0.1
const SNOW_TEMPERATURE = -0.75
const DESERT_TEMPERATURE = -0.5
const TREELINE_TEMPERATURE = -1 - (-1 - SNOW_TEMPERATURE)/2.0
const TREE_RAINFALL = -0.5
const MOUNTAIN_ELEVATION = 0.75
const HILL_ELEVATION = 0.5
const RIVER_RAINFALL = -0.25
const RIVER_CHANCE = 0.35
const FOREST_CHANCE = 0.5
const SETTLEMENT_CHANCE = 0.05

const initialPages = [{
	id: 0,
	text: 'World',
	selected: true
}, {
	id: 1,
	text: 'Production',
	selected: false
}, {
	id: 2,
	text: 'Tech',
	selected: false
}]

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const getTemperature = (y, elevation) => {
	let newWorldHeight = WORLD_HEIGHT/2.0
	let OldValue = Math.abs(y - newWorldHeight)
	let OldMax = WORLD_HEIGHT/2
	let OldMin = 0
	let NewMax = 1
	let NewMin = -1
	return -((((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin) - Math.max(elevation/2, 0)
}

const getEntities = (terrain, x, y) => {
	let elevation = simplexElevation.noise2D(x/NOISE_DIVISOR, y/NOISE_DIVISOR)
	let temperature = getTemperature(y, elevation)
	let rainfall = simplexRainfall.noise2D(x/NOISE_DIVISOR, y/NOISE_DIVISOR)
	let entities = []
	let hasSettlement = Math.random() < SETTLEMENT_CHANCE && terrain !== 'OCEAN' 
	let hasForest = Math.random() < FOREST_CHANCE && terrain !== 'OCEAN' && rainfall >= TREE_RAINFALL && temperature >= TREELINE_TEMPERATURE
	let hasMountain = terrain !== 'OCEAN' && elevation >= MOUNTAIN_ELEVATION
	let hasHill = terrain !== 'OCEAN' && !hasMountain && elevation >= HILL_ELEVATION
	let hasRiver = Math.random() < RIVER_CHANCE && terrain !== 'OCEAN' && rainfall >= RIVER_RAINFALL
	entities.push({
		entityType: "HILL",
		id: hasHill? uuidv4() : "",
	})
	entities.push({
		entityType: "MOUNTAIN",
		id: hasMountain? uuidv4() : "",
	})
	entities.push({
		entityType: "FOREST",
		id: hasForest? uuidv4() : "",
	})
	entities.push({
		entityType: "RIVER",
		id: hasRiver? uuidv4() : "",
	})
	entities.push({
		entityType: "SETTLEMENT",
		id: hasSettlement? uuidv4() : "",
	})
	return entities
}

const HSLtoRGB = (h, s, l) => {
	let r, g, b;

	const rd = (a) => {
		return Math.floor(Math.max(Math.min(a*256, 255), 0)); 
	};

	const hueToRGB = (m, n, o) => {
		if (o < 0) o += 1;
		if (o > 1) o -= 1;
		if (o < 1/6) return m + (n - m) * 6 * o;
		if (o < 1/2) return n;
		if (o < 2/3) return m + (n - m) * (2/3 - o) * 6;
		return m;
	}

	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;

	r = hueToRGB(p, q, h + 1/3);
	g = hueToRGB(p, q, h);
	b = hueToRGB(p, q, h - 1/3);

	return [rd(r), rd(g), rd(b)]
}

const RGBtoHex = (r, g, b) => {
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

const randomPastel = () => {
	const hBase = Math.random();
	const newL = Math.floor(Math.random() * 16) + 75;

	const [ r, g, b ] = HSLtoRGB(hBase, 1, newL*.01);
	return RGBtoHex(r, g, b);
}

const choose = (choices) => {
	return choices[Math.floor(Math.random() * choices.length)]
}

const randomTerrain = (x, y) => {
	let elevation = simplexElevation.noise2D(x/NOISE_DIVISOR, y/NOISE_DIVISOR)
	let temperature = getTemperature(y, elevation)
	let rainfall = simplexRainfall.noise2D(x/NOISE_DIVISOR, y/NOISE_DIVISOR)
	if (elevation < SEA_LEVEL) {
		return OCEAN
	} else {
		if (temperature <= SNOW_TEMPERATURE) {
			return SNOW
		} else {
			if (rainfall >= DESERT_TEMPERATURE) {
				return GRASS
			} else {
				return DESERT
			}
		}
	}
}

const newTile = (x, y) => {
	let terrain = randomTerrain(x, y)
	return {
		terrain: terrain,
		originX: x,
		originY: y,
		entities: getEntities(terrain, x, y)
	}
}

const populateWorld = (width, height) => {
	let values = []
	for (let y=0; y<height; y++) {
		values.push([])
		for (let x=0; x<width; x++) {
			values[y].push(newTile(x, y))
		}
	}
	return values
}

const initialWorldInfo = {
	width: WORLD_WIDTH,
	height: WORLD_HEIGHT,
	currX: 0,
	currY: 0,
	values: populateWorld(WORLD_WIDTH, WORLD_HEIGHT),
	images: {
		HILL: HILL_ICON,
		MOUNTAIN: MOUNTAIN_ICON,
		FOREST: FOREST_ICON,
		RIVER: RIVER_ICON,
		SETTLEMENT: SETTLEMENT_ICON,
	},
	terrains: {
		GRASS: '#378B2E',
		OCEAN: '#0B458F',
		DESERT: '#AA9F38',
		SNOW: '#E1E1E1',
	}
}

const initialProductionInfo = {
	value: 10
}

const initialTechInfo = {
	technologies: [{
		id: 0,
		name: 'Language',
		requires: []
	}, {
		id: 1,
		name: 'Pottery',
		requires: [0]
	}, {
		id: 2,
		name: 'Animal Husbandry',
		requires: [0]
	}, {
		id: 3,
		name: 'Mining',
		requires: [0]
	}, {
		id: 4,
		name: 'Sailing',
		requires: [0]
	}, {
		id: 5,
		name: 'Astrology',
		requires: [0]
	}, {
		id: 6,
		name: 'Irrigation',
		requires: [1]
	}, {
		id: 7,
		name: 'Writing',
		requires: [1]
	}, {
		id: 8,
		name: 'Archery',
		requires: [2]
	}, {
		id: 9,
		name: 'Masonry',
		requires: [3]
	}, {
		id: 10,
		name: 'Bronze Working',
		requires: [3]
	}, {
		id: 11,
		name: 'Wheel',
		requires: [3]
	}, {
		id: 12,
		name: 'Celestial Navigation',
		requires: [4,5]
	}, {
		id: 13,
		name: 'Currency',
		requires: [7]
	}, {
		id: 14,
		name: 'Horseback Riding',
		requires: [8]
	}, {
		id: 15,
		name: 'Iron Working',
		requires: [10]
	}, {
		id: 16,
		name: 'Shipbuilding',
		requires: [4]
	}, {
		id: 17,
		name: 'Mathematics',
		requires: [13]
	}, {
		id: 18,
		name: 'Construction',
		requires: [9,14]
	}, {
		id: 19,
		name: 'Engineering',
		requires: [11]
	}, {
		id: 20,
		name: 'Buttress',
		requires: [16,17]
	}, {
		id: 21,
		name: 'Military Tactics',
		requires: [17]
	}, {
		id: 22,
		name: 'Apprenticeship',
		requires: [13,14]
	}, {
		id: 23,
		name: 'Machinery',
		requires: [15,18,19]
	}, {
		id: 24,
		name: 'Education',
		requires: [13,22]
	}, {
		id: 25,
		name: 'Stirrups',
		requires: [14]
	}, {
		id: 26,
		name: 'Military Engineering',
		requires: [18]
	}, {
		id: 27,
		name: 'Castles',
		requires: [15,18]
	}, {
		id: 28,
		name: 'Cartography',
		requires: [20]
	}, {
		id: 29,
		name: 'Mass Production',
		requires: [20,21]
	}, {
		id: 30,
		name: 'Banking',
		requires: [22,24,25]
	}, {
		id: 31,
		name: 'Gunpowder',
		requires: [24,26]
	}, {
		id: 32,
		name: 'Printing',
		requires: [23]
	}]
}

function pages(state=initialPages, action) {
	switch (action.type) {
	case CHANGE_PAGE:
		return state.map(page => {
			if (page.selected) {
				page.selected = false
			}
			if (page.id === action.id) {
				page.selected = true
			}
			return page
		})
	default:
		return state
	}
}

function productionInfo(state=initialProductionInfo, action) {
	switch (action.type) {
	default:
		return state
	}
}

function techInfo(state=initialTechInfo, action) {
	switch (action.type) {
	default:
		return state
	}
}

function worldInfo(state=initialWorldInfo, action) {
	switch (action.type) {
	default:
		return state
	}
}

const idleGame = combineReducers({
	pages,
	productionInfo,
	techInfo,
	worldInfo
})

export default idleGame