const baseURL = 'www.sxwyyyyxgs.com';
const header = {
    'token':getApp().globalData.token,
    'Content-Type': 'application/json'
}
 module.exports = (url,method,data,header)=>{
     return new Promise((resolve,rejects)=>{
            wx.request({
                url:baseURL+url,
                method:method,
                data:data,
                header,
                success:(res)=>{
                     resolve(res)   
                },
                fail:(err)=>{
                     rejects(err)   
                }
            })
     })
 }

 // 这样封装也可以

//  function request(url,method,data,header){
//      return new Promise((resolve,rejects)=>{
//         wx.request({
//             url:url,
//             method:method,
//             data:data,
//             header:header,
//             success:(res)=>{
//                  resolve(res)   
//             },
//             fail:(err)=>{
//                  rejects(err)   
//             }
//         })
//      })
//  }
//  export default request;
















