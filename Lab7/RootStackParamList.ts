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
  EditCustomer:{
    name:string;
    phone:string;
    id:string;
  };
  AddTransaction:undefined;
};
// định nghĩa kiểu dữ liệu nhận vào của màn hình
