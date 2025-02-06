import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const UserDetails = ({ route }) => {
  const { user } = route.params;
  console.log(user);
  const[tableHead,settableHead]=useState([
    "Serial No.",
    "Name",
    "Email",
    "Password",
    "Phone",
    "Gender",
    "Profile Pic",
    "DOB",
    "Country",
  ])

  const[tableData,settableData ]= useState([
     [ "1",
      user.name,
      user.email,
      user.password,
      user.phone,
      user.gender,
      user.profilePic, // ProfilePic URL
      user.dob,
      user.country,
     ],
    ])

  return (
    <SafeAreaView>
      <ScrollView horizontal>
        <View style={styles.container}>
          {/* Table Header */}
          <View style={styles.row}>
            {tableHead.map((header, index) => (
              <View key={index} style={styles.cellContainer}>
                <Text style={styles.thead}>{header}</Text>
              </View>
            ))}
          </View>

          {/* Table Rows */}
          {tableData.map((rowData, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <View key={cellIndex} style={styles.cellContainer}>
                  {cellIndex === 6 ? ( // If it's the profile picture column
                    <Image
                      source={{ uri: cellData }}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                  ) : (
                    <Text style={styles.cell}>{cellData}</Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: { paddingBottom: 20 },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  thead: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  cell: {
    fontSize: 14,
    textAlign: "center",
  },
  cellContainer: {
    minWidth: 160, // Ensure each column has a minimum width
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
