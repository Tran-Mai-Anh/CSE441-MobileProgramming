import {Customer, Service} from './interfaces';

export type RootStackParamList = {
  Login: undefined;
  HomeTab: undefined;
  AddService: undefined;
  ServiceDetail: Service;
  EditService: Service;
  AddCustomer: undefined;
};
// định nghĩa kiểu dữ liệu nhận vào của màn hình
