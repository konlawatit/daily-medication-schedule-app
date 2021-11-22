import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AccordionList } from "accordion-collapse-react-native";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Button
} from "react-native";
import { DataTable } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import SelectDropdown from 'react-native-select-dropdown'

//Components
import HeaderTitle from "../components/HeaderTitle";
import MedicineCard from "../components/MedicineCard";
import DropDownPicker from "../components/DropDownPicker";

//stylesheets
import { globalStyle } from "../stylesheet/globalStylesheet";

export default function HistoryScreen({ navigation }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  let historyList = useSelector((state) => state.medicine.history);

  const [date, setDate] = useState(new Date());
  const [startDate,setStartDate] = useState("วันที่เริ่มต้น")
  const [endDate,setEndDate] = useState("วันที่สิ้นสุด")
  const [option,setOption] = useState("ดูทั้งหมด");
  function getUnique(array){
    let i = 0
    var uniqueArray = [];
    
    // Loop through array values
    for(i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
  }
  function isBetween(date){
    var d1 = startDate.split("/");
    var d2 = endDate.split("/");
    var c = date.date.split("/");

    var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    var check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return check >= from && check <= to
  }

  var dropDownOption = historyList.map(x=>x.name)
  dropDownOption = getUnique(dropDownOption)
  dropDownOption.splice(0,0,"ดูทั้งหมด")

  if(option != "ดูทั้งหมด"){
  historyList = historyList.filter(x=>x.name == option)
  }
  if((startDate != "วันที่เริ่มต้น") && (endDate != "วันที่สิ้นสุด")){
    historyList = historyList.filter(isBetween)
  }




  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setDatePickerVisibility1(false);
  };

  const handleConfirm = (date) => {
    let temp = date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear()
    setStartDate(temp)
    hideDatePicker();
  };

  const handleConfirm1 = (date) => {
    let temp = date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear()
    setEndDate(temp)
    hideDatePicker();
  };



  

  // let listDataSort = historyList.sort((a, b) => {
  //   if (a.date < b.date) {
  //     return 1;
  //   }
  //   if (a.date > b.date) {
  //     return -1;
  //   }
  //   // a must be equal to b
  //   return 0;
  // });

  let stackDate = 0;

  function changeStackDate(newDate) {
    // console.log("dsfsdfsdfsdfs", newDate);
    stackDate = newDate;
    return <View></View>;
  }

  // console.log(listDataSort);
  const renderItem = (itemData) => {
    return (
      <DataTable.Row>
        <DataTable.Cell style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontFamily: "Prompt-Light" }}>
            {itemData.date}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontFamily: "Prompt-Light" }}>
            {itemData.time}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontFamily: "Prompt-Light" }}>
            {itemData.name}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell style={{ justifyContent: "center" }}>
          <Icon name="caret-down" type="font-awesome" size={24} />
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  const collapseItem = (itemData) => {
    return (
      <View style={{ marginLeft: 20, flexDirection: "row" }}>
        <View
          style={{
            flex: 0.5,
            alignItems: "center",
            justifyContent: "center",
            padding: (0, 0, 10, 10)
          }}
        >
          {!itemData.image?           (<Image
            style={styles.tinyLogo}
            source={require('../../assets/test.jpg')}
            
          />):(<Image
          style={styles.tinyLogo}
          source={{uri:itemData.image}}
          
        />)}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: "Prompt-Light" }}>
            {itemData.note}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(255,255,255,1)", "transparent"]}
        style={styles.background}
      />

      <HeaderTitle title="ประวัติการทานยา" />
      <View style={styles.sectionFilter}>
      <View style={styles.sectionDropDown}>
              <SelectDropdown
              defaultButtonText="ดูทั้งหมด"
            buttonTextStyle={{fontSize:16 ,fontFamily:"Prompt-Light",fontWeight:"bold"}}
            rowTextStyle={{fontSize:16 ,fontFamily:"Prompt-Light",fontWeight:"bold"}}
          buttonStyle={{borderRadius:10,width:'100%'}}
          dropdownStyle={{borderRadius:10}}
          data={dropDownOption}
          onSelect={(selectedItem, index) => {
            setOption(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        </View>
      </View>
      <View style={styles.sectionFilter}>
        
        <View style={styles.sectionDate}>
          <View style={{flexDirection:"row"}}>
          <TouchableOpacity
            style={{ color: "black",flexDirection:"row",flex:1}}
            onPress={() => showDatePicker()}
          >
            <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
              <Text style={{fontSize:16 ,fontFamily:"Prompt-Light",fontWeight:"bold"}}>{startDate}</Text>
            </View>
            <View style={{flex:1,alignItems:"center"}}>
            <MaterialIcons name="date-range" size={40} color="black" />
            </View>
            <DateTimePickerModal
              style={{
                shadowColor: "#fff",
                shadowRadius: 0,
                shadowOpacity: 1,
                shadowOffset: { height: 0, width: 0 },
              }}
              isVisible={isDatePickerVisible}
              mode="date"
              display="calendar"
              isDarkModeEnabled={false}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              locale="th_TH"
            />
            </TouchableOpacity>
            <TouchableOpacity
            style={{ color: "black",flexDirection:"row",flex:1 }}
            onPress={() => showDatePicker1()}
          >
            <View style={{flex:1,justifyContent:'center',alignItems: 'flex-start'}}>
              <Text style={{fontSize:16 ,fontFamily:"Prompt-Light",fontWeight:"bold"}}>{endDate}</Text>
            </View>
            <View style={{flex:1,alignItems:"flex-start"}}>
            <MaterialIcons name="date-range" size={40} color="black" />
            </View>
            <DateTimePickerModal
              style={{
                shadowColor: "#fff",
                shadowRadius: 0,
                shadowOpacity: 1,
                shadowOffset: { height: 0, width: 0 }
              }}
              isVisible={isDatePickerVisible1}
              mode="date"
              display="spinner"
              isDarkModeEnabled={false}
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker}
              locale="th_TH"
            />
          </TouchableOpacity>

          </View>
        </View>
      </View>

      <DataTable>
        <DataTable.Header style={{ zIndex: 0 }}>
          <DataTable.Title style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", zIndex: 1 }}>
              Date
            </Text>
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Time</Text>
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text>
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>More</Text>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>
      <AccordionList
        list={historyList}
        header={renderItem}
        body={collapseItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginBottom: 15,
    alignItems: "center"
  },
  container: {
    backgroundColor: "rgba(85,194,255,0.8)",
    height: "100%"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "150%",
    flex: 1
  },
  sectionDropDown: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    zIndex: 1000
  },
  sectionDate: {
    // flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"row"
  },
  sectionFilter: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
    height: 45
  },
  line: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25,
    flex: 0.5
  },
  tinyLogo: {
    borderRadius:5,
    width: 80,
    height: 80
  }
});
