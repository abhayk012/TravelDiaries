import axios from "axios";

export const commonAPI=async(httpRequest,url,reqbody,reqheader)=>{
    const reqConfig={
        method:httpRequest,
        url:url,
        data:reqbody,
        headers:reqheader?reqheader:{"content-type":"application/json"}
    }
    return await axios(reqConfig).then((result)=>{
        return result;
    }).catch((err)=>{
        return err;
    })
}