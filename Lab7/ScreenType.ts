import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParamList";

export type ServiceDetailProps=NativeStackScreenProps<RootStackParamList, 'ServiceDetail'>;
export type EditServiceProps=NativeStackScreenProps<RootStackParamList, 'EditService'>;
export type TransactionDetailProps=NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

// định nghĩa kiểu dữ liệu của màn hình 