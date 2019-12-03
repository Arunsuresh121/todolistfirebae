import React  from 'react'
import {View,StyleSheet,Text,TextInput,Button, FlatList,SafeAreaView} from 'react-native'
import firebase from 'react-native-firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBI03X-8Bt2QpeGzEpJs22CLJvexH_Kvac",
  authDomain: "todo-12736.firebaseapp.com",
  databaseURL: "https://todo-12736.firebaseio.com",
  projectId: "todo-12736",
  storageBucket: "todo-12736.appspot.com",
  messagingSenderId: "434245105103",
  appId: "1:434245105103:web:b7ebfcda24de18c48fceba",
  measurementId: "G-TPBDVKBG8Z"
};
firebase.initializeApp(firebaseConfig);

const rootRef = firebase.database().ref();
const msgref  = rootRef.child('message');

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message:'',
      messages: [],
    }
       
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

  }
 
  componentDidMount() {
    msgref.on('value', (childSnapshot) =>{
      const messages = [];
      childSnapshot.forEach((doc) =>{
        messages.push({
          key: doc.key,
          message1: doc.toJSON().message1
        });
        this.setState({
          messages:messages,
        });
      });
    });

    msgref.on("child_removed",(childSnapshot)=>{
      let data=childSnapshot.val();
      console.log(data);
      this.setState({
        messages:[]
      })
    })
  }

   addItem = ()=> {
    msgref.push({message1: this.state.message});
   }

   removeItem = ()=> {
    msgref.remove({message1 : this.state.message});
   }
   
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textcontainer}>
          <TextInput style={styles.textin}
              placeholder='Enter your message'
              value={this.state.newmessage}
              onChangeText={(text) => this.setState({message: text})}/>  
          <Button onPress={this.addItem} title='Add'></Button>
        </View>   

        <View style={styles.container1}>
            <FlatList
                data={this.state.messages}
                 renderItem={({ item}) => 
                  <View style={styles.container2}>
                    <Text style={{fontSize:21}}>{item.message1}</Text> 
                  </View>}/>    
        </View> 
        
        <Button onPress={this.removeItem} title='delete'></Button>

      </SafeAreaView>
    
  );
 }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  container1: {
    flex:1,
    backgroundColor:'#CFC3C1',
    alignItems:'center'},

  container2: {
    width:350,
    height:50,
    backgroundColor:'#8DE5AB',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    margin:8}, 

  textcontainer: {
    flex: .1, 
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    // backgroundColor: 'white',
  
  },

  textin: {
  flex:1
  }
});

