import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParamList";

export type ServiceDetailProps=NativeStackScreenProps<RootStackParamList, 'ServiceDetail'>;
export type EditServiceProps=NativeStackScreenProps<RootStackParamList, 'EditService'>;
export type TransactionDetailProps=NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;
export type CustomerDetailProps=NativeStackScreenProps<RootStackParamList, 'CustomerDetail'>;
export type EditCustomerProps = NativeStackScreenProps<RootStackParamList,"EditCustomer">;
export type AddTransactionProps = NativeStackScreenProps<RootStackParamList,"AddTransaction">;

// định nghĩa kiểu dữ liệu của màn hình 