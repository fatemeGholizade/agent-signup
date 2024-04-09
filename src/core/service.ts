import { toast } from "react-toastify";
import { AppConstants } from "./constants";
export function parseJSON(response:any) {
    const statusCode = response.status
    const json = response.json()
    if(statusCode===401){
        window.location.href = "/"
    }
    return Promise.all([statusCode, json])
}
export const call_api = ({ address_api, method_api, body, file } : any) => {
    let headers
    if (file) {
        headers = {
            Accept: 'application/json',
        }
    } else {
        headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }
    return fetch(address_api, {
        method: method_api,
        headers,
        body
    })
}
export const logout = () => {
    call_api({
      address_api: `${AppConstants.base_url_api}seller/logout`,
      method_api: "POST",
    })
      .then(parseJSON)
      .then(([status, j]) => {
        if (status === 200) {
            localStorage.clear();
            window.open('/','_self')
        } else if (status === 401) {
          localStorage.clear();
        }
         else {
          toast.error(j?.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

