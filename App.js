import React from 'react';
import { TextInput,Button,StyleSheet, Text, View } from 'react-native';
import styles from './styles/styles.js';
import dismissKeyboard from 'react-native-dismiss-keyboard';


debug=false

export default class App extends React.Component {
  constructor(){
    super()
    this.state={timer:'WORK',
                workTime: 0*60+5,
                breakTime: 0*60+10,
                currentTime:0,
                remainingTime:null,
                min:0,
                sec:0,
                startFlag:false,
                resetFlag:false,
                inputField:null,
                inputId:null,
                show:false}
  }
  componentDidMount(){
    this.setState({remainingTime:this.state.workTime},function(){
                   this.textTime()})
    this.interval=setInterval(this.inc.bind(this),1000)
    this.inc()
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(debug)console.log('GETDERIVEDSTATEFROMPROPS',prevState)
  return null
  }
  shouldComponentUpdate(nextProps,nextState){
    if(debug)console.log('SHOULDCOMPONENTUPDATE',nextState)
    return true
  }
  componentDidUpdate(){
   if(debug)console.log('COMPONENTDIDUPDATE',this.state)
  }
  componentWillUnmount(){
   if(debug)console.log('COMMPONENTWILLUNMOUNT',this.state)
  }

  startToggle(){
    this.setState({startFlag:!this.state.startFlag})
  }
  resetToggle(){
    this.setState({resetFlag:true,
    remainingTime:this.state[`${this.state.timer.toLowerCase() +'Time'}`]})
  }
  textTime(){
    let min = Math.floor(this.state.remainingTime / 60).toString()
    let sec = (this.state.remainingTime % 60)
    sec = sec < 10  ? '0' + sec : sec.toString()
    this.setState({min:min,sec:sec})
  }

  inc(){

    if(debug)console.log('INC',this.state.startFlag)
    if(this.state.remainingTime === 0)this.setState(
      {timer:this.state.timer === 'WORK' ? 'BREAK' : 'WORK'},function(){
        this.setState({remainingTime:
          this.state[`${this.state.timer.toLowerCase() +'Time'}`]+1})
      })

    if(this.state.resetFlag){
       this.setState({startFlag:false,resetFlag:false,
                      remainingTime:this.state.remainingTime},function(){
                      this.textTime()
                    })
    }else if (this.state.startFlag){
      this.setState({remainingTime:this.state.remainingTime - 1},function(){
        this.textTime()
      })
    }
  }

  captureInput=(text,inputId)=>{
    let inputField = Number(text)
    if(!isNaN(inputField))this.setState({inputField:inputField,inputId:inputId})
  }
  update(done){
    let secs,min,workTime,breakTime
    if (this.state.inputId === 'work-min'){
       secs = this.state.workTime % 60
       workTime = this.state.inputField * 60 + secs
       this.setState({workTime:workTime})
    }else if (this.state.inputId === 'work-sec'){
       min = Math.floor(this.state.workTime / 60)
       workTime = min * 60 + this.state.inputField
      this.setState({workTime:workTime})
    }else if (this.state.inputId === 'break-min'){
       secs = this.state.breakTime % 60
       breakTime = this.state.inputField * 60 + secs
      this.setState({breakTime:breakTime})
    }else if(this.state.inputId === 'break-sec'){
       min = Math.floor(this.state.breakTime / 60)
       breakTime = min * 60 + this.state.inputField
      this.setState({breakTime:breakTime})
    }
    if(done){
       dismissKeyboard()
       this.setState({show:false,remainingTime:
                      this.state[`${this.state.timer.toLowerCase() +'Time'}`]})
       this.done()
    }
  }
  showdone(){
    this.setState({show:true})
  }

  done(){
    if(this.state.show){
    return(<View style={{flex:0,flexDirection:'row',justifyContent:
                  'flex-end',alignSelf:'flex-end',marginTop:20}} >
       <Button title='done'
               onPress={()=>this.update(true)}
               />
    </View>)
  }else{
    return <View>
            <Text>&nbsp;</Text>
           </View>
  }
}
  render() {
    if(debug)console.log('RENDER',this.state)


    return (
      <View style={styles.container}>
        <Text style={styles.bigFont}>{`${this.state.timer + 'TIMER'}`}</Text>
        <Text style={styles.bigFont}>
                    {`${this.state.min + ':' + this.state.sec}`}</Text>
        <View style={styles.button}>
          <Button title= {this.state.startFlag ? 'PAUSE' : 'START'}
                  onPress={()=>this.startToggle()} />
          <Button title='RESET' onPress={()=>this.resetToggle()} />
        </View>
           <View style={styles.row}>
              <Text style={[styles.bold,{marginRight:10},{width:112},
                          {textAlign:'right'}]}>
                          Work Timer:</Text>
              <Text style={styles.bold}> min:</Text>
              <TextInput
                 value={Math.floor(this.state.workTime / 60).toString()}
                 style={styles.input}
                 keyboardType='numeric'
                 onChangeText={(text)=>{this.captureInput(text,'work-min')}}
                 onFocus={()=>this.showdone()}
                 onBlur={()=>this.update(false)}

              />
              <Text style={styles.bold}> sec:</Text>
              <TextInput
                 value={Math.floor(this.state.workTime % 60).toString()}
                 style={styles.input}
                 keyboardType='numeric'
                 onChangeText={(text) => {this.captureInput(text,'work-sec')}}
                 onFocus={()=>this.showdone()}
                 onBlur={()=>this.update(false)}
              />
           </View>
           <View style={styles.row}>
              <Text style={[styles.bold,{marginRight:10},{width:112},
                          {textAlign:'right'}]}>
                          Break Timer:</Text>
              <Text style={styles.bold}> min:</Text>
              <TextInput
                 value={Math.floor(this.state.breakTime / 60).toString()}
                 style={styles.input}
                 keyboardType='numeric'
                 onChangeText={(text) => {this.captureInput(text,'break-min')}}
                 onFocus={()=>this.showdone()}
                 onBlur={()=>this.update(false)}
              />
              <Text style={styles.bold}> sec:</Text>
              <TextInput
                 value={Math.floor(this.state.breakTime % 60).toString()}
                 style={styles.input}
                 keyboardType='numeric'
                 onChangeText={(text) => {this.captureInput(text,'break-sec')}}
                 onFocus={()=>this.showdone()}
                 onBlur={()=>this.update(false)}
              />
           </View>
           {this.done()}
      </View>

    )
  }
}
