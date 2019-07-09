import React,{Component} from 'react'
import { Grid, Cell, FontIcon, DialogContainer , Button , TextField } from 'react-md'

class InsideLogin extends Component{
    constructor(){
        super()
        this.state={
            visibleForAdminRankName:false,
            visibleForAdminlvl:false,
            visibleForAdminpoints:false,
            AdminNameVal:"",
            AdminRankVal:"",
            AdminlvlVal:"",
            AdminpointsVal:"",
            AdminDetails:"",
        }
    }

    handleAdminRanknameEdit = () =>{
        this.setState({
            visibleForAdminRankName:true,
        })
    }

    handleAdminlvl = () =>{
        this.setState({
            visibleForAdminlvl:true,
        })
    }

    handleAdminPoints = () =>{
        this.setState({
            visibleForAdminpoints:true,
        })
    } 

    hide = () =>{
        this.setState({
            visibleForAdminRankName:false,
            visibleForAdminlvl:false,
            visibleForAdminpoints:false,
            AdminNameVal:"",
            AdminRankVal:"",
            AdminlvlVal:"",
            AdminpointsVal:"",
            AdminDetails:"",
        })
    }

    handleAdminRanknameConfirm = () =>{
        this.props.handleAdminRanknameEdit(this.props.id,this.state.AdminNameVal,this.state.AdminRankVal)
    }
    handleAdminlvlConfirm = () =>{
        this.props.handleAdminlvlEdit(this.props.id,this.state.AdminlvlVal)
    }
    handleAdminPointsConfirm = () =>{
        this.props.handleAdminPointsEdit(this.props.id,this.state.AdminpointsVal,this.state.AdminDetails)
    }

    handleDelete = (id) =>{
        this.props.deleteAdmin(id)
    }

    render(){
        const actionsForAdminRankName = [];
        actionsForAdminRankName.push({ secondary: true, children: 'Cancel', onClick: this.hide });
        actionsForAdminRankName.push(<Button flat primary onClick={this.handleAdminRanknameConfirm}>Confirm</Button>);

        const actionAdminLevel = [];
        actionAdminLevel.push({ secondary: true, children: 'Cancel', onClick: this.hide });
        actionAdminLevel.push(<Button flat primary onClick={this.handleAdminlvlConfirm}>Confirm</Button>);

        const actionAdminPoints = [];
        actionAdminPoints.push({ secondary: true, children: 'Cancel', onClick: this.hide });
        actionAdminPoints.push(<Button flat primary onClick={this.handleAdminPointsConfirm}>Confirm</Button>);
        return(
            <div className='insideHomeAndloginCss'>
                <Grid>
                    <Cell size={6}>{this.props.AdminRank} {this.props.AdminName}<FontIcon className="editFontICon" onClick={()=>{this.handleAdminRanknameEdit()}}>edit</FontIcon></Cell>
                        <div>
                            <DialogContainer
                            id="simple-action-dialog"
                            visible={this.state.visibleForAdminRankName}
                            actions={actionsForAdminRankName}
                            title="Change something about AdminRank or AdminName?"
                            >
                            <TextField
                                id="simple-action-dialog-field"
                                label="Change AdminName"
                                placeholder="Enter AdminName..."
                                defaultValue={this.props.AdminName}
                                onChange={(val)=>{this.setState({AdminNameVal:val})}}
                            />
                            <TextField
                                id="simple-action-dialog-field"
                                value={this.state.AdminRank}
                                label="Change AdminRank"
                                placeholder="Enter AdminRank..."
                                defaultValue={this.props.AdminRank}
                                onChange={(val)=>{this.setState({AdminRankVal:val})}}
                            />
                            </DialogContainer>
                        </div>
                    <Cell size={5}>Admin level: {this.props.Adminlvl}<FontIcon className="editFontICon" onClick={()=>{this.handleAdminlvl()}}>edit</FontIcon></Cell>
                    <Cell size={1}><FontIcon className="deleteButton" onClick={()=>{this.handleDelete(this.props.id)}}>delete</FontIcon></Cell>
                        <div>
                            <DialogContainer
                            id="simple-action-dialog"
                            visible={this.state.visibleForAdminlvl}
                            actions={actionAdminLevel}
                            title="Change something about Adminlvl?"
                            >
                            <TextField
                                type='number'
                                id="simple-action-dialog-field"
                                label="Change Adminlvl"
                                placeholder="Enter Adminlvl..."
                                defaultValue={this.props.Adminlvl}
                                onChange={(val)=>{this.setState({AdminlvlVal:val})}}
                            />
                            </DialogContainer>
                        </div>
                    <Cell size={12}>Admin Current Points: {this.props.AdminPoints}<FontIcon className="editFontICon" onClick={()=>{this.handleAdminPoints()}}>edit</FontIcon></Cell>
                    <Cell size={12}>details: {this.props.details}</Cell>
                        <div>
                            <DialogContainer
                            id="simple-action-dialog"
                            visible={this.state.visibleForAdminpoints}
                            actions={actionAdminPoints}
                            title="Change something about AdminPoints?"
                            >
                            <TextField
                                type='number'
                                id="simple-action-dialog-field"
                                label="Some content to change"
                                placeholder="Content..."
                                defaultValue={this.props.AdminPoints}
                                onChange={(val)=>{this.setState({AdminpointsVal:val})}}
                            />
                            <TextField
                                id="simple-action-dialog-field"
                                label="Some content to change"
                                placeholder="Content..."
                                defaultValue={this.props.details}
                                onChange={(val)=>{this.setState({AdminDetails:val})}}
                            />
                            </DialogContainer>
                        </div>
                </Grid>
            </div>
        )
    }
}

export default InsideLogin