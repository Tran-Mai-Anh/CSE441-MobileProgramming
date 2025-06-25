import { useEffect, useState } from "react";
import { AddTransactionForm, Customer, Service } from "./interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function AddTransaction() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<{
    [key: string]: {selected: boolean; quantity: number};
  }>({});
  const [token, setToken] = useState<string | null>('');

  useEffect(() => {
    AsyncStorage.getItem('token').then(val => {
      setToken(val);
    });
  }, []);
  useEffect(() => {
    async function getAllServices() {
      try {
        const response = await axios.get(
          'https://kami-backend-5rs0.onrender.com/services',
        );
        setServices(response.data);
        console.log(response.data);
      
      } catch (error) {
        console.error('Error get all service', error);
      }
    }
    getAllServices();
  }, []);

  useEffect(() => {
    async function fetchingCustomers() {
      try {
        const response = await axios.get(
          'https://kami-backend-5rs0.onrender.com/customers',
        );
        setCustomers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error getting Customers');
      }
    }

    fetchingCustomers();
  }, []);

  const handleAddTransaction = 
    async (result: AddTransactionForm) => {
      try {
        await axios.post(
          'https://kami-backend-5rs0.onrender.com/transactions',
          result,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.error('Error getting Customers');
      }
    }

  const customerData = customers.map(customer => ({
    label: customer.name,
    value: customer._id,
  }));

  const handleServiceToggle = (serviceId: string, isChecked: boolean) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        selected: isChecked,
        quantity: isChecked ? 1 : 0,
      },
    }));
  };

  const handleQuantityChange = (serviceId: string, change: number) => {
    setSelectedServices(prev => {
      const current = prev[serviceId] || {selected: false, quantity: 0};
      const newQuantity = Math.max(0, current.quantity + change);
      return {
        ...prev,
        [serviceId]: {
          selected: newQuantity > 0,
          quantity: newQuantity,
        },
      };
    });
  };

  const calculateTotal = () => {
    return Object.entries(selectedServices).reduce(
      (total, [serviceId, data]) => {
        if (data.selected) {
          const service = services.find(s => s._id === serviceId);
return total + (service?.price || 0) * data.quantity;
        }
        return total;
      },
      0,
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const handleSummary = () => {
    if (!selectedCustomer) {
      Alert.alert('Lỗi', 'Vui lòng chọn khách hàng');
      return;
    }

    const selectedServicesList = Object.entries(selectedServices)
      .filter(([_, data]) => data.selected)
      .map(([serviceId, data]) => ({
        _id: serviceId,
        quantity: data.quantity,
        userId: selectedCustomer,
      }));

    if (selectedServicesList.length === 0) {
      Alert.alert('Lỗi', 'Vui lòng chọn ít nhất một dịch vụ');
      return;
    }

    const resultData: AddTransactionForm = {
      customerId: selectedCustomer,
      services: selectedServicesList,
    };

    handleAddTransaction(resultData);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF6B9D" barStyle="light-content" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer *</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={customerData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select customer"
            value={selectedCustomer}
            onChange={item => {
              setSelectedCustomer(item.value);
            }}
          />
        </View>

        <View style={styles.servicesContainer}>
          {services.map((service, index) => {
            const serviceData = selectedServices[service._id] || {
              selected: false,
              quantity: 0,
            };

            return (
              <View key={service._id} style={styles.serviceItem}>
                <BouncyCheckbox
                  size={20}
                  fillColor="#FF6B9D"
                  unFillColor="white"
                  text={service.name}
                  iconStyle={{borderColor: '#FF6B9D'}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={styles.serviceText}
                  isChecked={serviceData.selected}
                  onPress={(isChecked: boolean) =>
                    handleServiceToggle(service._id, isChecked)
                  }
                />

                {serviceData.selected && (
                  <View style={styles.serviceDetails}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(service._id, -1)}
                        disabled={serviceData.quantity <= 1}>
                        <Text
style={[
                            styles.quantityButtonText,
                            serviceData.quantity <= 1 && styles.disabledButton,
                          ]}>
                          -
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>
                        {serviceData.quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(service._id, 1)}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>

                      <Text style={styles.executorText}>Executor</Text>
                      <TouchableOpacity style={styles.executorDropdown}>
                        <Text style={styles.executorDropdownText}>▼</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.priceText}>
                      Price:{' '}
                      <Text style={styles.priceValue}>
                        {formatPrice(service.price * serviceData.quantity)}
                      </Text>
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.summaryButton} onPress={handleSummary}>
          <Text style={styles.summaryButtonText}>
            See summary: ({formatPrice(calculateTotal())})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#EF506B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333333',
  },
  servicesContainer: {
    flex: 1,
  },
  serviceItem: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  serviceText: {
    fontSize: 16,
    color: '#333333',
    textDecorationLine: 'none',
    marginLeft: 8,
  },
  serviceDetails: {
    marginTop: 12,
    marginLeft: 28,
  },
quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  disabledButton: {
    color: '#CCCCCC',
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
    color: '#333333',
    minWidth: 20,
    textAlign: 'center',
  },
  executorText: {
    marginLeft: 20,
    fontSize: 16,
    color: '#999999',
  },
  executorDropdown: {
    marginLeft: 8,
    padding: 4,
  },
  executorDropdownText: {
    fontSize: 12,
    color: '#999999',
  },
  priceText: {
    fontSize: 14,
    color: '#333333',
  },
  priceValue: {
    color: '#EF506B',
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  summaryButton: {
    backgroundColor: '#EF506B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  summaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});