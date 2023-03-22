console.log(1)
// 125346

const promise = new Promise((resolve,reject) => {
    console.log(2)
    setTimeout(() => {
        console.log(3)
        resolve(4)
        // console.log(7)
        console.error('cuowu')
        // throw "cuowu"
    })
})


promise.then(res=>{
    console.log(res)
    return Promise.resolve(6)
}).then(nmb=>{
    console.log(nmb
        )
})

console.log(5)
//1 5 2 3 4
