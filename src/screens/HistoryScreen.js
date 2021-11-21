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
  var historyList = useSelector((state) => state.medicine.history);

  const [date, setDate] = useState(new Date());
  const [option,setOption] = useState("ดูทั้งหมด");
  var dropDownOption = historyList.map(x=>x.name)
  dropDownOption.splice(0,0,"ดูทั้งหมด")

  if(option != "ดูทั้งหมด"){
  historyList = historyList.filter(x=>x.name == option)
  }




  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };




  let listDataSort = historyList.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

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
          {itemData.image == null ?           (<Image
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
          buttonStyle={{borderRadius:10}}
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
        <View style={styles.sectionDate}>
          <TouchableOpacity
            style={{ colro: "black" }}
            onPress={() => showDatePicker()}
          >
            <MaterialIcons name="date-range" size={40} color="black" />
            <DateTimePickerModal
              style={{
                shadowColor: "#fff",
                shadowRadius: 0,
                shadowOpacity: 1,
                shadowOffset: { height: 0, width: 0 }
              }}
              isVisible={isDatePickerVisible}
              mode="time"
              display="spinner"
              isDarkModeEnabled={true}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              locale="th_TH"
            />
          </TouchableOpacity>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    zIndex: 1000
  },
  sectionDate: {
    // flexDirection: "row",
    flex: 0.8,
    paddingRight: "10%",
    alignItems: "flex-end",
    justifyContent: "center"
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
