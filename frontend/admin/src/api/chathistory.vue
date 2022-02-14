
<template>
<div :style="opacity">
<AdminHeader>
  <section v-if="alert!=''">
      <div v-bind:class="'alert '+ classname +' p-2 ps-3 pe-3 m-0 mb-1 mt-1 text-center border-0'"> <span></span> {{alert}} </div>
  </section>

<div class="container p-0">
    <div class="row">
        <div class="col-md-12">
            <h4>Chats</h4>
            <section v-if="record==true">
            <div class="table-responsive">
     
                <table class="table table-hover table-bordered" id="myTable">
                    <thead>
                        <tr>
                            <th scope="col">s/n</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Chat ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col" class="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                    <tr v-for="(d, index) in info" :key="index">
                    <td> {{index + 1}} </td>
                    <td> {{d['surname']}} {{d['firstname']}} </td>
                    <td> {{d['email_one']}} </td>
                    <td> {{d['chatSessionID']}} </td>
                    <td v-if="d['status_id']==1"> <span class="text-warning">Closed</span> </td>
                    <td v-else>  <span class="text-primary">Opened</span>  </td>
                    <td>{{d['date_created']}}</td>
                    <td class="text-center" @click="$router.push('chatpanel/'+d['chatSessionID'])"><button class="btn btn-primary">Open</button></td>
                       </tr>
                      </tbody>
                </table>
            </div>
</section>
<section v-else>
    <p class="text-danger mt-2">{{norecord}}</p>
</section>

        </div>
    </div>
    </div>
</AdminHeader>

<!-- modal -->
</div>
</template>

<script>
import axios from 'axios'
export default {
    data (){
        return{
        usersession: '',
        serverMessage: 'Please wait...',
        auth_check: false,
        token: '',
        baseData: '',
        baseDataname: '',
        downloadmsg:'',
        isdownload:false,
        alert: null,
        alertmodal: null,
        error: '',
        info: [],
        filterlist:'',
        search:'',
        checked: true,
        list_id: [],
        get_list_array: '0',
        listStatus:'',
        displayNumber:10,
        selectToggleValue: '',
        visibility: '',
        selectedlist: null,
        isChecked:false,
        loader: false,
        loadermodal: false,
        selectDefault:"Select",
        classname: '',
        classnamemodal: null,
        submit: 'Submit',
        submittxt:'Submit',
        searchbtn:'Search',
        searchbtntxt:'Search',
        isDisabled: false,
        opacity_enable:'opacity:0.7; pointer-events: none;',
        opacity_disable:'opacity:1; pointer-events:All;',
        opacity:'',
        error_btn: null,
        errormodal: null,
        record:true,
        norecord: '',
        counter:'0'
    }
    },

    created(){
    this.checkSession()
    this.preview()
    }, 

    methods:{
      checkSession: function(){
        if (this.$session.exists()) {
            this.usersession = this.$session.get('usersession')
            }else{
                return false
                }
        },
   

    preview: function(){
        this.norecord = 'Synchronizing...'
        this.$Progress.start()
        this.isDisabled = true
        this.opacity = this.opacity_enable
        axios.get(process.env.VUE_APP_API+'/api/chats/chathistory/',{
              params:{
                limitTo: this.displayNumber,
                userid: this.usersession['email_one'],
            }
        })
        .then(response => {
            if(response.data.status == response.data.statusmsg){
            this.alert=''
            this.classname=''
            this.info = response.data.result
            this.counter = this.info.length
            this.record = true
            this.$Progress.finish()
            this.isDisabled = false
            this.opacity = this.opacity_disable
            }else{
            this.record = false
            this.counter = '0'
            this.alert=''
            this.norecord=response.data.msg
            this.classname=''
            this.$Progress.finish()
            this.isDisabled = false
            this.opacity = this.opacity_disable
            }
        
        }).catch(()=>{
            this.record = false
            this.norecord=''
            this.counter = '0'
            this.classname='alert-danger p-2'
            this.alert=localStorage.getItem('error')
            this.$Progress.fail()
            this.isDisabled = true
            this.opacity = this.opacity_disable
        })
    },

      


    },


    }
</script>