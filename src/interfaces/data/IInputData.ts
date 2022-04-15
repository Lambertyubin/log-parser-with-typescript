
import { ICode, IDetails, IError, ITransaction, IUser, IUserID } from "./datatypes";

/*
    This interface defines the format for the input data
*/

export default interface IInputData extends ITransaction, IDetails, IUserID, IError, ICode {
     user?: IUser;
}