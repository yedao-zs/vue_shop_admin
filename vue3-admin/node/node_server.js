/* let p =new Promise((resolve,reject)=>{
    setTimeout(console.log,1000,'executor');
})
console.log(p) */
let p=new Promise((resolve, reject) => {
    setTimeout(reject,12000)
    // resolve();
    // throw '抛出错误'
    // reject()
    // resolve("ok")
})
/* setTimeout(()=>{
    console.log(p)
})
 */
/* setTimeout(console.log, 0, p.then(state=>{
    console.log(state)
}));  */
// console.log(p)
/* p.then(res=>{
    console.log(res)
})
p.then(res=>{
    console.log("res")
}) */
setTimeout(console.log,0,p)
// setTimeout(console.log,3000,p)