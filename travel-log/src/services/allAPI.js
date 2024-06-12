import { base_url } from "./baseurl";
import { commonAPI } from "./commonAPI";

// register user
export const registerAPI = async (user) => {
    return await commonAPI("POST", `${base_url}/user/register`, user, "")
}

// login user
export const loginAPI = async (reqbody) => {
    return await commonAPI("POST", `${base_url}/user/login`, reqbody, "")
}

// add place
export const addplaceAPI = async (reqbody, reqheader) => {
    return await commonAPI("POST", `${base_url}/place/add`, reqbody, reqheader)
}

// user place
export const userplaceAPI = async (reqheader) => {
    return await commonAPI("GET", `${base_url}/place/userplaces`, '', reqheader)
}

export const allplaceAPI = async (searchkey, reqheader) => {
    return await commonAPI("GET", `${base_url}/place/allplace?search=${searchkey}`, searchkey, reqheader)
}

export const allplacenosearchAPI = async ( id,reqheader) => {
    return await commonAPI("GET", `${base_url}/place/allplacenosearch/${id}`, '', reqheader)
}

// delete a place
export const deletePlaceApi = async (id, reqheader) => {
    return await commonAPI("DELETE", `${base_url}/place/remove/${id}`, {}, reqheader)
}

// edit place
export const editplaceAPI = async (id, reqbody, reqheader) => {
    return await commonAPI("PUT", `${base_url}/place/editplace/${id}`, reqbody, reqheader)
}

export const addreviewAPI = async (reqbody, reqheader) => {
    return await commonAPI("POST", `${base_url}/place/add-review`, reqbody, reqheader)
}

export const deletereviewApi = async (id, reqheader) => {
    return await commonAPI("DELETE", `${base_url}/place/removereview/${id}`, {}, reqheader)
}

export const placeReviewAPI=async(reqheader) => {
    return await commonAPI("GET", `${base_url}/place/review`, '', reqheader)
}

export const userreviewAPI = async (reqheader) => {
    return await commonAPI("GET", `${base_url}/place/usereview`, '', reqheader)
}

export const updatereviewAPI = async(id,reqbody, reqheader)=>{
    return await commonAPI("PUT",`${base_url}/place/editreview/${id}`,reqbody, reqheader)
}

export const addprofileAPI=async(reqbody,reqheader)=>{
    return await commonAPI("POST",`${base_url}/profile/add`,reqbody,reqheader)
}

export const userprofileAPI=async(reqheader)=>{
    return await commonAPI("GET",`${base_url}/profile/user-profile`,'',reqheader)
}

export const updateprofileAPI = async(id,reqbody, reqheader)=>{
    return await commonAPI("PUT",`${base_url}/profile/update-profile/${id}`,reqbody, reqheader)
}

export const removeprofileAPI=async(id,reqheader)=>{
    return await commonAPI("DELETE",`${base_url}/profile/remove-profile/${id}`,{},reqheader)
}