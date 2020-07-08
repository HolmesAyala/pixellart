import React from "react"

import Grid from "../components/grid/Grid"

class Main extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			grid: this.getDefaultGrid()
		}

		this.onClick_cell = this.onClick_cell.bind(this)
		this.onApplyColorToCell = this.onApplyColorToCell.bind(this)
	}

	componentDidMount() {
		// setTimeout(() => {
		// 	this.endTimeout()
		// }, 3000)
	}

	endTimeout() {
		try {
			console.log("end timeout");

			let grid = this.state.grid

			grid[0].cells[0].color = "#ff0000"

			this.setState({
				grid: grid
			})
		} catch (error) {
			console.log(error);
		}
	}

	getDefaultGrid() {
		let grid = []
		let rows = 50
		let columns = rows

		for(let r = 0; r < rows; r++) {
			let row = {
				id: String(r),
				cells: []
			}
			
			for(let c = 0; c < columns; c++) {
				row.cells.push({
					id: `${r}:${c}`,
					color: "#eeeeee"
				})
			}

			grid.push(row)
		}

		return grid
	}

	onClick_cell(data) {
		this.applyColorToCell(data, "#ff0000")
	}

	onApplyColorToCell(data) {
		// console.log("Apply color: ", data);
		this.applyColorToCell(data, "#ff0000")
	}

	applyColorToCell(data, color = "#ffffff") {
		let { grid } = this.state

		for(let row of grid) {
			if(row.id === data.rowId) {
				for(let cell of row.cells) {
					if(cell.id === data.cellId) {
						cell.color = color
					}
				}
			}
		}

		this.setState({
			grid
		})
	}

	render() {
		let { grid } = this.state
		
		return <Grid grid={grid} clickCell={this.onClick_cell} applyColorToCell={this.onApplyColorToCell} />
	}
}

export default Main