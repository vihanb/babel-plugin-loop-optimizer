{
    console.log("FORWARD")
    let ar = [1,2,3]
    // loop-optimizer: FORWARD
    ar.forEach(console.log)
}

{
    console.log("KEEP")
    let ar = [1,2,3]
    // loop-optimizer: KEEP
    ar.forEach(console.log)
}

{
    console.log("nothing")
    let ar = [1,2,3]
    // nothing
    ar.forEach(console.log)
}