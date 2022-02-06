module.exports = {
    passErrData: (data)=>{
        let getdata ={}
        data.forEach(element => {getdata[element.param] = element.msg});
        return(getdata)
    }
}