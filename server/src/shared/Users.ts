export class User {
    constructor(
      public userID: number,
      public Username: string,
      public password: string,
      public role: string,
      public CreationDate: Date,
      public roleID: number
    ) {}
  }