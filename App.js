import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [lastTime, setLastTime] = useState(null);
  const timerRef = useRef(null);

  const toggleTimer = () => {
    if (running) {
      clearInterval(timerRef.current);
      setRunning(false);
      setLastTime(time);
    } else {
      setRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setRunning(false);
    setLastTime(null);
  };

  const formatTime = (milliseconds) => {
    const hrs = String(Math.floor(milliseconds / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((milliseconds % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      <Image source={require("./src/crono.png")} />

      <View style={[styles.timerContainer, { marginTop: lastTime !== null ? -180 : -160 }]}> 
        <Text style={styles.timer}>{formatTime(time)}</Text>
        {lastTime !== null && (
          <Text style={styles.lastTime}>Último tempo: {formatTime(lastTime)}</Text>
        )}
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity style={[styles.btn, running ? styles.stopBtn : styles.startBtn]} onPress={toggleTimer}>
          <Text style={styles.btnText}>{running ? "Stop" : "Start"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.resetBtn]} onPress={resetTimer}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  timerContainer: {
    alignItems: "center",
  },
  timer: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  lastTime: {
    fontSize: 17,
    color: "#fff",
    marginTop: 10,
  },
  btnArea: {
    flexDirection: "row",
    marginTop: 120,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 7,
    borderRadius: 9,
  },
  startBtn: {
    backgroundColor: "#32CD32",
  },
  stopBtn: {
    backgroundColor: "#FF0000",
  },
  resetBtn: {
    backgroundColor: "#A9A9A9",
  },
  btnText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
});

export default App;
