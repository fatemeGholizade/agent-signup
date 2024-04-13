export interface User {
    phone: string;
  }
export interface Insurance{
  name: string,
  id: number,
}
export interface Info {
  personal_info:{
    id: number,
    phone_number: number,
    first_name: string,
    last_name: string
  },
  agency_info: {
    id: number,
    insurance: {
        id: number,
        name:string,
        code: string
    },
    agent_code: number,
    role: string
},
  
}
