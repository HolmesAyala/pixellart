import React from "react"

import Grid from "../components/grid/Grid"
import ColorList from "../components/color/ColorList"
import ColorPickerButton from "../components/color/ColorPickerButton"

class Main extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			grid: this.getDefaultGrid(),
			colorsSelected: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#eeeeee"],
			currentColor: "#ff0000"
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
				grid: grid,
				currentColor: "#ff0000"
			})
		} catch (error) {
			console.log(error);
		}
	}

	getDefaultGrid() {
		let grid = []
		let rows = 20
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
		this.applyColorToCell(data, this.state.currentColor)
	}

	onApplyColorToCell(data) {
		// console.log("Apply color: ", data);
		this.applyColorToCell(data, this.state.currentColor)
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

	onClickColor_colorList = (color) => {
		this.setState({
			currentColor: color
		})
	}

	onClose_colorPicker = (color) => {
		let { colorsSelected } = this.state

		if (!colorsSelected.some(c => c === color))
			colorsSelected.push(color)
		
		this.setState({
			colorsSelected,
			currentColor: color
		})
	}

	render() {
		let { grid, colorsSelected } = this.state

		let colorPickerComponent = (
			<ColorPickerButton onClose={ this.onClose_colorPicker } />
		)

		let colorListComponent = (
			<ColorList style={{ maxWidth: "150px" }} colors={ colorsSelected } clickColor={this.onClickColor_colorList} />
		)

		let gridComponent = <Grid grid={grid} clickCell={this.onClick_cell} applyColorToCell={this.onApplyColorToCell} />

		return (
			<React.Fragment>
				<div >
					{ colorListComponent }
					{ colorPickerComponent }
				</div>

				<div style={{ display: "flex", justifyContent: "center" }}>
					{ gridComponent }
				</div>
			</React.Fragment>
		)
	}
}

export default Main