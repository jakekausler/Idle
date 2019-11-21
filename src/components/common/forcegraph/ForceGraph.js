import React from 'react'
import ReactDOM from 'react-dom'
import ForceGraph2D from 'react-force-graph-2d'

const arrayJoin = (arrayOfArrays) => {
	let newArr = []
	for (let i=0; i<arrayOfArrays.length; i++) {
		for (let j=0; j<arrayOfArrays[i].length; j++) {
			newArr.push(arrayOfArrays[i][j])
		}
	}
	return newArr
}

export default function ForceGraph(props) {
	let nodeData = props.Graph.map(tech => {
		return {
			name: tech.name,
			id: tech.id
		}
	})
	let linkData = arrayJoin(props.Graph.map((tech, index) => {
		return tech.requires.map((t, i) => {
			return {
				source: tech.id,
				target: t,
				id: index + "" + i
			}
		})
	}))
	// let links = linkData.map((link) => {
	// 	return (
	// 		<ForceGraphLink
	// 			link={link}
	// 		/>
	// 	)
	// })
	// let nodes = nodeData.map((node) => {
	// 	return (
	// 		<ForceGraphNode
	// 			node={node}
	// 		/>
	// 	)
	// })
	return (
		<div className="GraphContainer">
			<ForceGraph2D
				graphData={{nodes: nodeData, links: linkData}}
			>
			</ForceGraph2D>
		</div>
	)
}

// import * as d3 from "d3Force"
// import * as d3Force from "d3-force"

// let FORCE = (function(nsp) {
// 	const width = 1080
// 	const height = 500
// 	const color = d3Force.scaleOrdinal(d3Force.schemeCategory10)
// 	const initForce = (node, links) => {
// 		nsp.force = d3Force.forceSimulation(node)
// 			.force("charge", d3Force.forceManyBody().strength(-200))
// 			.force("link", d3Force.forceLinks(links).distance(70))
// 			.force("center", d3Force.forceCenter().x(nsp.width/2).y(nsp.height/2))
// 			.force("collide", d3Force.forceCollide([5]).iterations([5]))
// 	}

// 	const enterNode = (selection) => {
// 		var circle = selection.select('circle')
// 			.attr("r", 25)
// 			.style("fill", 'tomato' ) 
// 			.style("stroke", "bisque")
// 			.style("stroke-width", "3px")

// 		selection.select('text')
// 			.style("fill", "honeydew")
// 			.style("font-weight", "600")
// 			.style("text-transform", "uppercase")
// 			.style("text-anchor", "middle")
// 			.style("alignment-baseline", "middle")
// 			.style("font-size", "10px")
// 			.style("font-family", "cursive")
// 	}

// 	const updateNode = (selection) => {
// 		selection
// 			.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
// 			.attr("cx", function(d) { return d.x = Math.max(30, Math.min(width - 30, d.x)); })
// 			.attr("cy", function(d) { return d.y = Math.max(30, Math.min(height - 30, d.y)); })
// 	}

// 	const enterLink = (selection) => {
// 		selection
// 			.attr("stroke-width", 3)
// 			.attr("stroke","bisque")
// 	}

// 	const updateLink = (selection) => {
// 		selection
// 			.attr("x1", (d) => d.source.x)
// 			.attr("y1", (d) => d.source.y)
// 			.attr("x2", (d) => d.target.x)
// 			.attr("y2", (d) => d.target.y)
// 	}

// 	const updateGraph = (selection) => {
// 		selection.selectAll('.node')
// 			.call(updateNode)
// 		selection.selectAll('.link')
// 			.call(updateLink)
// 	}

// 	const dragStarted = (d) => {
// 		if (!d3.event.active) nsp.force.alphaTarget(0.3).restart()	
// 		d.fx = d.x
// 		d.fy = d.y
// 	}

// 	const dragging = (d) => {
// 		d.fx = d3.event.x
// 		d.fy = d3.event.y
// 	}

// 	const dragEnded = (d) => {
// 		if (!d3.event.active) nsp.force.alphaTarget(0)
// 		d.fx = null
// 		d.fy = null
// 	}

// 	const drag = () => {
// 		d3Force.selectAll('g.node')
// 			.call(d3.drag()
// 				.on("start", dragStarted)
// 				.on("drag", dragging)
// 				.on("end", dragEnded)
// 			)
// 	}

// 	const tick = (that) => {
// 		that.d3ForceGraph = d3Force.select(ReactDOM.findDOMNode(that));
// 			nsp.force.on('tick', () => {
// 				that.d3ForceGraph.call(updateGraph)
// 			})
// 	}

// 	nsp.width = width;
// 	nsp.height = height;
// 	nsp.enterNode = enterNode;
// 	nsp.updateNode = updateNode;
// 	nsp.enterLink = enterLink;
// 	nsp.updateLink = updateLink;
// 	nsp.updateGraph = updateGraph;
// 	nsp.initForce = initForce;
// 	nsp.dragStarted = dragStarted;
// 	nsp.dragging = dragging;
// 	nsp.dragEnded = dragEnded;
// 	nsp.drag = drag;
// 	nsp.tick = tick;

// 	return nsp
  
// })(FORCE || {})

// class Link extends React.Component {

// 	componentDidMount() {
// 		this.d3ForceLink = d3Force.select(ReactDOM.findDOMNode(this))
// 			.datum(this.props.data)
// 			.call(FORCE.enterLink)
// 	}

// 	componentDidUpdate() {
// 		this.d3ForceLink.datum(this.props.data)
// 			.call(FORCE.updateLink)
// 	}

// 	render() {
// 		return (
// 			<line className="link" />
// 		)
// 	}
// }

// class Node extends React.Component {

// 	componentDidMount() {
//       this.d3ForceNode = d3Force.select(ReactDOM.findDOMNode(this))
//         .datum(this.props.data)
//         .call(FORCE.enterNode)
//     }

//     componentDidUpdate() {
//       this.d3ForceNode.datum(this.props.data)
//         .call(FORCE.updateNode)
//     }

//     render() {
//       return (
//         <g className='node'>
//           <circle onClick={this.props.addLink}/>
//           <text>{this.props.data.name}</text>
//         </g>
//       );
//     }
// }

// const arrayJoin = (arrayOfArrays) => {
// 	let newArr = []
// 	for (let i=0; i<arrayOfArrays.length; i++) {
// 		for (let j=0; j<arrayOfArrays[i].length; j++) {
// 			newArr.push(arrayOfArrays[i][j])
// 		}
// 	}
// 	return newArr
// }

// export default class ForceGraph extends React.Component {

// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			addLinkArray: [],
// 			name: "",
// 			nodes: props.technologies.map(tech => {
// 				return {
// 					name: tech.name,
// 					id: tech.id
// 				}
// 			}),
// 			links: arrayJoin(props.technologies.map((tech, index) => {
// 				return tech.requires.map((t, i) => {
// 					return {
// 						source: tech.id,
// 						target: t,
// 						id: index + "" + i
// 					}
// 				})
// 			}))
// 		}
// 		this.handleAddNode = this.handleAddNode.bind(this)
// 		this.addNode = this.addNode.bind(this)
// 	}

// 	componentDidMount() {
// 		const data = this.getState()
// 		FORCE.initForce(data.nodes, data.links)
// 		FORCE.tick(this)
// 		FORCE.drag()
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		if (prevState.nodes !== this.getState().nodes || prevState.links !== this.getState().links) {
// 			const data = this.state
// 			FORCE.initForce(data.nodes, data.links)
// 			FORCE.tick(this)
// 			FORCE.drag()
// 		}
// 	}

// 	handleAddNode(e) {
// 		this.setState({ [e.target.name]: e.target.value })
// 	}

// 	addNode(e) {
// 		e.preventDefault()
// 		this.setState(prevState => ({
// 			nodes: [...prevState.nodes, {
// 				name: this.state.name,
// 				id: prevState.nodes.length + 1
// 			}],
// 			name: ''
// 		}))
// 	}

// 	render() {
// 		var links = this.state.links.map((link) => {
// 			return (
// 				<Link
// 					key={link.id}
// 					data={link}
// 				/>
// 			)
// 		})
// 		var nodes = this.state.nodes.map((node) => {
// 			return (
// 				<Node
// 					data={node}
// 					name={node.name}
// 					key={node.id}
// 				/>
// 			)
// 		})
// 		return (
// 			<svg className="graph" width={FORCE.width} height={FORCE.height}>
// 				<g>
// 					{links}
// 				</g>
// 				<g>
// 					{nodes}
// 				</g>
// 			</svg>
// 		)
// 	}
// }