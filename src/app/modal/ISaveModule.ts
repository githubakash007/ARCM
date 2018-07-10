export interface ISaveModule {
    ARCM_Module_Group_ID: number,
    ARCM_Module_ID: number,
    ARCM_Process_Type_ID: number,
    ARCM_HW_Type_ID: number,
    customer_code: string,
    ARCM_Device_ID: number,
    Adv_Tech_Node: string,
    Adv_Tech_Node_Value: number,
    Cost_Model_Name?:string
}