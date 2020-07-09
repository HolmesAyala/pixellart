import React from "react"

import "./Grid.css"

import Row from "./Row"

let s = (s) => {
	let SCALE = 1

	s.setup = () => {
		let canvas = s.createCanvas(500, 500)
		canvas.parent("canvas")
		s.background(240)
	}
	
	s.draw = () => {
		s.background(240)
		fillCursor()
		s.translate(250, 250)
		fillGrid()
	}

	function fillCursor() {
		s.stroke(0)
		s.fill(s.color(255, 0, 0))
		s.ellipse(s.mouseX, s.mouseY, 10, 10)
	}

	function fillGrid() {
		s.push()
		s.scale(SCALE)
		// s.translate(s.mouseX + (s.mouseX / s.width) * s.width, s.mouseY + (s.mouseY / s.height) * s.height)


		s.stroke(200)
		let step = 20

		for(let r = step; r < s.width; r+=step) {
			s.line(0, r, s.width, r)
		}

		for(let c = step; c < s.height; c+=step) {
			s.line(c, 0, c, s.height)
		}

		s.pop()
	}

	s.mousePressed = () => {
		console.log("Pressed: ", s.mouseX, s.mouseY);
	}

	s.mouseWheel = (event) => {
		if(event.delta < 0) {
			SCALE += 0.1

			if (SCALE > 4)
				SCALE = 4
		}
		else {
			SCALE -= 0.1

			if(SCALE < 0.2)
				SCALE = 0.2
		}
	}
}

let p5 = new window.p5(s)

class Grid extends React.Component {

	constructor(props) {
		super(props)
		this.onClick_cell = this.onClick_cell.bind(this)
		this.onMouseEnter_cell = this.onMouseEnter_cell.bind(this)
		this.onMouseLeave_cell = this.onMouseLeave_cell.bind(this)
		this.onMouseDown = this.onMouseDown.bind(this)
		this.onMouseUp = this.onMouseUp.bind(this)
		this.onMouseLeave = this.onMouseLeave.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)

		this.mouseDown = false
		this.cursor = null

		this.state = {}
	}

	componentDidMount() {
		this.cursor = document.querySelector(".grid .cursor")
	}

	onMouseMove(event) {
		this.cursor.style.top = `${event.y}px`
		this.cursor.style.left = `${event.x}px`
	}

	onClick_cell(data) {
		this.props.clickCell && this.props.clickCell(data)
		this.props.applyColorToCell && this.props.applyColorToCell(data)
	}

	onMouseEnter_cell(data) {
		this.props.mouseEnterCell && this.props.mouseEnterCell(data)

		if(this.mouseDown) {
			this.props.applyColorToCell && this.props.applyColorToCell(data)
		}
	}

	onMouseLeave_cell(data) {
		this.props.mouseLeaveCell && this.props.mouseLeaveCell(data)

		if(this.mouseDown) {
			this.props.applyColorToCell && this.props.applyColorToCell(data)
		}
	}

	onMouseDown(event) {
		this.mouseDown = true
	}

	onMouseUp(event) {
		this.mouseDown = false
	}

	onMouseEnter(event) {
		document.addEventListener("mousemove", this.onMouseMove)
	}

	onMouseLeave(event) {
		this.mouseDown = false
		document.removeEventListener("mousemove", this.onMouseMove)
	}

	render() {
		let { grid } = this.props

		let rows = grid.map(
			row => <Row 
							key={row.id} 
							id={row.id} 
							cells={row.cells} 
							clickCell={this.onClick_cell} 
							mouseEnterCell={this.onMouseEnter_cell}
							mouseLeaveCell={this.onMouseLeave_cell} />
		)

		return (
			<React.Fragment>
				<div id="canvas" style={{ cursor: "none" }}></div>

				<div 
					className="grid" 
					onMouseDown={this.onMouseDown} 
					onMouseUp={this.onMouseUp} 
					onMouseLeave={this.onMouseLeave}
					onMouseEnter={this.onMouseEnter.bind(this)}
					onDragStart={() => { return false }}
					onDrop={() => { return false }}
				>
					<div className="cursor"></div>
					{rows}
				</div>
			</React.Fragment>
		)
	}

}

export default Grid