import React from "react"
import { ChromePicker } from "react-color"
import { Palette } from "@material-ui/icons"
import { Popover, Fab } from "@material-ui/core"

class ColorPickerButton extends React.Component {

	constructor(props) {
		super(props)

		this.anchorEl = React.createRef()

		this.state = {
			viewPopover: false,
			currentColor: "#ff0000"
		}
	}

	onClick_fab = (event) => {
		this.setState({
			viewPopover: true
		})
	}

	onChange_colorPicker = (color) => {
		this.props.onChange && this.props.onChange(color.hex)
		
		this.setState({
			currentColor: color.hex
		})
	}

	onChangeComplete_colorPicker = (color, event) => {
		this.props.changeCompleted && this.props.changeCompleted(color.hex)

		this.setState({
			currentColor: color.hex
		})
	}

	onClose_popover = (event) => {
		this.props.onClose && this.props.onClose(this.state.currentColor)

		this.setState({
			viewPopover: false
		})
	}

	render() {
		let openButton = (
			<Fab color="primary" size="small" ref={this.anchorEl} onClick={this.onClick_fab}>
				<Palette  />
			</Fab>
		)

		let colorPickerComponent = (
			<ChromePicker
				disableAlpha={true} 
				color={this.state.currentColor} 
				onChange={this.onChange_colorPicker}
				onChangeComplete={this.onChangeComplete_colorPicker} />
		)

		let popoverComponent = (
			<Popover 
				anchorEl={this.anchorEl.current}
				open={this.state.viewPopover} 
				onClose={this.onClose_popover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				{ colorPickerComponent }
			</Popover>
		)

		return (
			<div>
				{ openButton }
				{ popoverComponent }
			</div>
		)
	}

}

export default ColorPickerButton