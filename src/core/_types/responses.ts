export interface IOutput{
    success: boolean,
    message: string,
    data?: any,
    [x: string]: any,
}