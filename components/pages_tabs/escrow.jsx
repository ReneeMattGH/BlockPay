import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { connectWallet, transferFunds } from './wallectconnect';

const escrowScreen=()=>{
    const navigation=useNavigation();
    const senderAddress="0x4611153A4db6F32B4958d85f73d5cd2D6974Eb98";
    const upiId="agentprofessor29@oksbi";

    const executeTransaction = async () => {
        try {
          if (!toAddress || !amount) {
            alert('Please provide both address and amount');
            return;
          }
    
          // Connect to wallet and get the web3 instance
          const { web3, senderAddress } = await connectWallet(privateKey);
    
          if (!web3 || !senderAddress) {
            alert('Wallet connection failed.');
            return;
          }
    
          // Perform the fund transfer
          await transferFunds(web3, privateKey, toAddress, amount);
    
          
          handleConfirm();
    
        } catch (error) {
          console.error('Error executing transaction:', error);
          handleFailed();
        }
      };

      return(
        <View style={styles.container}>
            <TouchableOpacity
        style={styles.payButton}
        onPress={executeTransaction}
      >
        {isPaying ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>Pay Now</Text>
        )}
      </TouchableOpacity>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f8f9fa",
      margin: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "#6200ee",
      marginBottom: 20,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
      color: "#6200ee",
      fontWeight: "600",
      marginBottom: 10,
      textAlign: "center",
    },
    row: {
      justifyContent: "space-between",
      marginBottom: 20,
      flexWrap: "wrap",
    },
    coinCard: {
      flex: 1,
      padding: 15,
      marginHorizontal: 10,
      backgroundColor: "#fff",
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
    },
    selectedCard: {
      backgroundColor: "#6200ee",
      elevation: 6,
      shadowColor: "#6200ee",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
    },
    coinIcon: {
      width: 32,
      height: 32,
    },
    coinText: {
      marginTop: 10,
      fontSize: 16,
      color: "#333",
      fontWeight: "500",
    },
    selectedCoinText: {
      color: "#fff",
      fontWeight: "700",
    },
    inputContainer: {
      marginTop: 20,
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 12,
      elevation: 3,
    },
    label: {
      fontSize: 16,
      color: "#333",
      marginBottom: 10,
    },
    input: {
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          fontSize: 16,
          marginBottom: 15,
        },
        conversionRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        cryptoLabel: {
          fontSize: 16,
          color: "#6200ee",
          fontWeight: "600",
        },
        payButton: {
          marginTop: 30,
          backgroundColor: "#6200ee",
          paddingVertical: 15,
          borderRadius: 12,
          alignItems: "center",
        },
        payButtonText: {
          fontSize: 18,
          color: "#fff",
          fontWeight: "700",
        },
        loadingText: {
          fontSize: 18,
          color: "#6200ee",
          textAlign: "center",
        },
});

export default escrowScreen;