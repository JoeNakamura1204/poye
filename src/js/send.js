var send = {
    template:`
       <div class="body">
            <div class="container">
                <div class ="card">
                    <div class="view overlay">
                        <img  class="card-img-top" src="./img/starsky.jpg" alt="Card image cap">
                        <a href="#">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>

                    <div class="card-body">
                        <p><input v-model="message"></p>
                        <p>{{ message }}</p>
                        <p><button v-on:click="send" class="btn btn-outline-success" >SEND</button></p>
                        <p><button v-on:click.once="get" class="btn align-middle btn-outline-secondary">Get</button></p>
                        <p v-for="msg in result">{{ msg }}</p>
                    </div>

                </div>
            </div>
        </div>
       `,
    data:function(){
        return {
            message: 'Proof Of Your Existence',
            yourAccount: "",
            result: []
        }
    },
    created:function(){
        this.startweb3();
        this.connectWeb3();
    },
    methods:{
        ttt:function(msg){
            console.log(msg);
            this.result.push(msg);
            console.log(this.result)
        },
        startweb3:function(){
            if (typeof web3 !== 'undefined'){
                web3 = new Web3(web3.currentProvider);
                console.log("OK!!");
                (web3.eth.getAccounts((error,results) => {

                this.yourAccount = results
                console.log(this.yourAccount);
            }));
            }else{
                console.log("No")
            }
        },
        connectWeb3:function(){
            var contract_address = "0xa4392264a2d8c998901d10c154c91725b1bf0158";
            contract = new web3.eth.Contract(abi, contract_address);

            var accountInterval = setInterval(function () {
                web3.eth.getAccounts((error, accounts) => {
                    if(accounts[0] !== userAccount){
                    userAccount = accounts[0];
                    console.log(userAccount);
                }
            });
            }, 100);
            console.log(web3.eth.getAccounts)
        },
        getmessage:function(id){
            var self = this;
            var msg = contract.methods.getMessage(id).call().then(
                function(message){
                    var msg = message;
                    var text = (msg[2]);
                    console.log(text);
                    self.ttt(text)
                }
            );
        },
        send:function () {
            msg = this.message;
            console.log(userAccount);
            console.log(msg);
            contract.methods.sendMessage(msg).send({from:userAccount});
        },
        get:function(){
            var msgs = contract.methods.getMessages().call().then(
                function(result){
                    var m = result;
                    var msg = (m[2]);
                    console.log(msg);
                    console.log(m);
                    for(var i=0; i < m.length&m[i]>0;i++){
                        console.log(m[i]);
                        var id = m[i];
                        console.log(this);
                        window.send.methods.getmessage(id);
                    }
                },
                function(rejected){
                    console.log('No')
                }
            );
        },
    }
};
