import React,{Component} from 'react'
import {
    Grid, 
    Cell,
  } from 'react-md';
import InsideHome from './defaultshow/insideHome'
import {firestore} from './config/config'

class Home extends Component{

    constructor(){
        super()
        this.state={
            Admins:[],
        }
        this.fireStore = firestore.collection('Admins')
    }

    componentWillMount(){
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
                    alert('There is an updated detected website will auto reload after 3 seconds')
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                  }
              })
          })
    }

    render(){
        return(
            <div>
                    <div className='homeAdminlistTittle'>
                        <center>
                            <h1>Admin List</h1>
                        </center>
                    </div>
                    <br/>
                    <Grid>
                        {
                                this.state.Admins.map((admin)=>{
                                    return(
                                        <Cell size ={4}>
                                            <InsideHome
                                            AdminRank={admin.AdminRank}
                                            AdminName={admin.AdminName}
                                            Adminlvl={admin.AdminLvl}
                                            AdminPoints={admin.AdminPoints}
                                            details={admin.AdminDetails}
                                            />
                                        </Cell>
                                    )
                                })
                        }
                    </Grid>
            </div>
        )
    }
}

export default Home