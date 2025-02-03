import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';

const BottomSheet = () => {
    const [visible, setVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    return (
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.openButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Open Bottom Sheet</Text>
            </TouchableOpacity>
            {/* Bottom Sheet Modal */}
            <Modal
                animationType="slide"//fade,none
                // animationInTiming={6000}
                // coverScreen={true}
                transparent={true}
                visible={modalVisible}
                // onRequestClose={() => setModalVisible(false)}
                // onSwipeComplete={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
                presentationStyle='pageSheet' //ios only
            >
                <View style={styles.modalBackground}>
                    <View style={styles.bottomSheet}>
                        {/* Close Button */}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        {/* Content */}
                        <ScrollView>
                            <Text style={styles.sheetTitle}>Bottom Sheet Content</Text>
                            <Text style={styles.sheetText}>This is a simple bottom sheet using React Native's Modal.</Text>
                        </ScrollView>
                    </View>
            
                </View>
            </Modal>
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    openButton: {
        backgroundColor: "#3498db",
        padding: 15,
        borderRadius: 10,
    },
    closeButton: {
        backgroundColor: "#e74c3c",
        padding: 15,
        borderRadius: 10,
        alignSelf: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(79, 168, 241, 0.5)",
        width:'100%',
        height:80
    },
    bottomSheet: {
        backgroundColor: "#fff",
        padding: 20,
        //   marginLeft:0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        height:300,
        // width:'100%'
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sheetText: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
    },
});