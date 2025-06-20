import {Customer, Service, Transaction} from './interfaces';

export type RootStackParamList = {
  Login: undefined;
  HomeTab: undefined;
  AddService: undefined;
  ServiceDetail: Service;
  EditService: Service;
  AddCustomer: undefined;
  TransactionDetail: Transaction;
  CustomerDetail: Customer;
};
// định nghĩa kiểu dữ liệu nhận vào của màn hình
