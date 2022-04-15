import {IError, ILevel, ITimeStamp, ITransaction} from "./datatypes"
/*
    This interface defines the data format for the output
*/
export default interface IOutputData extends ITimeStamp , ILevel,  ITransaction, IError   {

}