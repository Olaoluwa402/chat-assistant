import { Msg } from "nats";

export interface IService {
  SubscribeEvents(m: Msg, content: string): void;
}

export enum UserRole {
  "CUSTOMER" = "CUSTOMER",
  "DRIVER" = "DRIVER",
  "MERCHANT" = "MERCHANT",
}
