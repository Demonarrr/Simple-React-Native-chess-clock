import React, { useState, useEffect } from 'react';
import { View,  Text, StyleSheet, StatusBar, TouchableOpacity, Image} from 'react-native';



const App = () => {
  
  const [initialTime, setInitialTime] = useState(10);
 
  //initialize white
  const [whiteTime, setWhiteTime] = useState(initialTime);
  const [isWhiteMove, setIsWhiteMove] = useState(false); 
  const [isWhiteDisabled, setIsWhiteDisabled] = useState(false);
  const [moveCountWhite, setMoveCountWhite] = useState(0);
  
  const handleWhiteOnPress = () => {
    setMoveCountWhite(moveCountWhite+1);
    setIsBlackMove(true);
    setIsBlackDisabled(false);
    setIsWhiteDisabled(true);
  };
  //listen to isWhiteMove changes
  useEffect(()=>{
    if (isWhiteMove) {
      if (isBlackMove) setIsBlackMove(false);//both isWhiteMove and isBlackMove can't be true at the same time
      var ID_whiteTimer = setInterval(()=>{
        if (whiteTime>0) setWhiteTime(prevWhiteTime => prevWhiteTime-1);
        }, 1000);
      }
    return () => {clearInterval(ID_whiteTimer)};
  }, [isWhiteMove, whiteTime]);


  //initialize black
  const [blackTime, setBlackTime] = useState(initialTime);
  const [isBlackMove, setIsBlackMove] = useState(false);
  const [isBlackDisabled, setIsBlackDisabled] = useState(true);
  const [moveCountBlack, setMoveCountBlack] = useState(0);
  
  const handleBlackOnPress = () => {
    setMoveCountBlack(moveCountBlack+1);
    setIsWhiteMove(true);
    setIsBlackDisabled(true);
    setIsWhiteDisabled(false);
  };
  //listen to changes of isBlackMove
  useEffect(()=>{
    if (isBlackMove) {
      if (isWhiteMove) setIsWhiteMove(false); //both isWhiteMove and isBlackMove can't be true at the same time
      var ID_blackTimer = setInterval(()=>{
        if (blackTime>0) setBlackTime(prevBlackTime => prevBlackTime-1);
        }, 1000);
      }
    return ()=> {clearInterval(ID_blackTimer)};
  }, [isBlackMove, blackTime]);



  return(
    <View style={styles.mainCoitainer} >
    <StatusBar hidden={true}/>
      
    {/* BLACK BUTTON CODE START*/}
    <TouchableOpacity onPress={handleBlackOnPress}
      disabled={isBlackDisabled}
      style={styles.opponentButton}>
      <View>
        <Text style={styles.timerText}>BLACK</Text>
        <Text style={styles.timerText}>
        {Math.floor((blackTime/(60*60))%24)}:
        {Math.floor((blackTime/60)%60)}:
        {Math.floor(((blackTime)%60))}
        </Text>
        <Text style={styles.timerText}>Move #{moveCountBlack}</Text>
      </View>
    </TouchableOpacity>
    {/* BLACK BUTTON CODE END*/}
  
    {/* BUTTON BAR CODE START */}
    <View style={styles.buttonBarContainer}>
        
    {/* SETTINGS BUTTON CODE START */}
    <TouchableOpacity>
      <View>
        <Image source={require('./img/settings.png')}/>
      </View>
    </TouchableOpacity>
    {/* SETTINGS BUTTON CODE END */}

    {/* PAUSE BUTTON CODE START */}
    <TouchableOpacity onPress={()=>{setIsBlackMove(false); setIsWhiteMove(false);}}>
      <View>
        <Image source={require('./img/pause.png')}/>
      </View>
    </TouchableOpacity>
    {/* PAUSE BUTTON CODE END */}

    {/* RESET BUTTON CODE START */}
    <TouchableOpacity onPress={()=>{
      setIsBlackMove(false);
      setIsBlackDisabled(true);
      setBlackTime(initialTime);
      setMoveCountBlack(0);

      setIsWhiteMove(false);
      setIsWhiteDisabled(false);
      setWhiteTime(initialTime);
      setMoveCountWhite(0);
    }}>
      <View>
        <Image source={require('./img/reset.png')}/>
      </View>
    </TouchableOpacity>
    {/* RESET BUTTON CODE END */}

    </View>
    {/* BUTTON BAR CODE END */}

      

    {/* WHITE BUTTON CODE START*/}
    <TouchableOpacity onPress={handleWhiteOnPress}
      disabled={isWhiteDisabled}
      style={styles.playerButton}> 
      <View>
        <Text style={styles.timerText}>WHITE</Text>
        <Text style={styles.timerText}>
        {Math.floor((whiteTime/(60*60))%24)}:
        {Math.floor((whiteTime/60)%60)}:
        {Math.floor(whiteTime%60)}
        </Text>
        <Text style={styles.timerText}>Move #{moveCountWhite}</Text>
      </View>
    </TouchableOpacity>
    {/* WHITE BUTTON CODE START*/}

    </View>
  );
};

export default App;



const styles = StyleSheet.create({
  mainCoitainer:{
    flex:1,
    justifyContent: "center",
    backgroundColor: "ivory",
  },
  
  playerButton:{
    flex: 3,
    backgroundColor: "black",
    justifyContent: 'center'
  },
  
  opponentButton:{
    flex:3,
    backgroundColor: 'black',
    justifyContent: 'center',
    transform:[{rotate: '180deg'}],
  },
  
  buttonBarContainer:{
    flex:1,
    backgroundColor: 'ivory',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  timerText:{
    color: 'ivory',
    fontSize: 30,
    alignSelf: "center",
    alignContent: "center"
  }
});