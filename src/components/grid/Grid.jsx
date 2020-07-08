import React from "react"

import "./Grid.css"

import Row from "./Row"

class Grid extends React.Component {

	constructor(props) {
		super(props)
		this.onClick_cell = this.onClick_cell.bind(this)
		this.onMouseEnter_cell = this.onMouseEnter_cell.bind(this)
		this.onMouseLeave_cell = this.onMouseLeave_cell.bind(this)
		this.onMouseDown = this.onMouseDown.bind(this)
		this.onMouseUp = this.onMouseUp.bind(this)
		this.onMouseLeave = this.onMouseLeave.bind(this)

		this.mouseDown = false

		this.state = {}
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

	onMouseLeave(event) {
		this.mouseDown = false
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
			<div 
				className="grid" 
				onMouseDown={this.onMouseDown} 
				onMouseUp={this.onMouseUp} 
				onMouseLeave={this.onMouseLeave}
				onDragStart={() => { return false }}
				onDrop={() => { return false }}
			>
				{rows}
			</div>
		)
	}

}

export default Grid