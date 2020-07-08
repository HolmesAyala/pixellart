import React from "react"
import Cell from "./Cell"

class Row extends React.Component {

	constructor(props) {
		super(props)
		this.onClick_cell = this.onClick_cell.bind(this)
		this.onMouseEnter_cell = this.onMouseEnter_cell.bind(this)
		this.onMouseLeave_cell = this.onMouseLeave_cell.bind(this)
	}

	onClick_cell(cellId) {
		this.props.clickCell && this.props.clickCell({
			rowId: this.props.id,
			cellId: cellId
		})
	}

	onMouseEnter_cell(cellId) {
		this.props.mouseEnterCell && this.props.mouseEnterCell({
			rowId: this.props.id,
			cellId
		})
	}

	onMouseLeave_cell(cellId) {
		this.props.mouseLeaveCell && this.props.mouseLeaveCell({
			rowId: this.props.id,
			cellId
		})
	}

	render() {
		let { cells } = this.props

		let cellComponents = cells.map(
			cell => (
				<Cell 
					key={cell.id} 
					id={cell.id} 
					color={cell.color} 
					click={this.onClick_cell} 
					mouseEnter={this.onMouseEnter_cell}
					mouseLeave={this.onMouseLeave_cell}/>
			)
		)

		return <div className="row">{cellComponents}</div>
	}
}

export default Row