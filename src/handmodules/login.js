import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {
  Avatar,
  FontIcon,
  AccessibleFakeButton,
  IconSeparator,
  DropdownMenu,
  TextField, 
  Button,
  Grid, 
  Cell,
} from 'react-md';
import InsideLogin from './defaultshow/insideLogin'
import {fire,firestore} from './config/config'

class Login extends Component{

    constructor(){
        super()

        this.state={
            EmailVal:"",
            PasswordVal:"",
            loggedin:false,
            UserEmail:"",
            modalDivStyle:'none',
            AdminName:'',
            AdminRank:'',
            Adminlvl:'',
            Admins:[],
            checkLoggedin:'none',
        }
        this.fireStore = firestore.collection('Admins')

    }

    componentWillMount(){
        fire.auth().onAuthStateChanged((user) =>{
            if (user) {
                this.setState({
                    loggedin:true,
                    UserEmail: fire.auth().currentUser.email
                })
            } else {
                this.setState({
                    loggedin:false,
                    checkLoggedin:'',
                })
            }
          });
          const previousAdmins = this.state.Admins

          this.fireStore.onSnapshot((snapshot)=>{
              snapshot.docChanges().forEach((change)=>{
                  if(change.type === 'added'){
                    previousAdmins.push({
                          id: change.doc.id,
                          AdminName: change.doc.data().AdminName,
                          AdminRank: change.doc.data().AdminRank,
                          AdminLvl: change.doc.data().AdminLvl,
                          AdminPoints: change.doc.data().AdminPoints,
                          AdminDetails: change.doc.data().AdminDetails,
                        })
  
                        this.setState({
                            Admins: previousAdmins
                        })
                      
                  }else if(change.type === 'removed'){
                      for(var i=0; i < previousAdmins.length; i++){
                          if(previousAdmins[i].id === change.doc.id){
                            previousAdmins.splice(i, 1);
                          }
                        }
                  
                        this.setState({
                            Admins: previousAdmins
                        })
                  }else if(change.type ==='modified'){
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                  }
              })
          })
    }

    handelLogin = () =>{
        fire.auth().signInWithEmailAndPassword(this.state.EmailVal, this.state.PasswordVal).then(()=>{
            alert('Logged in successfully')
        }).catch((error) => {
            alert(error.message)
          })
    }

    handelAddAdmin = () =>{
        if(this.state.AdminName === '' || this.state.AdminRank === '' || this.state.Adminlvl === ""){
            return alert('You need to fill the inputs!!')
        }
        this.fireStore.add({
            AdminName: this.state.AdminName,
            AdminRank: this.state.AdminRank,
            AdminLvl:  this.state.Adminlvl,
            AdminPoints:5,
            AdminDetails:"No Details were found",
        })
        .then(() =>{
            alert('Admin is added!')
            this.setState({
                modalDivStyle:'none',
                AdminName:'',
                AdminRank:'',
                Adminlvl:'',
            })
        })
        .catch((error) =>{
            alert(error.message)
        });
    }

    deleteAdmin = (id) =>{
        this.fireStore.doc(id).delete().then(() =>{
            alert("Admin successfully deleted!");
        }).catch((error) =>{
            alert(error.message)
        });
    }

    handleAdminRanknameEdit = (id,AdminNameVal,AdminRankVal) =>{
        if(AdminNameVal !== '' && AdminRankVal !== ""){
            this.fireStore.doc(id).update({
                AdminName: AdminNameVal,
                AdminRank: AdminRankVal,
            })
            alert("AdminName and AdminRank updated successfully website will auto reload to update! Website will auto reload after 3 seconds")
        }
        else if(AdminNameVal !== ''){
            this.fireStore.doc(id).update({
                AdminName: AdminNameVal,
            })
            alert("AdminName updated successfully website will auto reload to update! Website will auto reload after 3 seconds")
        }
        else if(AdminRankVal !== ""){
            this.fireStore.doc(id).update({
                AdminRank: AdminRankVal,
            })
            alert("AdminRank updated successfully website will auto reload to update! Website will auto reload after 3 seconds")
        }
        else {
            alert("You didn't change anything!")
        }
    }

    handleAdminlvlEdit = (id,AdminlvlVal) =>{
        if(AdminlvlVal !== ""){
            alert(AdminlvlVal)
            this.fireStore.doc(id).update({
                AdminLvl: AdminlvlVal,
            })
            alert("AdminName and AdminRank updated successfully website will auto reload to update! Website will auto reload after 3 seconds")
        }else{
            alert("You didn't change anything!")
        }
    }

    handleAdminPointsEdit = (id,AdminpointsVal,AdminDetails) =>{
        if(AdminpointsVal !== '' && AdminDetails !== ""){
            this.fireStore.doc(id).update({
                AdminPoints: AdminpointsVal,
                AdminDetails: AdminDetails,
            })
            alert("AdminName and AdminRank updated successfully website will auto reload to update! Website will auto reload after 3 seconds")
        }else{
            alert("You didn't change anything!(If you changed points,you need to change details too)")
        }
    }

    render(){
        const loginStyle = {
            display:this.state.checkLoggedin
        }

        const AccountMenu = ({ simplifiedMenu }) => (
            <div className="accoutmenuDi">
                <Grid>
                    <Cell size={7}>
                        <h1 className="sectionTittle">Admin Control Panel</h1>
                    </Cell>
                    <Cell size={3}>
                        <DropdownMenu
                        id={`${!simplifiedMenu ? 'smart-' : ''}avatar-dropdown-menu`}
                        menuItems={[
                            <div className='md-fake-btn md-pointer--hover md-fake-btn--no-outline md-list-tile md-text logoffCss'>Log Off</div>
                            ]}
                        anchor={{
                            x: DropdownMenu.HorizontalAnchors.CENTER,
                            y: DropdownMenu.VerticalAnchors.OVERLAP,
                        }}
                        position={DropdownMenu.Positions.TOP_RIGHT}
                        animationPosition="below"
                        sameWidth
                        simplifiedMenu={simplifiedMenu}
                        className="AccountMenu"
                        >
                        <AccessibleFakeButton
                            component={IconSeparator}
                            iconBefore
                            label={
                            <IconSeparator label={this.state.UserEmail} className="emialicon">
                                <FontIcon className="emailArrowdown">arrow_drop_down</FontIcon>
                            </IconSeparator>
                            }
                        >
                            <Avatar className="EmailIcon">{this.state.UserEmail.charAt(0).toUpperCase()}</Avatar>
                        </AccessibleFakeButton>
                        </DropdownMenu>
                    </Cell>
                </Grid>
            </div>
          );

          AccountMenu.propTypes = {
            simplifiedMenu: PropTypes.bool,
          };

          const modalDivStyle ={
              display: this.state.modalDivStyle
          }

        if(this.state.loggedin){
            return(
                <div className='accountMenuNavBar'>
                    <AccountMenu/>
                    <center>
                        <Button flat primary swapTheming className="addAdminHome" onClick={()=>{this.setState({modalDivStyle:''})}}>Add Admin</Button>
                    </center>

                    <div id="myModal" className="modal" style={modalDivStyle}>
                        <div className="modal-content">
                            <div className="modal-header">
                            <span className="close" onClick={()=>{this.setState({
                                modalDivStyle:'none',
                                AdminName:'',
                                AdminRank:'',
                                Adminlvl:'',
                            })}}>&times;</span>
                            <h2 className='modalTittle'>Add Admin</h2>
                            </div>
                            <div className="modal-body">
                                <center>
                                    <br/>
                                    <h3>Fill inputs to add an admin to the list</h3>
                                    <TextField
                                        id="floating-center-title"
                                        label="Admin Name"
                                        lineDirection="center"
                                        placeholder="Enter admin name..."
                                        className="md-cell md-cell--bottom addAdminInput"
                                        value={this.state.AdminName}
                                        onChange={(val)=>{this.setState({AdminName:val})}}
                                    />
                                    <TextField
                                        id="floating-center-title"
                                        label="Admin Rank"
                                        lineDirection="center"
                                        placeholder="Enter admin rank..."
                                        className="md-cell md-cell--bottom addAdminInput"
                                        value={this.state.AdminRank}
                                        onChange={(val)=>{this.setState({AdminRank:val})}}
                                    />
                                    <TextField
                                        id="floating-center-title"
                                        label="Admin lvl"
                                        type="number"
                                        lineDirection="center"
                                        placeholder="Enter admin lvl..."
                                        className="md-cell md-cell--bottom addAdminInput"
                                        value={this.state.Adminlvl}
                                        onChange={(val)=>{this.setState({Adminlvl:val})}}
                                    />
                                    <br/>
                                </center>
                            </div>
                            <div className="modal-footer">
                                <center>
                                    <Button flat primary swapTheming className="AddAdminBtn" onClick={this.handelAddAdmin}>Add Admin</Button>
                                </center>
                            </div>
                        </div>
                    </div>

                    
                    <Grid>
                        {
                            this.state.Admins.map((admin)=>{
                                return(
                                    <Cell size ={4}>
                                        <InsideLogin
                                        id={admin.id}
                                        AdminRank={admin.AdminRank}
                                        AdminName={admin.AdminName}
                                        Adminlvl={admin.AdminLvl}
                                        AdminPoints={admin.AdminPoints}
                                        details={admin.AdminDetails}
                                        deleteAdmin={this.deleteAdmin}
                                        handleAdminRanknameEdit={this.handleAdminRanknameEdit}
                                        handleAdminlvlEdit={this.handleAdminlvlEdit}
                                        handleAdminPointsEdit={this.handleAdminPointsEdit}
                                        />
                                    </Cell>
                                )
                            })
                        }
                    </Grid>
                </div>
            )
        }else{
            return(
                <div className='loginDiv' style={loginStyle}>
                    <center>
                        <h1>LogIn As ServerManager</h1>
                        
                        <TextField
                            id="floating-center-title"
                            label="Email"
                            lineDirection="center"
                            placeholder="Enter email..."
                            className="md-cell md-cell--bottom reactMdInput"
                            value={this.state.EmailVal}
                            onChange={(val)=>{this.setState({EmailVal:val})}}
                        />
                        <TextField
                            id="floating-center-title"
                            type='password'
                            label="Password"
                            lineDirection="center"
                            placeholder="Enter password..."
                            className="md-cell md-cell--bottom reactMdInput"
                            value={this.state.PasswordVal}
                            onChange={(val)=>{this.setState({PasswordVal:val})}}
                        />
                        <Button flat primary swapTheming className='LoginButton' onClick={this.handelLogin}>Login</Button>
                    </center>
                </div>
            )
        }
    }
}

export default Login