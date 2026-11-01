const x= 44
const y = 5
const getdate = ()=> {
    const date = new Date()
    console.log(date)
}
const gettime = ()=> {
    const date = new Date()

    console.log(date.toLocaleTimeString())
}
module.exports = {getdate, gettime}
