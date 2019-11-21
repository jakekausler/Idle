import { combineReducers } from 'redux'

import {
	CHANGE_PAGE
} from '../actions/actions'

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
	text: 'Score',
	selected: false
}]

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const getEntities = () => {
	let entities = []
	let hasSettlement = Math.random() < 0.02
	let hasForest = Math.random() < 0.3
	let hasHill = Math.random() < 0.1
	let hasMountain = Math.random() < 0.02 && !hasHill
	let hasRiver = Math.random() < 0.05
	if (hasHill) {
		entities.push({
			entityType: "HILL",
			id: uuidv4(),
			imageURL: 'hillIcon.png'
		})
	}
	if (hasMountain) {
		entities.push({
			entityType: "MOUNTAIN",
			id: uuidv4(),
			imageURL: 'mountainIcon.png'
		})
	}
	if (hasForest) {
		entities.push({
			entityType: "FOREST",
			id: uuidv4(),
			imageURL: 'forestIcon.png'
		})
	}
	if (hasRiver) {
		entities.push({
			entityType: "RIVER",
			id: uuidv4(),
			imageURL: 'riverIcon.png'
		})
	}
	if (hasSettlement) {
		entities.push({
			entityType: "SETTLEMENT",
			id: uuidv4(),
			imageURL: 'settlementIcon.png'
		})
	}
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

const newTile = (x, y) => {
	return {
		color: randomPastel(),
		originX: x,
		originY: y,
		entities: getEntities()
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
	width: 256,
	height: 128,
	currX: 0,
	currY: 0,
	values: populateWorld(256, 128)
}

const initialProductionInfo = {
	value: 10
}

const initialScoreInfo = {
	value: 20
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

function scoreInfo(state=initialScoreInfo, action) {
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
	scoreInfo,
	worldInfo
})

export default idleGame