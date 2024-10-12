export class User {
    constructor(
      public userID: number,
      public Username: string,
      public password: string,
      public RoleID: number,
      public RoleName: string,
      public CreationDate: Date,
      public Email: string,
      public isAdmin: boolean,
      public LinktoImage: string,
    ) {}
  }