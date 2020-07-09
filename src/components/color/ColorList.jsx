import React from "react"
import "./ColorList.css"

class ColorList extends React.Component {

	onClick_colorItem(color, event) {
		this.props.clickColor && this.props.clickColor(color)
	}

	render() {
		let { colors,  } = this.props

		let colorListItems = colors.map(
			(color, idx) => (
				<div 
					key={idx} 
					className="colorListItem" 
					style={{backgroundColor: color}} 
					onClick={this.onClick_colorItem.bind(this, color)}>
				</div>
			)
		)

		return (
			<div className="colorList">
				{ colorListItems }
			</div>
		)
	}
}

export default ColorList