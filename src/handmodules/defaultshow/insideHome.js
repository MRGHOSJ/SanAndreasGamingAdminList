import React,{Component} from 'react'
import { Grid, Cell} from 'react-md'

class InsideHome extends Component{

    render(){
        return(
            <div className='insideHomeAndloginCss'>
                <Grid>
                    <Cell size={5}>{this.props.AdminRank} {this.props.AdminName}</Cell>
                    <Cell size={7}>Admin level: {this.props.Adminlvl}</Cell>
                    <Cell size={7}>Admin Current Points: {this.props.AdminPoints}</Cell>
                    <Cell size={12}>details: {this.props.details}</Cell>
                </Grid>
            </div>
        )
    }
}

export default InsideHome