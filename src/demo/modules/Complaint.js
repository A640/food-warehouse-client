import axios from 'axios'

const ComplaintModule = {

    state: { 

        complaints: [],
        complaints_loading: false,

    },

    mutations: {

        setComplaints(context,data){
            context.complaints = data;
        },

        setComplaintsLoading(context, value){
            context.complaints_loading = value;
        },

        clearComplaint(context){
          context.complaints = [];
          context.complaints_loading = false;
        },

    },

    actions: {

    
        addComplaintResponse(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
              // creating new Complaint and new User
              axios.post(context.getters.getServerAddress +'/complaint', data, { headers: { Authorization: `Bearer ${token}` }})
                .then((response) =>{
      
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
      
                  if (response.status === 200) {
                    // if added successfully
                    resolve(true)
                      
                  }else{
                    reject(response)
                  }
      
                })
                .catch( (error) =>{
      
                  if(error.toJSON().message == "Network Error"){
                    //if can't connect to server
      
                    context.dispatch('noConnectionChange',true);
      
                  }else{
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
      
                    //if connected to server, hide no connection banner
                    context.dispatch('noConnectionChange',false);

                    if(error.response.status == 403){
                      context.dispatch('forbiddenResponse');
                    }
                  
                    reject(error)
                  }
                  
                });
              
            });
        },


      getAllComplaints(context, silent=false){
            //get all Complaints and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik complaint")
            context.commit('setComplaintsLoading',true);
            let token = localStorage.getItem('jwtToken')
            axios.get(context.getters.getServerAddress +'/complaint', { headers: { Authorization: `Bearer ${token}` } })
              .then( (data) => {
      
                if(!silent){
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
                }
               
      
                //save Complaints data in vuex store
                console.log("complaints",data)
                context.commit('setComplaints',data.data.result);
                context.commit('setComplaintsLoading',false);
              })
              .catch( (error) =>{
      
                if(error.toJSON().message == "Network Error"){
                  //if can't connect to server
      
                  context.dispatch('noConnectionChange',true);
      
                }else{
                  // Request made and server responded
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
      
                  if(!silent){
                     //if connected to server, hide no connection banner
                    context.dispatch('noConnectionChange',false);
                  }

                  if(error.response.status == 403){
                    context.dispatch('forbiddenResponse');
                  }
                 
                }
                context.commit('setComplaintsLoading',false);
              }); 
        },

      
        getComplaintData(context, id){
            let res = context.state.complaints.find(complaint => complaint.complaint.complaint_id == id);
            return res;
        },
        
    },

    getters: {

        getComplaints(context){
            return context.complaints;
        },

        getComplaintsLoading(context){
            return context.complaints_loading;
        },  

    },
};

export default ComplaintModule;