import React from "react"

class Cell extends React.Component {

	constructor(props) {
		super(props)
		this.onClick = this.onClick.bind(this)
		this.onMouseEnter = this.onMouseEnter.bind(this)
		this.onMouseLeave = this.onMouseLeave.bind(this)
	}

	onClick(event) {
		this.props.click && this.props.click(this.props.id)
	}

	onMouseEnter(event) {
		this.props.mouseEnter && this.props.mouseEnter(this.props.id)
	}

	onMouseLeave(event) {
		this.props.mouseLeave && this.props.mouseLeave(this.props.id)
	}

	render() {
		let style = {
			backgroundColor: this.props.color
		}

		return (
			<div 
				className="cell" 
				style={style} 
				onClick={this.onClick} 
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}>
			</div>
		)
	}
}

export default Cell
