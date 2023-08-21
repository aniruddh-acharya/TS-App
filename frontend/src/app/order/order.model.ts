export interface Order {
    id: number;
    userID: number;
    productID: number;
    quantity: number;
    purchasedOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
    status: string;
  }
  